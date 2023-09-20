const Contracts = artifacts.require('Contracts');

module.exports = async function(deployer, network, accounts) {
  // Deploy el contrato si es necesario
  if (network === 'development') {
    await deployer.deploy(Contracts);
    const deployedContract = await Contracts.deployed();
  }
};
