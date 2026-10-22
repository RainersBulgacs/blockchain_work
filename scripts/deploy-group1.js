const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("No deployer account configured. For remote deployment, configure a dedicated test wallet in .env.");
  console.log("Network:", (await ethers.provider.getNetwork()).name, "Chain ID:", (await ethers.provider.getNetwork()).chainId.toString());
  console.log("Deployer:", deployer.address);
  const Stud = await ethers.getContractFactory("StudentToken");
  const stud = await Stud.deploy();
  await stud.waitForDeployment();
  const Game = await ethers.getContractFactory("GameToken");
  const game = await Game.deploy();
  await game.waitForDeployment();
  console.log("STUD_ADDRESS=", await stud.getAddress());
  console.log("STUD_DEPLOY_TX=", stud.deploymentTransaction().hash);
  console.log("GAME_ADDRESS=", await game.getAddress());
  console.log("GAME_DEPLOY_TX=", game.deploymentTransaction().hash);
}
main().catch((e) => { console.error(e); process.exitCode = 1; });
