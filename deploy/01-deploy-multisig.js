const { network } = require("hardhat");
const { developmentChains, BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("====================================================================");

    const owners = [deployer];
    const numConfirmations = 1;

    const args = [owners, numConfirmations];
    const waitConfirmations = developmentChains.includes(network.name) ? 1 : BLOCK_CONFIRMATIONS;
    const multiSig = await deploy("MultiSig", {
        from: deployer,
        args,
        log: true,
        waitConfirmations,
    });

    if (!developmentChains.includes(network.name)) {
        await verify(multiSig.address, args);
    }
};

module.exports.tags = ["all", "multisig"];
