const ZombieFactory = artifacts.requre('ZombieFactory');
module.exports = function(deployer) {
    deployer.deploy(ZombieFactory);
};