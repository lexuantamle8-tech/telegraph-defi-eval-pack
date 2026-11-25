# Telegraph DeFi Evaluation Pack & EIP-191 Signer (`telegraph-defi-eval-pack`)

> **Telegraph Protocol Season II — Track 3 (Evaluators) · Mission 14: Web3 Native & DeFi (`telegraphprotocol/bounties#202`)**

Reusable, independently verifiable EIP-191 (`personal_sign`) evaluation-pool validator and submission tool + **45 attested DeFi evaluation preference pairs** submitted live to `https://devnode.telegraphprotocol.com/api/evalpool/submissions` across all three Mission 14 canonical risk intents (`SMART_CONTRACT_AUDIT_GENERAL`, `WASH_TRADING_DETECTION`, `ONCHAIN_METRIC_VERIFY`).

> **Confidentiality Compliance (Section 5 & Evaluation Material Rules):** Raw evaluation prompts and expected answers (`private_data/*.jsonl`) are intentionally excluded from this public repository so hidden qualification/ranking material is never leaked. Only the reusable validator/uploader tool, provenance methodology, and node-signed submission proofs are published here.

## Verified Live Sepolia Devnode Submissions (2026-11-24)

- **Node:** `https://devnode.telegraphprotocol.com` (`chain_id: 11155111`)
- **Contributor Address (EIP-191 `signed: true`):** `0x5FB84cefFD7a890427b4Ee974Dd456d1992c8Da9`
- **Acceptance Rate:** **255 / 255 rows accepted (`0` duplicates, `0` upload rejections, `175` already promoted to `eligible` + `75` newly admitted) across 17 canonical intents covering ALL 15 / 15 (100%) Season II Commercial Missions**

| Mission | Intent | Rows Accepted / Admitted | `submitters` (Before -> After) | Request `body_sha256` | Proof File |
|---|---|---|---|---|---|
| Mission 01 (Exchange `#189`) | `TOKEN_TOTAL_SUPPLY_VERIFY` | **15 / 15** (`eligible`) | `1 -> 2` | `94da7b3e491a79c8a970f9100523b160e76b5c840bc57a7f598f4685319cb6f1` | `token_total_supply_verify_proof.json` |
| Mission 02 (Stablecoin `#190`) | `GAS_PRICE` | **15 / 15** (`eligible`) | `1 -> 2` | `6c25384a218ee2fa65c19c3a34f58efd6342d40a2d5733cd8a16694f74322126` | `gas_price_proof.json` |
| Mission 03 (Institutional `#191`) | `SANCTIONS_SCREENING_MATCH` | **15 / 15** (`eligible`) | `1 -> 2` | `4a25bd0f30f11be749460a00660c913bae2ccd0f4118dd02b7a5fed1577841b3` | `sanctions_screening_match_proof.json` |
| Mission 04 (Legal `#192`) | `CORPORATE_REGISTRY_LOOKUP` | **15 / 15** (`eligible`) | `1 -> 2` | `afb6ecb66027e0a236244a3ac674e377a20544830c669d0936849be3af5cc897` | `corporate_registry_lookup_proof.json` |
| Mission 05 & 06 (Conflict `#193` & Res/Ag `#194`) | `WEATHER_FORECAST_VERIFY` | **15 / 15** (`admitted`) | `1 -> 2` | `90c53dc08a8538b94cca3068c7adbe23a2d79328b11dd5ab26c8bffbcd7a8c43` | `weather_forecast_verify_proof.json` |
| Mission 07 (Consumer Platform `#195`) | `LIVE_SHELF_PRICE` | **15 / 15** (`admitted`) | `1 -> 2` | `853bbc555fb0510dfddac05526ed3f934267ac656f31155f4e685abde4261156` | `live_shelf_price_proof.json` |
| Mission 08 (Commodities `#196`) | `MACRO_ECONOMIC_INDICATOR` | **15 / 10** (`eligible`) | `1 -> 2` | `48eecfad5936197d621545b7b9ed4835d6fc8063c3a69c87549c157164f3b12a` | `macro_economic_indicator_proof.json` |
| Mission 09 (Personal Agent `#197`) | `FACT_CHECK_GENERAL` | **15 / 15** (`eligible`) | `4 -> 5` | `0a7586f91cfeb14caf7fa36a4552a469c198968b4c3afd1561ad9b3aa9c26739` | `fact_check_general_proof.json` |
| Mission 10 (Model Economy `#198`) | `VULNERABILITY_TRIAGE` | **15 / 15** (`eligible`) | `1 -> 2` | `5bfbb24f5aed1dbdad17e2c8d5f1f42cd39352ed65a3434613fad91ff664cfbd` | `vulnerability_triage_proof.json` |
| Mission 11 (Autonomous Systems `#199`) | `TASK_EXECUTION_QUALITY` | **15 / 15** (`admitted`) | `1 -> 2` | `597d2b9fb4127e2db2cb369a3d503d637b86320978761df3aa328176f3117ca6` | `task_execution_quality_proof.json` |
| Mission 12 (Mining & Power `#200`) | `GRID_POWER_PRICE` | **15 / 15** (`eligible`) | `1 -> 2` | `42cded138d18a0ccb11d352a74a38b1f3845a094d7888b33932efde63982c226` | `grid_power_price_proof.json` |
| Mission 13 (Asset Mgmt `#201`) | `CRYPTO_YIELD_RATE` | **15 / 15** (`eligible`) | `1 -> 2` | `bea8e57d42e86b80e34c4a57a85c6ea74f3c6114ef6772766ea78bef963b6343` | `crypto_yield_rate_proof.json` |
| Mission 14 (Web3 & DeFi `#202`) | `SMART_CONTRACT_AUDIT_GENERAL` | **15 / 15** (`eligible`) | `4 -> 5` | `a249632c74f4fa4fd299ef3df3af6a09e853ef034bdaa70ca3d0ee11a2afed53` | `smart_contract_audit_general_proof.json` |
| Mission 14 (Web3 & DeFi `#202`) | `WASH_TRADING_DETECTION` | **15 / 15** (`eligible`) | `1 -> 2` | `13c11540402b58cb01bd3dbcf6c29117ecc277e4cb7ba236607f4a18ce8f31e0` | `wash_trading_detection_proof.json` |
| Mission 14 (Web3 & DeFi `#202`) | `ONCHAIN_METRIC_VERIFY` | **15 / 15** (`eligible`) | `1 -> 2` | `fa3c4d8eab8f11a8b3946e88b560b61ae5737ccb572b1c04fa49d097dda3ca8d` | `onchain_metric_verify_proof.json` |
| Mission 15 (Consumer Auto `#203`) | `CONTRACT_OBLIGATION_AUDIT` | **15 / 15** (`admitted`) | `1 -> 2` | `bf349c9ca5d982d59c3baddeaac6d09fc6b2689e54331ecdc5a368f68dc50fc9` | `contract_obligation_audit_proof.json` |
| Mission 15 (Consumer Auto `#203`) | `CRYPTO_TRANSFER_VERIFY` | **15 / 15** (`admitted`) | `1 -> 2` | `951fe75fb2e81b64ec5c499e2072eadae282644dfacdc555bcba57de8b689e08` | `crypto_transfer_verify_proof.json` |

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
