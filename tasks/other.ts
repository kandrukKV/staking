import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

task("other", "Staking tokens to contract").setAction(async (taskArgs, hre) => {
  const Stake = await hre.ethers.getContractFactory("STAKING");

  const [acc1] = await hre.ethers.getSigners();

  const stakingContract = new hre.ethers.Contract(
    process.env.STAKING || "",
    Stake.interface,
    acc1
  );

  const val = await stakingContract.calcClaimValue(acc1.address);

  console.log("VAL-", val);
});

module.exports = {};
