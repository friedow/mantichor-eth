pragma solidity ^0.6.1;

contract Testcontract {

    uint firstNumber;

    constructor (uint _firstNumber) public {
        firstNumber = _firstNumber;
    }

    function viewNumbers() external view returns(uint) {
        return firstNumber;
    }
}