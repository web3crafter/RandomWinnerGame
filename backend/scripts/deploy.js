const { ethers } = require("hardhat");
const {
  Contract,
} = require("hardhat/internal/hardhat-network/stack-traces/model");
require("dotenv").config();
const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants");

async function Main() {
  const randomWinnerContract = await ethers.getContractFactory(
    "RandomWinnerGame"
  );

  const deployedrandomWinnerContract = await randomWinnerContract.deploy(
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH,
    FEE
  );
  await deployedrandomWinnerContract.deployed();

  console.log("Verify Contract Address:", deployedrandomWinnerContract.address);

  await sleep(30000);

  await hre.run("verify:verify", {
    address: deployedrandomWinnerContract.address,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
