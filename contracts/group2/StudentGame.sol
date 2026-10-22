// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @notice A deterministic educational game. Not a random game and has no prize payout.
contract StudentGame {
    IERC20 public immutable stud;
    IERC20 public immutable game;

    uint256 public constant MIN_BALANCE = 1 ether;
    uint8 public constant MAX_ROUNDS = 5;
    uint256 public constant WIN_SCORE = 5;

    struct PlayerState {
        uint256 score;
        uint8 roundsPlayed;
        bool won;
    }

    mapping(address => PlayerState) public players;
    event RoundPlayed(address indexed player, uint8 move, uint256 pointsEarned, uint256 newScore, uint8 roundsPlayed);
    event PlayerWon(address indexed player, uint256 finalScore);

    constructor(address studAddress, address gameAddress) {
        require(studAddress != address(0) && gameAddress != address(0), "Zero token address");
        require(studAddress != gameAddress, "Token addresses must differ");
        stud = IERC20(studAddress);
        game = IERC20(gameAddress);
    }

    function isEligible(address player) public view returns (bool) {
        return stud.balanceOf(player) >= MIN_BALANCE && game.balanceOf(player) >= MIN_BALANCE;
    }

    function play(uint8 move) external {
        require(isEligible(msg.sender), "Need at least 1 STUD and 1 GAME");
        require(move == 1 || move == 2, "Move must be 1 or 2");
        PlayerState storage p = players[msg.sender];
        require(!p.won, "Already won");
        require(p.roundsPlayed < MAX_ROUNDS, "No rounds remaining");

        uint256 earned = move == 1 ? 1 : 2;
        p.roundsPlayed += 1;
        p.score += earned;
        emit RoundPlayed(msg.sender, move, earned, p.score, p.roundsPlayed);

        if (p.score >= WIN_SCORE) {
            p.won = true;
            emit PlayerWon(msg.sender, p.score);
        }
    }

    function getPlayerState(address player) external view returns (uint256 score, uint8 roundsPlayed, bool won) {
        PlayerState memory p = players[player];
        return (p.score, p.roundsPlayed, p.won);
    }
}
