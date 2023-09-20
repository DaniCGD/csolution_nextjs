// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Contracts.sol";

contract Timer {
    using Counters for Counters.Counter;
    Counters.Counter private _timerId;

    mapping(uint256 => uint256) private _executions;

    function startTimer(uint256 interval) external {
        _timerId.increment();
        _executions[_timerId.current()] = block.timestamp + interval;
    }

    function execute(uint256 timerId) external returns (bool) {
        require(_executions[timerId] > 0, "Timer not found or expired");
        if (block.timestamp >= _executions[timerId]) {
            _executions[timerId] = 0;
            return true;
        }
        return false;
    }
}


contract AutomaticExecutor is Ownable {

    Contracts public contratoOriginal;

    Timer private _timer;
    Counters.Counter private _timerId;

    uint256 private _interval = 1 days; // Intervalo de 1 día

    constructor(address timerAddress) {
        _timer = Timer(timerAddress);
        _timerId._value = 1; // Inicializar el contador _timerId en 0
    }

    function setTimerInterval(uint256 interval) external onlyOwner {
        _interval = interval;
    }

    function startAutomaticExecution() external onlyOwner {
        _timer.startTimer(_interval);
    }

    function checkAndExecute() external onlyOwner {
        bool executed = _timer.execute(_timerId._value);
        if (executed) {
            contratoOriginal.compareContractDateAndExecute(_timerId._value);
        }
    }
}


