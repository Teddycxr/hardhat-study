// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IPancakeRouter02 {
    function swapExactETHForTokens (
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
}

contract BNBToTokenSwap {
    IPancakeRouter02 public pancakeRouter;

    constructor() {
        pancakeRouter = IPancakeRouter02(0x10ED43C718714eb63d5aA57B78B54704E256024E);
    }

    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    function transderToContract() payable public {
        payable(address(this)).transfer(msg.value);
    }

    function swapBNBForToken(
        address wethaddress,
        address tokenAddress,
        uint amountOutMin,
        uint deadline,
        uint ethAmount
    ) external payable {
        require(address(this).balance >= ethAmount, "Insufficient ETH balance in contract");

        address[] memory path = new address[](2);
        path[0] = wethaddress;
        path[1] = tokenAddress;

        pancakeRouter.swapExactETHForTokens{value:ethAmount} (
            amountOutMin,
            path,
            address(this),
            deadline
        );
    }
}