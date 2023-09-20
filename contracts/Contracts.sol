// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./PayContract.sol"; // Importa la interfaz
import "./PagoContrato.sol";

contract Contracts { 

    PayContract private payContractInterface;
    PagoContrato private pagoContratoInstance;

    struct Contract {
        uint256 id;
        address contratante;
        address contratado;
        address garante;
        address garante1;
        address garante2;
        string descripcion;
        uint256 date;
        uint256 monto;
        bool done ;
    }

    event ContractCreated(
        uint256 id,
        address contratante,
        address contratado,
        address garante,
        address garante1,
        address garante2,
        string descripcion,
        uint256 date,
        uint256 monto,
        bool done
    );

    event ContractReadyToExecute(
        uint256 id,
        string descripcion,
        uint256 monto,
        address contratante
    );

    event ContractFrozen(
        uint256 id
    );

    event ContractExecuted(
        uint256 id,
        string descripcion,
        uint256 monto,
        address contratado
    );

    event TransferToDestinyRequested(uint256 amount, address destination);

    mapping(address => mapping(uint256 => Contract)) public contracts;
    mapping(address => uint256) public contractsCount;
    mapping(uint256 => mapping(address => bool)) confirmations;


    /*uint256 constant public confirmationThreshold = 75;
    uint256 constant public freezeTime = 1 days; // 24 horas
    uint256 constant public gasPrice = 10 gwei; // El precio del gas se define en gwei*/

    constructor(address _pagoContratoAddress) {
        // Asignar la instancia del contrato PagoContrato
        pagoContratoInstance = PagoContrato(_pagoContratoAddress);
        
        createContract(
            0xF67937fef2855F52043bc7132BC197c5532AC0fe, 
            0xa768eDbE5BE6432f5b93DFC6C06207ed50661aCd, 
            0x437f452c11b3fF5C25FCe320AcE475926a42ccEa, 
            0x300F10877b32b94dDC5A43e506a8182A1C58CD10, 
            0x7A9b1eb9c7Af756ce7a7A3F337e437dB7813C041, 
            "fvgragnir brgijrv ny rtgcf  thverhtgvewhyvwer thvwerbtv8", 
            1643769600, // fecha: 2022-02-03 00:00:00
            0);
    }

    function createContract(
        address _contratante,
        address _contratado,
        address _garante,
        address _garante1,
        address _garante2,
        string memory _descripcion,
        uint256 _date,
        uint256 _monto
    ) public {
        uint256 contractCount = contractsCount[msg.sender];
        contracts[msg.sender][contractCount] = Contract(
            contractCount,
            _contratante,
            _contratado,
            _garante,
            _garante1,
            _garante2,
            _descripcion,
            _date,
            _monto,
            false
        );
        emit ContractCreated(
            contractCount,
            _contratante,
            _contratado,
            _garante,
            _garante1,
            _garante2,
            _descripcion,
            _date,
            _monto,
            false
        );
        contractsCount[msg.sender]++;
    }

    event ContractDone(
        uint id,
        bool done
    );

    event ContractConfirmed(string message);

  

    function toggleDone(uint _id) public{
        Contract memory task = contracts[msg.sender][_id];
        task.done = !task.done;
        contracts[msg.sender][_id] = task;
        emit ContractDone(_id, task.done);
    }

    function confirmContract(uint256 _id) public {
        require(confirmations[_id][msg.sender] == false, "Ya has confirmado este contrato.");
        confirmations[_id][msg.sender] = true;
        Contract storage contractData = contracts[msg.sender][_id];
        uint256 confirmationCount = 0;
        for (uint256 i = 0; i < 5; i++) {
            address participant;
            if (i == 0) {
                participant = contractData.contratante;
            } else if (i == 1) {
                participant = contractData.contratado;
            } else if (i == 2) {
                participant = contractData.garante;
            } else if (i == 3) {
                participant = contractData.garante1;
            } else {
                participant = contractData.garante2;
            }
            if (confirmations[_id][participant]) {
                confirmationCount++;
            }
        }
        if (confirmationCount >= 3) {
            // Si al menos 3 participantes confirman, se realiza la transferencia
            // Ejecutar la función de transferencia en el contrato PagoContrato
            payContractInterface.transferirACuentaDestino(contractData.monto, contractData.contratado);
        
            // Emitir el evento correspondiente y un mensaje de confirmación
            emit ContractConfirmed("Contrato confirmado y ejecutado con exito.");
        }else{
            // En caso de que no se alcance el umbral mínimo, transferir a la cuenta contratante
            payContractInterface.transferirACuentaDestino(contractData.monto, contractData.contratante);
        
            // Emitir el evento correspondiente y un mensaje de confirmación
            emit ContractConfirmed("Contrato confirmado, pero no se ejecuto debido a la falta de confirmaciones suficientes.");
        }
    }

    function isContractFrozen(uint256 _id) public view returns (bool) {
        Contract storage contractData = contracts[msg.sender][_id];
        return block.timestamp >= contractData.date && !contractData.done;
    }

    function compareContractDateAndExecute(uint256 _id) public {
        uint256 contractDate = contracts[msg.sender][_id].date;
        uint256 currentTimestamp = block.timestamp;

        if (contractDate == currentTimestamp && !contracts[msg.sender][_id].done) {
        confirmContract(_id);
        }
    }

    function getContratante() public view returns (address) {
        return contracts[msg.sender][0].contratante;
    }

    function getContratado() public view returns (address) {
        return contracts[msg.sender][0].contratado;
    }

    function getMonto(uint256 _id) public view returns (uint256) {
        return contracts[msg.sender][_id].monto;
    }

    function getDate(uint256 _id) public view returns (uint256) {
        return contracts[msg.sender][_id].date;
    }

    function getContractId(address _user, uint256 _index) public view returns (uint256) {
        require(_index < contractsCount[_user], "Indice de contrato fuera de rango.");
        return contracts[_user][_index].id;
    }


}

