// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IPancakeRouter03 {
    function swapExactETHForTokens (
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
}

contract MultiTokenPurchase {
    IPancakeRouter03 public pancakeRouter;

    constructor() {
        pancakeRouter = IPancakeRouter03(0x10ED43C718714eb63d5aA57B78B54704E256024E);
    }

    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    function transderToContract() payable public {
        payable(address(this)).transfer(msg.value);
    }

    function buyMultipleTokens(address wethaddress,address[] calldata _tokens, uint[] calldata _minOuts,uint deadline) external payable {
        require(_tokens.length == _minOuts.length, "Tokens and min outs length mismatch");
        uint _amountIn = address(this).balance / (_tokens.length + 1);

        for (uint i = 0; i < _tokens.length; i++) {
            address[] memory path = new address[](2);
            path[0] = wethaddress; 
            path[1] = _tokens[i];

            pancakeRouter.swapExactETHForTokens{value:_amountIn} (
            _minOuts[i],
            path,
            address(this),
            deadline
        );
        }
    }
}