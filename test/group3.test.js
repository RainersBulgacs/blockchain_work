const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Group 3: CAMP and SKILL tokens", function () {
  it("mints the intended CAMP supply and transfers tokens", async function () {
    const [owner, recipient] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CampusCredit");
    const token = await Token.deploy();
    expect(await token.name()).to.equal("Campus Credit");
    expect(await token.symbol()).to.equal("CAMP");
    expect(await token.totalSupply()).to.equal(ethers.parseEther("10000"));
    await token.transfer(recipient.address, ethers.parseEther("1"));
    expect(await token.balanceOf(recipient.address)).to.equal(ethers.parseEther("1"));
    expect(await token.totalSupply()).to.equal(ethers.parseEther("10000"));
  });

  it("mints the intended SKILL supply and supports ERC-20 transfers", async function () {
    const [owner, recipient] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SkillPoint");
    const token = await Token.deploy();
    expect(await token.name()).to.equal("Skill Point");
    expect(await token.symbol()).to.equal("SKILL");
    expect(await token.totalSupply()).to.equal(ethers.parseEther("100000"));
    await token.transfer(recipient.address, ethers.parseEther("1"));
    expect(await token.balanceOf(recipient.address)).to.equal(ethers.parseEther("1"));
  });
});
