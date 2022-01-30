import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

task("createPair", "Create TKY/VRN pair").setAction(async function (args, hre) {
  const factory = await hre.ethers.getContractAt(
    "IUniswapV2Factory",
    process.env.UNISWAP_V2_FACTORY as string
  );
  const pair = await factory.createPair(
    process.env.CONTRACT_ADDRESS_VRN as string,
    process.env.CONTRACT_ADDRESS_TKY as string
  );
  console.log("Created at: ", pair);
});

module.exports = {};
