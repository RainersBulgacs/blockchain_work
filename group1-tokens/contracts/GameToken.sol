// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @notice Fixed-supply classroom token used by the blockchain game.
contract GameToken is ERC20 {
    constructor() ERC20("Game Token", "GAME") {
        _mint(msg.sender, 100_000 * 10 ** decimals());
    }
}
