import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

task("stake", "Staking tokens to contract").setAction(async (taskArgs, hre) => {
  const Stake = await hre.ethers.getContractFactory("STAKING");
  const Token = await hre.ethers.getContractFactory("YML");
  const [acc1] = await hre.ethers.getSigners();
  const stakingContract = new hre.ethers.Contract(
    process.env.STAKING || "",
    Stake.interface,
    acc1
  );
  const tokenContract = new hre.ethers.Contract(
    process.env.YAMAL || "",
    Token.interface,
    acc1
  );
  const amount = hre.ethers.utils.parseEther("500");
  await tokenContract.approve(process.env.STAKING, amount);
  await stakingContract.stake(amount);
});

module.exports = {};
