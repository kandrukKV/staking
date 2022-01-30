import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

task("other", "Staking tokens to contract").setAction(async (taskArgs, hre) => {
  const Stake = await hre.ethers.getContractFactory("STAKING");
  const Yamal = await hre.ethers.getContractFactory("YML");

  const [acc1] = await hre.ethers.getSigners();

  const stakingContract = new hre.ethers.Contract(
    process.env.STAKING || "",
    Stake.interface,
    acc1
  );

  const yamalContract = new hre.ethers.Contract(
    process.env.YAMAL || "",
    Yamal.interface,
    acc1
  );
  // const amount = hre.ethers.utils.parseEther("500");

  const val = await stakingContract.calcClaimValue(acc1.address);
  const balance = await yamalContract.balanceOf(process.env.STAKING);

  console.log("VAL-", val);
  console.log("BALLANCE-", balance);
});

module.exports = {};
