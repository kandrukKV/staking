import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

async function main() {
  const accounts = await ethers.getSigners();
  const owner: SignerWithAddress = accounts[1];

  const Tokyo = await ethers.getContractFactory("TKY");
  const tokyo = await Tokyo.connect(owner).deploy();

  await tokyo.deployed();

  console.log("Tokyo deployed to:", tokyo.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
