import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

task("claim", "Claim rewords tokens from contract").setAction(
  async (taskArgs, hre) => {
    const Stake = await hre.ethers.getContractFactory("STAKING");
    const [acc1] = await hre.ethers.getSigners();
    const stakingContract = new hre.ethers.Contract(
      process.env.STAKING || "",
      Stake.interface,
      acc1
    );
    await stakingContract.claim();
  }
);

module.exports = {};
