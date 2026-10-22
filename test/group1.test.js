const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Group 1: STUD and GAME ERC-20 tokens", function () {
  it("mints the fixed STUD supply to the deployer", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("StudentToken");
    const token = await Token.deploy();
    expect(await token.name()).to.equal("Student Token");
    expect(await token.symbol()).to.equal("STUD");
    expect(await token.decimals()).to.equal(18n);
    expect(await token.totalSupply()).to.equal(ethers.parseEther("100000"));
    expect(await token.balanceOf(owner.address)).to.equal(ethers.parseEther("100000"));
  });

  it("mints the fixed GAME supply and supports standard transfers", async function () {
    const [owner, recipient] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GameToken");
    const token = await Token.deploy();
    expect(await token.name()).to.equal("Game Token");
    expect(await token.symbol()).to.equal("GAME");
    await expect(token.transfer(recipient.address, ethers.parseEther("2")))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, recipient.address, ethers.parseEther("2"));
    expect(await token.balanceOf(recipient.address)).to.equal(ethers.parseEther("2"));
    expect(await token.totalSupply()).to.equal(ethers.parseEther("100000"));
  });
});
