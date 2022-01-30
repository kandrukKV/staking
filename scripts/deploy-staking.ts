import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

async function main() {
  const accounts = await ethers.getSigners();
  const owner: SignerWithAddress = accounts[2];

  const Staking = await ethers.getContractFactory("STAKING");
  const staking = await Staking.connect(owner).deploy(
    process.env.YAMAL as string,
    process.env.TOKYO as string
  );

  await staking.deployed();

  console.log("Tokyo deployed to:", staking.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
