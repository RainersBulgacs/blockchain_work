# Group 3 — Create & Transfer Your Tokens

## Token design
| Name | Symbol | Initial supply | Decimals | Classroom purpose |
|---|---|---:|---:|---|
| Campus Credit | CAMP | 10,000 | 18 | Campus participation and activity rewards |
| Skill Point | SKILL | 100,000 | 18 | Learning achievements and skill milestones |

Each is a separate fixed-supply ERC-20. Initial supply is minted to the deployer. There is no further minting function.

## Deploy
1. Compile `contracts/CampusCredit.sol` and `contracts/SkillPoint.sol` with a compatible Solidity compiler in Remix.
2. Confirm MetaMask is on Ethereum Sepolia (chain ID `11155111`).
3. Deploy both contracts independently. Record addresses and deployment hashes.
4. Edit `app.js`, replacing `CAMP_ADDRESS` and `SKILL_ADDRESS` with your real addresses.
5. Serve the page with `python3 -m http.server 8000` from the workspace root and visit `http://localhost:8000/group3-transfers/`.

## Mandatory lecturer transfers
Send at least **1 whole CAMP** and **1 whole SKILL** as two separate ERC-20 transfers on Sepolia to this exact assignment destination:
`0x5f3046bD5aA3c6d4575AF09B8198d584f130708E`

Double-check the address in MetaMask before confirming. Do not send Mainnet assets or SepoliaETH as a substitute. Keep enough SepoliaETH for gas. Save both confirmed transaction URLs.

## Evidence — replace placeholders with real values
- CAMP contract: `PASTE_DEPLOYED_ADDRESS`
- CAMP deployment tx: `PASTE_TX_HASH`
- SKILL contract: `PASTE_DEPLOYED_ADDRESS`
- SKILL deployment tx: `PASTE_TX_HASH`
- CAMP lecturer transfer (>= 1 whole token): `PASTE_ETHERSCAN_TX_URL`
- SKILL lecturer transfer (>= 1 whole token): `PASTE_ETHERSCAN_TX_URL`
- Public dashboard URL: `PASTE_GITHUB_PAGES_URL`
- Public repository URL: `PASTE_REPOSITORY_URL`

## Tests
- [ ] Correct total supply and deployer balance for each token.
- [ ] Transfers reduce sender balance and increase recipient balance; total supply stays fixed.
- [ ] Dashboard displays both balances correctly.
- [ ] Invalid address rejected.
- [ ] Zero, negative, invalid and excessive amount rejected.
- [ ] Wrong network blocked.
- [ ] MetaMask cancellation does not report success.
- [ ] Dashboard refresh matches on-chain balances.
- [ ] Lecturer receives >= 1 CAMP and >= 1 SKILL in separate confirmed transactions.

## Publish
Create a public GitHub repository. Publish the static page with Settings → Pages → Deploy from a branch → `main` / `(root)` if the repo is dedicated to this dashboard. If using the combined workspace, ensure the published path and relative asset URLs are correct.
