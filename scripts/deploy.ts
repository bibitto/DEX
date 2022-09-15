/* eslint-disable */
import { ethers } from 'hardhat';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // ERC20(liquidity token)
  const BibittoSwapERC20 = await ethers.getContractFactory('BibittoSwapERC20');
  const erc20 = await BibittoSwapERC20.deploy();
  await erc20.deployed();
  console.log(`deployed to ${erc20.address}`);

  // Factory
  const BibittoSwapFactory = await ethers.getContractFactory('BibittoSwapFactory');
  const factory = await BibittoSwapFactory.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3');
  await factory.deployed();
  console.log(`deployed to ${factory.address}`);

  // Pair
  const BibittoSwapPair = await ethers.getContractFactory('BibittoSwapPair');
  const pair = await BibittoSwapPair.deploy();
  await pair.deployed();
  console.log(`deployed to ${pair.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
