const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("No deployer account configured.");
  const Camp = await ethers.getContractFactory("CampusCredit");
  const camp = await Camp.deploy();
  await camp.waitForDeployment();
  const Skill = await ethers.getContractFactory("SkillPoint");
  const skill = await Skill.deploy();
  await skill.waitForDeployment();
  console.log("CAMP_ADDRESS=", await camp.getAddress());
  console.log("CAMP_DEPLOY_TX=", camp.deploymentTransaction().hash);
  console.log("SKILL_ADDRESS=", await skill.getAddress());
  console.log("SKILL_DEPLOY_TX=", skill.deploymentTransaction().hash);
}
main().catch((e) => { console.error(e); process.exitCode = 1; });
