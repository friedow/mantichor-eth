
pragma solidity ^0.5.0;

contract Testcontract {

    uint firstNumber;

    constructor (uint _firstNumber) public {
        firstNumber = _firstNumber;
    }

    function viewNumber() external view returns(uint) {
        return firstNumber;
    }
}