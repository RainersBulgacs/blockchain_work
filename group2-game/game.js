/* Replace these placeholders after deploying to Ethereum Sepolia. */
const STUD_ADDRESS = "PASTE_STUD_CONTRACT_ADDRESS";
const GAME_TOKEN_ADDRESS = "PASTE_GAME_TOKEN_CONTRACT_ADDRESS";
const GAME_CONTRACT_ADDRESS = "PASTE_STUDENT_GAME_CONTRACT_ADDRESS";
const SEPOLIA_CHAIN_ID = 11155111n;
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];
const GAME_ABI = [
  "function isEligible(address) view returns (bool)",
  "function play(uint8 move)",
  "function getPlayerState(address) view returns (uint256 score,uint8 roundsPlayed,bool won)"
];

let provider, signer, player, stud, gameToken, gameContract;
const $ = id => document.getElementById(id);
const configured = address => ethers.isAddress(address) && !address.startsWith("PASTE_");

function setStatus(message) { $("tx").textContent = message; }
function setActions(enabled) {
  $("explore").disabled = !enabled;
  $("challenge").disabled = !enabled;
  $("refresh").disabled = !enabled;
}
async function connect() {
  try {
    if (!window.ethereum) throw new Error("MetaMask was not detected. Install the browser extension.");
    if (![STUD_ADDRESS, GAME_TOKEN_ADDRESS, GAME_CONTRACT_ADDRESS].every(configured)) {
      throw new Error("First set the three deployed Sepolia contract addresses in game.js.");
    }
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const network = await provider.getNetwork();
    if (network.chainId !== SEPOLIA_CHAIN_ID) throw new Error("Wrong network. Switch MetaMask to Ethereum Sepolia (11155111).");
    signer = await provider.getSigner();
    player = await signer.getAddress();
    stud = new ethers.Contract(STUD_ADDRESS, ERC20_ABI, provider);
    gameToken = new ethers.Contract(GAME_TOKEN_ADDRESS, ERC20_ABI, provider);
    gameContract = new ethers.Contract(GAME_CONTRACT_ADDRESS, GAME_ABI, signer);
    $("wallet").textContent = `Connected: ${player}`;
    $("network").textContent = "Network: Ethereum Sepolia ✓";
    setActions(true);
    await refresh();
  } catch (e) {
    setStatus(e.shortMessage || e.message || String(e));
    setActions(false);
  }
}
async function refresh() {
  try {
    const network = await provider.getNetwork();
    if (network.chainId !== SEPOLIA_CHAIN_ID) throw new Error("Wrong network. Switch to Sepolia.");
    const [studRaw, gameRaw, studDecimals, gameDecimals, eligible, state] = await Promise.all([
      stud.balanceOf(player), gameToken.balanceOf(player), stud.decimals(), gameToken.decimals(),
      gameContract.isEligible(player), gameContract.getPlayerState(player)
    ]);
    $("studBalance").textContent = `${ethers.formatUnits(studRaw, studDecimals)} STUD`;
    $("gameBalance").textContent = `${ethers.formatUnits(gameRaw, gameDecimals)} GAME`;
    $("eligibility").textContent = eligible ? "Eligible to play ✓" : "Need at least 1 STUD and 1 GAME.";
    $("score").textContent = state.score.toString();
    $("rounds").textContent = state.roundsPlayed.toString();
    $("won").textContent = state.won ? "Yes" : "No";
    const canPlay = eligible && !state.won && state.roundsPlayed < 5;
    $("explore").disabled = !canPlay;
    $("challenge").disabled = !canPlay;
  } catch (e) { setStatus(e.shortMessage || e.message || String(e)); }
}
async function play(move) {
  try {
    const network = await provider.getNetwork();
    if (network.chainId !== SEPOLIA_CHAIN_ID) throw new Error("Switch to Ethereum Sepolia first.");
    setActions(false);
    setStatus("Confirm the transaction in MetaMask…");
    const tx = await gameContract.play(move);
    setStatus(`Submitted: ${tx.hash}\nWaiting for confirmation…`);
    await tx.wait();
    setStatus(`Confirmed: https://sepolia.etherscan.io/tx/${tx.hash}`);
    await refresh();
  } catch (e) {
    setStatus(e.shortMessage || e.message || String(e));
    if (provider) setActions(true);
  }
}
$("connect").addEventListener("click", connect);
$("refresh").addEventListener("click", refresh);
$("explore").addEventListener("click", () => play(1));
$("challenge").addEventListener("click", () => play(2));
if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => location.reload());
  window.ethereum.on("chainChanged", () => location.reload());
}
