/* eslint-disable */
import { ethers } from 'hardhat';

async function main() {
  // ERC20(liquidity token)
  const BibittoSwapERC20 = await ethers.getContractFactory('BibittoSwapERC20');
  const erc20 = await BibittoSwapERC20.deploy();
  await erc20.deployed();
  console.log(`BibittoSwapERC20 has deployed to ${erc20.address}`);

  // Factory
  const feeToSetter = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const BibittoSwapFactory = await ethers.getContractFactory('BibittoSwapFactory');
  const factory = await BibittoSwapFactory.deploy(feeToSetter);
  await factory.deployed();
  console.log(`BibittoSwapFactory has deployed to ${factory.address}`);

  // Pair
  const BibittoSwapPair = await ethers.getContractFactory('BibittoSwapPair');
  const pair = await BibittoSwapPair.deploy();
  await pair.deployed();
  console.log(`BibittoSwapPair has deployed to ${pair.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
