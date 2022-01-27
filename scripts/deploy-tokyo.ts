import { ethers } from "hardhat";

async function main() {
  const Tokyo = await ethers.getContractFactory("TKY");
  const tokyo = await Tokyo.deploy("Hello, Hardhat!");

  await tokyo.deployed();

  console.log("Tokyo deployed to:", tokyo.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
