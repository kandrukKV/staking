import { ethers } from "hardhat";

async function main() {
  const Yamal = await ethers.getContractFactory("YML");
  const yamal = await Yamal.deploy();

  await yamal.deployed();

  console.log("Yamal deployed to:", yamal.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
