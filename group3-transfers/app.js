/* Replace these placeholders with the actual deployed Sepolia contract addresses. */
const CAMP_ADDRESS = "PASTE_CAMP_CONTRACT_ADDRESS";
const SKILL_ADDRESS = "PASTE_SKILL_CONTRACT_ADDRESS";
const SEPOLIA_CHAIN_ID = 11155111n;
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address to, uint256 amount) returns (bool)"
];
let provider, signer, wallet, camp, skill;
const $ = id => document.getElementById(id);
const configured = address => ethers.isAddress(address) && !address.startsWith("PASTE_");
function status(message) { $("status").textContent = message; }
function setConnected(enabled) {
  $("refresh").disabled = !enabled;
  $("send").disabled = !enabled;
}
async function connect() {
  try {
    if (!window.ethereum) throw new Error("MetaMask not found. Install the browser extension.");
    if (![CAMP_ADDRESS, SKILL_ADDRESS].every(configured)) {
      throw new Error("First set CAMP_ADDRESS and SKILL_ADDRESS in app.js to your deployed Sepolia contract addresses.");
    }
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const network = await provider.getNetwork();
    if (network.chainId !== SEPOLIA_CHAIN_ID) throw new Error("Wrong network. Switch MetaMask to Ethereum Sepolia (chain ID 11155111).");
    signer = await provider.getSigner();
    wallet = await signer.getAddress();
    camp = new ethers.Contract(CAMP_ADDRESS, ERC20_ABI, signer);
    skill = new ethers.Contract(SKILL_ADDRESS, ERC20_ABI, signer);
    $("wallet").textContent = `Connected wallet: ${wallet}`;
    $("network").textContent = "Ethereum Sepolia ✓";
    setConnected(true);
    await refreshBalances();
    status("Wallet connected. Check the recipient and amount before confirming any transaction.");
  } catch (e) {
    status(e.shortMessage || e.message || String(e));
    setConnected(false);
  }
}
async function refreshBalances() {
  try {
    const network = await provider.getNetwork();
    if (network.chainId !== SEPOLIA_CHAIN_ID) throw new Error("Wrong network. Switch to Sepolia.");
    const [campBal, campDec, skillBal, skillDec] = await Promise.all([
      camp.balanceOf(wallet), camp.decimals(), skill.balanceOf(wallet), skill.decimals()
    ]);
    $("campBalance").textContent = ethers.formatUnits(campBal, campDec);
    $("skillBalance").textContent = ethers.formatUnits(skillBal, skillDec);
  } catch (e) { status(e.shortMessage || e.message || String(e)); }
}
async function sendToken(event) {
  event.preventDefault();
  try {
    if (!signer || !wallet) throw new Error("Connect MetaMask first.");
    const network = await provider.getNetwork();
    if (network.chainId !== SEPOLIA_CHAIN_ID) throw new Error("Wrong network. Switch to Sepolia.");
    const recipient = $("recipient").value.trim();
    if (!ethers.isAddress(recipient)) throw new Error("Enter a valid Ethereum recipient address.");
    const amountText = $("amount").value.trim();
    if (!amountText || !Number.isFinite(Number(amountText)) || Number(amountText) <= 0) throw new Error("Amount must be greater than zero.");
    const token = $("token").value === "camp" ? camp : skill;
    const [decimals, balance] = await Promise.all([token.decimals(), token.balanceOf(wallet)]);
    const amount = ethers.parseUnits(amountText, decimals);
    if (amount <= 0n || amount > balance) throw new Error("Amount exceeds your balance or is too small.");
    if (recipient.toLowerCase() === wallet.toLowerCase()) {
      if (!confirm("You selected your own wallet as recipient. Continue?")) return;
    }
    $("send").disabled = true;
    status("Review the token, recipient and amount in MetaMask before confirming.");
    const tx = await token.transfer(recipient, amount);
    status(`Submitted: ${tx.hash}\nWaiting for confirmation…`);
    const receipt = await tx.wait();
    if (receipt.status !== 1) throw new Error("Transaction failed on-chain.");
    status(`Transfer confirmed.\n${location.protocol === "https:" || location.hostname === "localhost" ? "Etherscan: " : ""}https://sepolia.etherscan.io/tx/${tx.hash}`);
    await refreshBalances();
  } catch (e) {
    status(e.shortMessage || e.message || String(e));
  } finally {
    $("send").disabled = !signer;
  }
}
$("connect").addEventListener("click", connect);
$("refresh").addEventListener("click", refreshBalances);
$("transferForm").addEventListener("submit", sendToken);
if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => location.reload());
  window.ethereum.on("chainChanged", () => location.reload());
}
