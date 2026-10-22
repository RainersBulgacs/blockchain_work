const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Group 2: StudentGame", function () {
  async function setup() {
    const [owner, player, other] = await ethers.getSigners();
    const Stud = await ethers.getContractFactory("StudentToken");
    const GameToken = await ethers.getContractFactory("GameToken");
    const stud = await Stud.deploy();
    const game = await GameToken.deploy();
    const Game = await ethers.getContractFactory("StudentGame");
    const dapp = await Game.deploy(await stud.getAddress(), await game.getAddress());
    return { owner, player, other, stud, game, dapp };
  }

  it("blocks players who do not hold both required tokens", async function () {
    const { player, dapp } = await setup();
    await expect(dapp.connect(player).play(1)).to.be.revertedWith("Need at least 1 STUD and 1 GAME");
  });

  it("scores actions and emits a win event", async function () {
    const { player, stud, game, dapp } = await setup();
    await stud.transfer(player.address, ethers.parseEther("1"));
    await game.transfer(player.address, ethers.parseEther("1"));
    expect(await dapp.isEligible(player.address)).to.equal(true);
    await dapp.connect(player).play(2);
    await expect(dapp.connect(player).play(2)).not.to.emit(dapp, "PlayerWon");
    await expect(dapp.connect(player).play(1)).to.emit(dapp, "PlayerWon").withArgs(player.address, 5n);
    const state = await dapp.getPlayerState(player.address);
    expect(state.score).to.equal(5n);
    expect(state.roundsPlayed).to.equal(3n);
    expect(state.won).to.equal(true);
  });

  it("rejects invalid moves and stops a winner from playing again", async function () {
    const { player, stud, game, dapp } = await setup();
    await stud.transfer(player.address, ethers.parseEther("1"));
    await game.transfer(player.address, ethers.parseEther("1"));
    await expect(dapp.connect(player).play(3)).to.be.revertedWith("Move must be 1 or 2");
    await dapp.connect(player).play(2);
    await dapp.connect(player).play(2);
    await dapp.connect(player).play(1);
    expect((await dapp.getPlayerState(player.address)).won).to.equal(true);
    await expect(dapp.connect(player).play(1)).to.be.revertedWith("Already won");
  });

  it("rejects zero token addresses and identical token addresses", async function () {
    const { stud } = await setup();
    const Game = await ethers.getContractFactory("StudentGame");
    await expect(Game.deploy(ethers.ZeroAddress, await stud.getAddress())).to.be.revertedWith("Zero token address");
    await expect(Game.deploy(await stud.getAddress(), await stud.getAddress())).to.be.revertedWith("Token addresses must differ");
  });
});
