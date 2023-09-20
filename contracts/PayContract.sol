// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface PayContract {
    function transferirACuentaDestino(uint256 amount, address destino) external;
}
