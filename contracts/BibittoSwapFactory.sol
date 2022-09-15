// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './interfaces/IBibittoSwapFactory.sol';
import './BibittoSwapPair.sol';

contract BibittoSwapFactory is IBibittoSwapFactory {
    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'BibittoSwap: IDENTICAL_ADDRESSES');
        // deterministicにアドレスを生成するため、トークン量でソートする
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'BibittoSwap: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'BibittoSwap: PAIR_EXISTS'); // single check is sufficient
        bytes memory bytecode = type(BibittoSwapPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IBibittoSwapPair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'BibittoSwap: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'BibittoSwap: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}