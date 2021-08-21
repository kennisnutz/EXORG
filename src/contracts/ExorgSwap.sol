pragma solidity ^0.5.0;

import "./Exorg.sol";

contract ExorgSwap {
  string public name = "Exorg Founders Instant Exchange";
  Exorg public exorg;
  uint public rate = 17500;

  event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(Exorg _exorg) public {
    exorg = _exorg;
  }

  function buyTokens() public payable {
    // Calculate the number of tokens to buy
    uint exorgAmount = msg.value * rate;

    // Require that EthSwap has enough tokens
    require(exorg.balanceOf(address(this)) >= exorgAmount);

    // Transfer tokens to the user
    exorg.transfer(msg.sender, exorgAmount);

    // Emit an event
    emit TokensPurchased(msg.sender, address(exorg), exorgAmount, rate);
  }
   
  //should add function to return exorg tokens automatuically to sender address, when bnb is sent to the address

}
