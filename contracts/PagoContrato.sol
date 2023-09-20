// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Contracts.sol";

contract PagoContrato {
    address public CONTRATANTE; // dirección del contratante
    address public CONTRATADO; // dirección del contratado
    address public constant DESTINO = 0x8e4851Bc7be1B37a39Ded606D4442e255bAB423A; // dirección donde se enviará el pago

    Contracts private contratoOriginal; // contrato original del que se tomarán los valores

    constructor(address _contratoOriginal) {
        contratoOriginal = Contracts(_contratoOriginal);
        CONTRATANTE = contratoOriginal.getContratante();
        CONTRATADO = contratoOriginal.getContratado();
    }

    function transferirACuentaDestino(uint256 amount, address destino) external {
        require(msg.sender == CONTRATADO, "No tienes permiso para realizar esta accion");
        payable(destino).transfer(amount);
    }
}


