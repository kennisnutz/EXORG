const Exorg = artifacts.require("Exorg");
const ExorgSwap = artifacts.require("ExorgSwap");


module.exports = async function(deployer) {
  //deploy token contract
  await deployer.deploy(Exorg);
  const exorg= await Exorg.deployed()

  //deploy exchange contract
  await deployer.deploy(ExorgSwap, exorg.address);
  exchange= await ExorgSwap.deployed()

  // distribute tokens to private parteners

  //transfer remaing allocation to exchange contract
  await exorg.transfer(exchange.address, '200000000000000000000000');

  //vesting logic
};
