// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StudentToken is ERC20 {
    constructor() ERC20("Student Token", "STUD") {
        _mint(msg.sender, 100_000 * 10 ** decimals());
    }
}
