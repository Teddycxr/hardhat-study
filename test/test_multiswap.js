const { expect } = require("chai");
const { ethers } = require("hardhat");
const ERC20_ABI = require("./abi/usdt_abi.json");

describe("MultiTokenPurchase Contract", function () {
    let multiTokenPurchase;
    let owner;
    const wethAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; 
    const tokenAddresses = ["0x55d398326f99059fF775485246999027B3197955", "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"]; 
    const minOuts = [100, 200]; 
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; 

    beforeEach(async function () {
        const MultiTokenPurchase = await ethers.getContractFactory("MultiTokenPurchase");
        [owner] = await ethers.getSigners();

        multiTokenPurchase = await MultiTokenPurchase.deploy();
        await multiTokenPurchase.deployed();
    });

    it("should buy multiple tokens", async function () {
        const sendValue = ethers.utils.parseEther("2");
        await owner.sendTransaction({
            to: multiTokenPurchase.address,
            value: sendValue
        });

        const balanceBefore = await ethers.provider.getBalance(multiTokenPurchase.address);
        console.log("Contract balance:", ethers.utils.formatEther(balanceBefore), "BNB");

        await multiTokenPurchase.buyMultipleTokens(wethAddress, tokenAddresses, minOuts, deadline);

        const balanceAfter = await ethers.provider.getBalance(multiTokenPurchase.address);
        console.log("Contract balance:", ethers.utils.formatEther(balanceAfter), "BNB");

        for (const tokenAddress of tokenAddresses) {
            const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, ethers.provider);
            const balance = await tokenContract.balanceOf(multiTokenPurchase.address);
            console.log(`Balance for token at ${tokenAddress}: ${balance.toString()}`);
            };
        });
});