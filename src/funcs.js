import ContractsJSON from '../build/contracts/Contracts.json';
import Web3 from 'web3';
const contract = require('@truffle/contract');

export const load = async () => {
  const web3 = await loadWeb3(); // Initialize web3 here
  if (!web3) {
    console.error('Failed to initialize web3.');
    return null;
  }
  
  const addressAccount = await loadAccount(web3); // Pass web3 to loadAccount
  if (!addressAccount) {
    console.error('Failed to load Ethereum address.');
    return null;
  }
  
  const { todoContract, contracts } = await loadContract(web3, addressAccount);

  return { addressAccount, todoContract, contracts };
};

const loadTasks = async (todoContract, addressAccount) => {
  const contractsCount = await todoContract.contractsCount(addressAccount);
  const contracts = [];
  for (var i = 0; i < contractsCount; i++) {
    const contract = await todoContract.contracts(addressAccount, i);
    contracts.push(contract);
  }

  return contracts;
};

const loadContract = async (web3, addressAccount) => {
  const theContract = contract(ContractsJSON);
  theContract.setProvider(web3.currentProvider); // Use web3.currentProvider
  const todoContract = await theContract.deployed();
  const contracts = await loadTasks(todoContract, addressAccount);

  return { todoContract, contracts };
};

const loadAccount = async (web3) => { // Accept web3 as a parameter
  const accounts = await web3.eth.getAccounts();
  const addressAccount = accounts[0]; // Use the first account
  console.log('Ethereum address:', addressAccount);
  return addressAccount;
};

const loadWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      return web3; // Return the initialized web3 instance
    } catch (error) {
      // User denied account access ...
      console.error('Failed to enable Ethereum:', error);
      return null; // Return null or handle the error
    }
  } else if (window.web3) {
    const web3 = new Web3(web3.currentProvider);
    return web3; // Return the initialized web3 instance
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask');
    return null; // Return null or handle the lack of web3
  }
};

// Call the load function to start the process
load().then(result => {
  if (result !== null) {
    console.log('Loaded data:', result);

  } else {
    console.error('Failed to load data.');
  }
}).catch(error => {
  console.error('Error:', error);
});

export const verificarMonto = async (monto) => {
  if (!window.ethereum) {
    throw new Error("MetaMask no detectado. Por favor, instala MetaMask y conecta tu billetera.");
  }

  // Crear una instancia de Web3 utilizando Ethereum Provider
  const web3 = new Web3(window.ethereum);

  try {
    // Solicitar acceso a la cuenta del usuario (si aún no lo tienes)
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Obtener la dirección de la cuenta actual
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Obtener el saldo de la cuenta en wei
    const balanceWei = await web3.eth.getBalance(account);

    // Convertir el saldo de wei a ether
    const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

    if (parseFloat(balanceEther) < monto) {
      throw new Error("No hay suficiente saldo en la cuenta.");
    }

    return true;
  } catch (error) {
    console.error("Error al verificar el saldo:", error);
    throw error;
  }
};

export const transferir = async (monto, cuentaDemo) => {
  const web3 = await loadWeb3(); // Initialize web3 here
  console.log('Cuenta Demo', cuentaDemo);
  
  try {
    
    //const nonce = await window.ethereum.request({ method: 'eth_getTransactionCount', params: [cuenta, 'latest'] });
    //console.log(nonce);
    const account = await window.ethereum.selectedAddress;
    const gasPrice = await window.ethereum.request({ method: 'eth_gasPrice' });
    const gasTop = '0x' + await web3.utils.toWei(monto.toString(), 'ether');
    const transfer = '0x' + web3.utils.toWei(monto.toString(), 'ether');
    
    const params = [
      {
        from: account,
        to: cuentaDemo,
        gas: gasPrice,
        gasPrice: gasTop,
        value: transfer, 
        data:
          '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675'
      }
    ];
    console.log('Params', params);
  
    try {
      const result = await window.ethereum.request({ method: 'eth_signTransaction', params });
      console.log('Transacción firmada correctamente:', result);

      // Luego puedes enviar la transacción si es necesario
      // const txHash = await window.ethereum.request({ method: 'eth_sendTransaction', params: [result.raw] });
      // console.log('Hash de la transacción:', txHash);

    } catch (error) {
      console.error('Error al firmar la transacción:', error);
      throw error; // Lanza una excepción en caso de error
    }   
  } catch (error) {
    //console.error('Error al transferir:', error);
    throw error; // Lanza una excepción en caso de error
  }
};

export const verificarTransaccion = async (txHash) => {
  const esExitosa = await transferir(txHash);

  if (esExitosa) {
    console.log("Transacción realizada correctamente");
  } else {
    console.log("No se pudo realizar la transacción");
  }
};