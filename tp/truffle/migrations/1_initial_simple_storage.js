const contract = artifacts.require("SimpleStorage");

module.exports = function (deployer) {
  deployer.deploy(contract);
};
