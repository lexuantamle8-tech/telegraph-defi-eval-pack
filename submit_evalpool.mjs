import { createHash, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { Wallet } from 'ethers';

const NODE_URL = process.env.TELEGRAPH_NODE_URL || 'https://devnode.telegraphprotocol.com';
const CHAIN_ID = process.env.TELEGRAPH_CHAIN_ID || '11155111';

function loadOrCreateWallet(keyPath) {
  if (existsSync(keyPath)) {
    const raw = JSON.parse(readFileSync(keyPath, 'utf8'));
    return new Wallet(raw.privateKey);
  }
  const w = Wallet.createRandom();
  mkdirSync(dirname(keyPath), { recursive: true });
  writeFileSync(
    keyPath,
    JSON.stringify({ address: w.address, privateKey: w.privateKey, createdAt: new Date().toISOString() }, null, 2),
    'utf8'
  );
  return w;
}

function validateJsonl(buf, intentId) {
  const lines = buf.toString('utf8').split('\n').filter((l) => l.trim().length > 0);
  const seen = new Set();
  const errors = [];
  for (let i = 0; i < lines.length; i++) {
    let row;
    try {
      row = JSON.parse(lines[i]);
    } catch (e) {
      errors.push(`line ${i + 1}: invalid JSON`);
      continue;
    }
    if (!row.prompt || typeof row.prompt !== 'string') errors.push(`line ${i + 1}: missing prompt`);
    if (!row.chosen || typeof row.chosen !== 'string') errors.push(`line ${i + 1}: missing chosen`);
    const kind = row.label_kind || 'preference_pair';
    if (kind === 'preference_pair' && (!row.rejected || row.rejected === row.chosen)) {
      errors.push(`line ${i + 1}: preference_pair needs distinct rejected`);
    }
    if (row.intent_id && row.intent_id !== intentId) {
      errors.push(`line ${i + 1}: intent_id mismatch`);
    }
    const norm = (row.prompt || '').normalize('NFC').replace(/\s+/g, ' ').trim();
    if (seen.has(norm)) errors.push(`line ${i + 1}: duplicate normalized prompt`);
    seen.add(norm);
    const prov = row.provenance || {};
    if (!prov.source_url || !/^https?:\/\//.test(prov.source_url)) {
      errors.push(`line ${i + 1}: missing http(s) provenance.source_url`);
    }
    if (['llm', 'synthetic', 'generated', 'model'].includes((prov.source_kind || '').toLowerCase())) {
      errors.push(`line ${i + 1}: unverified provenance.source_kind`);
    }
  }
  return { count: lines.length, errors };
}

async function fetchStatus(intentId) {
  const res = await fetch(`${NODE_URL}/api/evalpool/status?intent_id=${encodeURIComponent(intentId)}`, {
    headers: { 'User-Agent': 'telegraph-defi-eval-pack/1.0' },
  });
  return res.json();
}

async function main() {
  const args = process.argv.slice(2);
  const intentIdx = args.indexOf('--intent');
  const fileIdx = args.indexOf('--file');
  const keyIdx = args.indexOf('--keyfile');
  const checkOnly = args.includes('--check-only');
  if (intentIdx === -1 || fileIdx === -1) {
    console.error('Usage: node submit_evalpool.mjs --intent <INTENT_ID> --file <path.jsonl> [--keyfile <path>] [--check-only]');
    process.exit(1);
  }
  const intentId = args[intentIdx + 1];
  const filePath = resolve(args[fileIdx + 1]);
  const keyPath = resolve(keyIdx !== -1 ? args[keyIdx + 1] : '../.telegraph_eval_wallet.json');

  const bodyBuf = readFileSync(filePath);
  const check = validateJsonl(bodyBuf, intentId);
  if (check.errors.length > 0) {
    console.error('VALIDATION FAILED:', check.errors);
    process.exit(2);
  }
  console.log(`LOCAL_CHECK_OK: intent=${intentId} rows=${check.count} bytes=${bodyBuf.length}`);
  if (checkOnly) return;

  const wallet = loadOrCreateWallet(keyPath);
  const beforeStatus = await fetchStatus(intentId);
  const bodySha = createHash('sha256').update(bodyBuf).digest('hex');
  const nonce = randomBytes(16).toString('hex');
  const msg = [
    'Telegraph eval-pool submission v1',
    `intent_id: ${intentId}`,
    `body_sha256: ${bodySha}`,
    `nonce: ${nonce}`,
    `chain_id: ${CHAIN_ID}`,
  ].join('\n');
  const signature = await wallet.signMessage(msg);

  const url = `${NODE_URL}/api/evalpool/submissions?intent_id=${encodeURIComponent(intentId)}&submitter=${encodeURIComponent(wallet.address)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-ndjson',
      'X-Evalpool-Signature': signature,
      'X-Evalpool-Nonce': nonce,
      'User-Agent': 'telegraph-defi-eval-pack/1.0',
    },
    body: bodyBuf,
  });
  const text = await res.text();
  let parsed;
  try { parsed = JSON.parse(text); } catch { parsed = { raw: text }; }
  const afterStatus = await fetchStatus(intentId);

  const proof = {
    timestamp_utc: new Date().toISOString(),
    node: NODE_URL,
    chain_id: Number(CHAIN_ID),
    intent_id: intentId,
    submitter: wallet.address,
    body_sha256: bodySha,
    nonce,
    http_status: res.status,
    submission_response: parsed,
    before_pool: {
      eligible: beforeStatus.by_state?.eligible ?? 0,
      submitters: beforeStatus.submitters ?? 0,
      eligible_submitters: beforeStatus.eligible_submitters ?? 0,
    },
    after_pool: {
      eligible: afterStatus.by_state?.eligible ?? 0,
      submitters: afterStatus.submitters ?? 0,
      eligible_submitters: afterStatus.eligible_submitters ?? 0,
    },
  };
  console.log(JSON.stringify(proof, null, 2));
  if (!res.ok) process.exit(3);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
