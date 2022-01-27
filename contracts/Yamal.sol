//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./ERC20.sol";

contract YML is ERC20 {
  constructor() ERC20("Yamal Token", "YML") {
    mint(msg.sender, 1000000000000000000000);
  }
}
