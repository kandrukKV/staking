import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

task("getPairAddress", "Get TKY/VRN pair address").setAction(async function (
  args,
  hre
) {
  const factory = await hre.ethers.getContractAt(
    "IUniswapV2Factory",
    process.env.UNISWAP_V2_FACTORY as string
  );
  const pair = await factory.getPair(
    process.env.CONTRACT_ADDRESS_VRN as string,
    process.env.CONTRACT_ADDRESS_TKY as string
  );

  console.log("Address pair: ", pair);
});

module.exports = {};
