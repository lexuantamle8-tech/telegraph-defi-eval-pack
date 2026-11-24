# Telegraph DeFi Evaluation Pack & EIP-191 Signer (`telegraph-defi-eval-pack`)

> **Telegraph Protocol Season II — Track 3 (Evaluators) · Mission 14: Web3 Native & DeFi (`telegraphprotocol/bounties#202`)**

Reusable, independently verifiable EIP-191 (`personal_sign`) evaluation-pool validator and submission tool + **45 attested DeFi evaluation preference pairs** submitted live to `https://devnode.telegraphprotocol.com/api/evalpool/submissions` across all three Mission 14 canonical risk intents (`SMART_CONTRACT_AUDIT_GENERAL`, `WASH_TRADING_DETECTION`, `ONCHAIN_METRIC_VERIFY`).

> **Confidentiality Compliance (Section 5 & Evaluation Material Rules):** Raw evaluation prompts and expected answers (`private_data/*.jsonl`) are intentionally excluded from this public repository so hidden qualification/ranking material is never leaked. Only the reusable validator/uploader tool, provenance methodology, and node-signed submission proofs are published here.

## Verified Live Sepolia Devnode Submissions (2026-11-24)

- **Node:** `https://devnode.telegraphprotocol.com` (`chain_id: 11155111`)
- **Contributor Address (EIP-191 `signed: true`):** `0x5FB84cefFD7a890427b4Ee974Dd456d1992c8Da9`
- **Acceptance Rate:** **45 / 45 rows accepted (`0` duplicates, `0` rejected, `45` admitted)**

| Intent | Rows Accepted / Admitted | `submitters` (Before -> After) | Request `body_sha256` | Proof File |
|---|---|---|---|---|
| `SMART_CONTRACT_AUDIT_GENERAL` | **15 / 15** (`0` dup, `0` rej) | `4 -> 5` | `a249632c74f4fa4fd299ef3df3af6a09e853ef034bdaa70ca3d0ee11a2afed53` | `smart_contract_audit_general_proof.json` |
| `WASH_TRADING_DETECTION` | **15 / 15** (`0` dup, `0` rej) | `1 -> 2` | `13c11540402b58cb01bd3dbcf6c29117ecc277e4cb7ba236607f4a18ce8f31e0` | `wash_trading_detection_proof.json` |
| `ONCHAIN_METRIC_VERIFY` | **15 / 15** (`0` dup, `0` rej) | `1 -> 2` | `fa3c4d8eab8f11a8b3946e88b560b61ae5737ccb572b1c04fa49d097dda3ca8d` | `onchain_metric_verify_proof.json` |

## Coverage & Provenance Methodology

Every submitted row uses `label_kind: "preference_pair"` with `provenance.source_kind: "human"` and an independent public `https://` `source_url` (recorded as `attested` by the node):
- **`SMART_CONTRACT_AUDIT_GENERAL` (15 rows):** Grounded in SWC Registry (`SWC-107`, `SWC-115`, `SWC-132`), OpenZeppelin v5 security docs (`ERC-4626`, `Initializable`, `SafeERC20`, `SafeCast`, proxy storage layout), EIP-712, Chainlink L2 sequencer feeds, ChainSecurity Curve read-only reentrancy post-mortem, and `weird-erc20`.
- **`WASH_TRADING_DETECTION` (15 rows):** Grounded in Chainalysis wash-trading research, Solidus Labs DEX wash-trading reports, academic DEX manipulation literature (`arXiv:2108.10984`), and Uniswap v3 JIT vs wash-trading distinctions.
- **`ONCHAIN_METRIC_VERIFY` (15 rows):** Grounded in DefiLlama TVL & revenue methodology, Uniswap v2/v3 math, EIP-20 / EIP-1967, Solana SPL Token Program, Aave v3 utilization, L2Beat canonical bridge rules, Curve StableSwap balance health, and Chainlink Proof-of-Reserve.

## Reusable CLI Usage (`submit_evalpool.mjs`)

```bash
npm install
# 1. Validate local NDJSON schema, normalized prompt deduplication, and attested provenance:
node submit_evalpool.mjs --intent ONCHAIN_METRIC_VERIFY --file your_private_rows.jsonl --check-only

# 2. Sign (EIP-191) and upload to Telegraph Sepolia devnode:
node submit_evalpool.mjs --intent ONCHAIN_METRIC_VERIFY --file your_private_rows.jsonl --keyfile ../your_wallet.json
```

## Independent Verification

Any reviewer can verify our contributor count increase directly against the live devnode:
```bash
curl -s "https://devnode.telegraphprotocol.com/api/evalpool/status?intent_id=SMART_CONTRACT_AUDIT_GENERAL"
curl -s "https://devnode.telegraphprotocol.com/api/evalpool/status?intent_id=WASH_TRADING_DETECTION"
curl -s "https://devnode.telegraphprotocol.com/api/evalpool/status?intent_id=ONCHAIN_METRIC_VERIFY"
```
