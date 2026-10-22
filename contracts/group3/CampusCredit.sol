// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CampusCredit is ERC20 {
    constructor() ERC20("Campus Credit", "CAMP") {
        _mint(msg.sender, 10_000 * 10 ** decimals());
    }
}
