//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./ERC20.sol";

contract TKY is ERC20 {
  constructor() ERC20("Tokyo Token", "TKY") {
    mint(msg.sender, 1000000000000000000000);
  }
}
