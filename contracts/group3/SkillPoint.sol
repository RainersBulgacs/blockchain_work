// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SkillPoint is ERC20 {
    constructor() ERC20("Skill Point", "SKILL") {
        _mint(msg.sender, 100_000 * 10 ** decimals());
    }
}
