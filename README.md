# Blockchain Studio — Sepolia Lab

Starter workspace for the three assignments at https://erins.lv/tokens/

## Safety
- Use **Ethereum Sepolia only** (chain ID `11155111`), never Mainnet.
- Never put a seed phrase or private key in source code, GitHub, or a website.
- All addresses in the front-end config files start as placeholders. Replace them only with addresses you deployed and verified.
- Deployments, Uniswap liquidity, token purchases, lecturer transfers, screenshots, and GitHub Pages publishing must be completed by you and evidenced with real Sepolia transaction hashes. This starter does not pretend those steps have happened.

## Workspace
- `group1-tokens/`: fixed-supply `STUD` and `GAME` ERC-20 contracts and handoff checklist.
- `group2-game/`: `StudentGame.sol` and a MetaMask-enabled browser game.
- `group3-transfers/`: two independent ERC-20 contracts and a token transfer dashboard.

## Suggested workflow
1. Open this folder in VS Code or GitHub Codespaces.
2. Compile/test the Solidity contracts with Remix at https://remix.ethereum.org/ (import paths use OpenZeppelin; Remix can resolve them).
3. Connect MetaMask to Ethereum Sepolia and deploy contracts. Record contract addresses and transaction hashes in each README.
4. For Group 1, create/test the ETH/STUD and ETH/GAME Uniswap Sepolia pools and complete an independent-wallet swap for each token.
5. For Group 2, copy the real Group 1 STUD/GAME addresses into `group2-game/game.js`, deploy `StudentGame.sol` with those addresses as constructor arguments, then put the deployed game address into `game.js`.
6. For Group 3, deploy both token contracts, paste addresses into `group3-transfers/app.js`, and send at least 1 whole token of each type to the lecturer's specified Sepolia address.
7. Run a local web server for each front end, then publish the front-end files to GitHub Pages.

## Run the static pages locally
From the workspace root, run:
```bash
python3 -m http.server 8000
```
Then open:
- http://localhost:8000/group2-game/
- http://localhost:8000/group3-transfers/

A local HTTP server is preferable to opening HTML with `file://`. MetaMask generally works best in a desktop browser with its extension enabled.

## Final submission evidence
For each group, add the real deployed addresses, Etherscan links, working website URL, screenshots, and test results to its README. Do not claim completion for a step until you have verified it on Sepolia.
## Automated local tests (added)
This repository includes Hardhat unit tests. In GitHub Codespaces terminal run:
```bash
npm install
npm test
```
The tests use a local simulated blockchain and do not require a wallet, RPC URL, or real tokens. They do not replace Sepolia acceptance evidence.

## Deployment scripts
Deployment scripts are provided in `scripts/`. To use them on Sepolia, first create a dedicated test wallet and fund it with SepoliaETH. Copy `.env.example` to `.env` and configure a test-only private key. Never commit `.env`; it is excluded by `.gitignore`. For Group 2, also set `STUD_ADDRESS` and `GAME_ADDRESS` in `.env`. If you do not want to use a private key, deploy interactively with Remix instead.

## GitHub Pages
This repo includes a root `index.html` hub linking to both browser apps. In GitHub, open Settings → Pages → Build and deployment → Deploy from a branch, choose `main` and `/ (root)`, then save. After publishing, test `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`, plus the `/group2-game/` and `/group3-transfers/` paths. Deployment may take a few minutes.
