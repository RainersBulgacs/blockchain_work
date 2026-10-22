# Group 2 — Token Arena

## Game specification
- Eligibility: wallet holds at least 1 whole STUD and 1 whole GAME.
- Action: Explore (`move=1`) adds 1 point; Challenge (`move=2`) adds 2 points.
- Limits: at most five rounds per wallet; no actions after winning.
- Win: score reaches at least 5.
- On-chain state: score, rounds played and win flag per wallet; events emitted for rounds and wins.
- Failure cases: missing tokens, invalid move, too many rounds, already won, wrong network.
- Exploit/limitation: players can choose the higher-value Challenge every round. The game intentionally demonstrates on-chain state/limits, not secure randomness or a competitive prize economy. Do not describe it as a fair random game.

## Deploy and connect
1. Obtain the real verified STUD/GAME contract addresses from Group 1.
2. Deploy `contracts/StudentGame.sol` to Sepolia with constructor args `(STUD_ADDRESS, GAME_ADDRESS)`.
3. In `game.js`, replace `STUD_ADDRESS`, `GAME_TOKEN_ADDRESS`, and `GAME_CONTRACT_ADDRESS`.
4. Serve with `python3 -m http.server 8000` from the workspace root and visit `http://localhost:8000/group2-game/`.
5. Connect MetaMask on Sepolia. Verify balances, make a game transaction, reload, and verify the score persists.
6. Publish `index.html` and `game.js` to a public GitHub repository/Pages site (the Solidity contract source should also be included in the repo).

## Evidence to add
- STUD address and successful buy tx: `PASTE_REAL_VALUE`
- GAME address and successful buy tx: `PASTE_REAL_VALUE`
- Game contract address: `PASTE_REAL_VALUE`
- Deployment tx: `PASTE_REAL_VALUE`
- Completed play tx: `PASTE_REAL_VALUE`
- GitHub Pages URL: `PASTE_REAL_VALUE`
- Negative test results (no tokens, invalid move, second wallet): `PASTE_RESULTS`

## Checklist
- [ ] Real Group 1 tokens verified and acquired on Sepolia.
- [ ] Contract tested and deployed with correct constructor addresses.
- [ ] Wrong-chain / no-token / invalid-move cases rejected.
- [ ] On-chain action succeeds and is visible on Etherscan.
- [ ] Score remains after page reload and is separate for another wallet.
- [ ] Public HTTPS site and README contain real links.
