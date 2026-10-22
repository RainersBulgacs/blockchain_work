# Group 1 — Token Infrastructure & Uniswap Liquidity

## Token design
| Name | Symbol | Initial supply | Decimals | Purpose |
|---|---|---:|---:|---|
| Student Token | STUD | 100,000 | 18 | Shared classroom token; required by Group 2 |
| Game Token | GAME | 100,000 | 18 | Game participation token; required by Group 2 |

Both contracts have a fixed supply minted to the deployer at construction. There is no owner-only mint function, transfer tax, or special privilege.

## Deploy
1. Open each file in Remix, compile with Solidity `0.8.27` or compatible `0.8.x`.
2. In MetaMask select Ethereum Sepolia (chain ID `11155111`).
3. Deploy `StudentToken`, then `GameToken`.
4. Save contract addresses and deployment transaction hashes below.
5. Transfer a small amount of each token to a second test wallet; verify `Transfer` events on Sepolia Etherscan.

## Uniswap work (must be done manually)
For each token, create an ETH/token liquidity position on Uniswap Sepolia, then use a different wallet to perform and verify a successful swap from SepoliaETH. Creating a pool alone is not proof that swaps work. Keep enough SepoliaETH for gas and verify the exact token address before approving.

## Registry — replace placeholders with real values
- Network: Ethereum Sepolia (`11155111`)
- STUD contract: `PASTE_DEPLOYED_STUD_ADDRESS`
- STUD deployment tx: `PASTE_TX_HASH`
- GAME contract: `PASTE_DEPLOYED_GAME_ADDRESS`
- GAME deployment tx: `PASTE_TX_HASH`
- ETH/STUD pool URL: `PASTE_REAL_POOL_URL`
- Successful independent STUD swap: `PASTE_ETHERSCAN_TX_URL`
- ETH/GAME pool URL: `PASTE_REAL_POOL_URL`
- Successful independent GAME swap: `PASTE_ETHERSCAN_TX_URL`
- Public repository URL: `PASTE_REPOSITORY_URL`

## Acceptance checklist
- [ ] Both contracts deployed to Sepolia; names, symbols, decimals, supply verified.
- [ ] Direct transfers verified with a second wallet.
- [ ] ETH/STUD liquidity position exists and independent wallet successfully buys STUD.
- [ ] ETH/GAME liquidity position exists and independent wallet successfully buys GAME.
- [ ] Pool URLs and real transaction links recorded.
- [ ] Group 2 receives exact contract addresses and decimals.
- [ ] Screenshots and live demo prepared.

## Explain in the demo
ERC-20 balance and total supply; why decimals are 18; allowance/approval; what liquidity does; initial pool price and price impact; gas; why a pool is not complete until a swap succeeds.
