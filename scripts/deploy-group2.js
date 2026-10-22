const { ethers } = require("hardhat");

async function main() {
  const studAddress = process.env.STUD_ADDRESS;
  const gameAddress = process.env.GAME_ADDRESS;
  if (!ethers.isAddress(studAddress || "") || !ethers.isAddress(gameAddress || "")) {
    throw new Error("Set STUD_ADDRESS and GAME_ADDRESS in your local .env to the real Group 1 Sepolia token addresses.");
  }
  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("No deployer account configured.");
  const Game = await ethers.getContractFactory("StudentGame");
  const game = await Game.deploy(studAddress, gameAddress);
  await game.waitForDeployment();
  console.log("GAME_CONTRACT_ADDRESS=", await game.getAddress());
  console.log("GAME_DEPLOY_TX=", game.deploymentTransaction().hash);
}
main().catch((e) => { console.error(e); process.exitCode = 1; });
