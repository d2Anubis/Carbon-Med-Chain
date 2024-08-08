const CarbonDataStorage = artifacts.require("CarbonDataStorage");

module.exports = function (deployer) {
  deployer.deploy(CarbonDataStorage);
};
