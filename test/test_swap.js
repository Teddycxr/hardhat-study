const { expect } = require("chai");
const { ethers } = require("hardhat");

const ERC20_ABI = require("./abi/usdt_abi.json");


describe("BNBToTokenSwap Contract", function () {
    let bnbToTokenSwap;
    let owner;
    const wbnbAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const tokenAddress = "0x55d398326f99059fF775485246999027B3197955";

    beforeEach(async function () {
        const BNBToTokenSwap = await ethers.getContractFactory("BNBToTokenSwap");
        [owner] = await ethers.getSigners();

        bnbToTokenSwap = await BNBToTokenSwap.deploy();
        await bnbToTokenSwap.deployed();

        token = new ethers.Contract(tokenAddress, ERC20_ABI, ethers.provider);
    });

    describe("swapBNBForToken", function () {
        it("should swap BNB for tokens", async function () {
            const sendValue = ethers.utils.parseEther("1");
            await owner.sendTransaction({
                to: bnbToTokenSwap.address,
                value: sendValue
            });

            const balance = await ethers.provider.getBalance(bnbToTokenSwap.address);
            console.log("Contract balance:", ethers.utils.formatEther(balance), "BNB");

            // expect(await ethers.provider.getBalance(bnbToTokenSwap.address)).to.equal(sendValue);

            await expect(bnbToTokenSwap.swapBNBForToken(
                wbnbAddress,
                tokenAddress,
                ethers.utils.parseUnits("100", "wei"), 
                Math.floor(Date.now() / 1000) + 60 * 10, 
                ethers.utils.parseEther("0.5"),
            ));

            const tokenBalance = await token.balanceOf(bnbToTokenSwap.address);
            const balance2 = await ethers.provider.getBalance(bnbToTokenSwap.address);
            console.log("Contract balance:", ethers.utils.formatEther(balance2), "BNB");
            console.log("Token balance in contract:", ethers.utils.formatUnits(tokenBalance, "ether"), "tokens");

        });
    });
});
