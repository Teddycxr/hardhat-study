// const { ethers } = require("hardhat");

// async function checkContractExistence(address) {
//     const code = await ethers.provider.getCode(address);
//     return code !== '0x';
// }

// describe("MyContract", function () {
//     it("should do something", async function () {
//         const address = "0x13f4ea83d0bd40e75c8222255bc855a974568dd4"; // 替换为你要检查的地址
//         const isContract = await checkContractExistence(address);
//         console.log(isContract);

//         if (isContract) {
//             console.log(`存在合约在地址 ${address}`);
//         } else {
//             console.log(`地址 ${address} 上没有合约`);
//         }
//     });
// });

const { ethers } = require("hardhat");

async function checkMethodExistence(contractAddress, methodName) {
    // 注意：这里的ABI定义应该与实际合约中的方法签名一致
    const contract = new ethers.Contract(
        contractAddress,
        ["function " + methodName + "() view returns (bool)"], // 示例，根据实际情况修改
        ethers.provider
    );

    try {
        await contract[methodName](); // 尝试调用该方法
        return true;
    } catch (error) {
        return false;
    }
}

// 使用
checkMethodExistence("0x13f4ea83d0bd40e75c8222255bc855a974568dd4", "swapExactETHForTokens").then(exists => {
    if (exists) {
        console.log("方法存在于合约");
    } else {
        console.log("方法不存在于合约");
    }
});
