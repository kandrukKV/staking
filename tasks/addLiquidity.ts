import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

task("addLiquidity", "Add liquidity for TKY/VRN pair")
  .addParam("vrn", "VRN amount")
  .addParam("tky", "TKY amount")
  .setAction(async function (args, hre) {
    const [owner] = await hre.ethers.getSigners();
    const deadline = Math.floor(Date.now() / 1000) + 600;

    const vrnToken = await hre.ethers.getContractAt(
      "ERC20",
      process.env.CONTRACT_ADDRESS_VRN as string
    );

    const tkyToken = await hre.ethers.getContractAt(
      "ERC20",
      process.env.CONTRACT_ADDRESS_TKY as string
    );

    const amountVRN = hre.ethers.utils.parseEther(args.vrn);
    const amountTKY = hre.ethers.utils.parseEther(args.tky);

    await vrnToken.approve(process.env.UNISWAP_V2_ROUTER as string, amountVRN);

    const allowanceVrn = await vrnToken.allowance(
      owner.address,
      process.env.UNISWAP_V2_ROUTER as string
    );
    console.log("Allowance VRN - ", allowanceVrn);

    await tkyToken.approve(process.env.UNISWAP_V2_ROUTER as string, amountTKY);
    const allowanceTky = await tkyToken.allowance(
      owner.address,
      process.env.UNISWAP_V2_ROUTER as string
    );
    console.log("Allowance TKY - ", allowanceTky);

    const router = await hre.ethers.getContractAt(
      "IUniswapV2Router02",
      process.env.UNISWAP_V2_ROUTER as string
    );

    const lc = await router.addLiquidity(
      process.env.CONTRACT_ADDRESS_VRN as string,
      process.env.CONTRACT_ADDRESS_TKY as string,
      amountVRN,
      amountTKY,
      0,
      0,
      owner.address,
      deadline
    );
    console.log(lc);
  });

module.exports = {};
