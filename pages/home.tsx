import Head from 'next/head';
import type { NextPage } from 'next';
import { VStack, HStack, Text, Button, Input, Box, Spacer } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { load, transferir, verificarMonto, verificarTransaccion} from '../src/funcs';
import Web3 from 'web3';
//Components
import { NavBar } from '../src/components/NavBar';

const Home: NextPage = () => {
  //Cuenta demo
  const DESTINO = '0x8e4851Bc7be1B37a39Ded606D4442e255bAB423A';

  const [contratante, setContratante] = useState<any>(null);
  const [contratado, setContratado] = useState<any>(null);
  const [garante, setGarante] = useState<any>(null);
  const [garante1, setGarante1] = useState<any>(null);
  const [garante2, setGarante2] = useState<any>(null);
  const [date, setDate] = useState<string>('');
  const [monto, setMonto] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(true);
  const [addressAccount, setAddressAccount] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [contract, setContract] = useState<any>(null);
  
  const parsedDate = Date.parse(date);
  const daysSinceEpoch = Math.floor(parsedDate / (24 * 60 * 60 * 1000));

  const handleContratanteChange = (e: React.ChangeEvent<HTMLInputElement>) => setContratante(e.target.value);
  const handleContratadoChange = (e: React.ChangeEvent<HTMLInputElement>) => setContratado(e.target.value);
  const handleGaranteChange = (e: React.ChangeEvent<HTMLInputElement>) => setGarante(e.target.value);
  const handleGarante1Change = (e: React.ChangeEvent<HTMLInputElement>) => setGarante1(e.target.value);
  const handleGarante2Change = (e: React.ChangeEvent<HTMLInputElement>) => setGarante2(e.target.value);
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => setMonto(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const handleAddContract = async () => {
    try {
      if (!contratante || !contratado || !garante || !garante1 || !garante2) {
        console.error('Ingrese todas las direcciones requeridas');
        return;
      }
  
      console.log('Monto', monto)
      const balance = await verificarMonto(monto);
      console.log('Balance', balance);
      if( balance === true ){
        //const txHash = 
        await transferir(monto, DESTINO);
        //console.log('txHash', txHash);
        //await verificarTransaccion(txHash);
      }else{
        console.log('Saldo insuficiente para establecer el contrato');
      }
  
      try {

        const direccionContratante = Web3.utils.toChecksumAddress(contratante.trim());
        const direccionContratado = Web3.utils.toChecksumAddress(contratado.trim());
        const direccionGarante = Web3.utils.toChecksumAddress(garante.trim());
        const direccionGarante1 = Web3.utils.toChecksumAddress(garante1.trim());
        const direccionGarante2 = Web3.utils.toChecksumAddress(garante2.trim());
    
        await contract.createContract(
          direccionContratante,
          direccionContratado,
          direccionGarante,
          direccionGarante1,
          direccionGarante2,
          description,
          daysSinceEpoch,
          monto,
          { from: addressAccount }
        );
      } catch (error) {
        //console.error('Error al llamar al transferir a Demo:', error);
      }
  
      // Reinicia los valores del formulario
      /*setContratante('');
      setContratado('');
      setGarante('');
      setGarante1('');
      setGarante2('');
      setDescription('');
      setDate('');
      setMonto('');
      setRefresh(true);*/
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Error desconocido:', error);
      }
    }
  };
  

  useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load()
      .then((e) => {
        if (e) {
          setAddressAccount(e.addressAccount);
          setContracts(e.contracts);
          setContract(e.todoContract);
        } else {
          console.error('Hubo un error al cargar los datos');
        }
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
      });
  }, [refresh]);

  const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

  return (
    <VStack>

      <HStack w='full'>
        <Spacer />
        <VStack>
          <NavBar />
          <Text>{tab}</Text>
          <Box h='30px' />
          <Text>Wallets</Text>
          <HStack>
            <Input
              type='text'
              size='md'
              placeholder='Contratante'
              onChange={handleContratanteChange}
              value={contratante}
            />
            <Input
              type='text'
              size='md'
              placeholder='Contratado'
              onChange={handleContratadoChange}
              value={contratado}
            />
          </HStack>
          <Text>Garante(s) {tab} Datos del Contrato</Text>
          <HStack>
            <Input
              type='text'
              size='md'
              placeholder='Garante'
              onChange={handleGaranteChange}
              value={garante}
            />
            <Input
              type='text'
              size='md'
              placeholder='Fecha || yyyy-'
              onChange={handleDateChange}
              value={date}
            />
          </HStack>
          <HStack>
            <Input
              type='text'
              size='md'
              placeholder='Garante'
              onChange={handleGarante1Change}
              value={garante1}
            />
            <Input
              type='text'
              size='md'
              placeholder='Monto'
              onChange={handleMontoChange}
              value={monto}
            />
          </HStack>
          <HStack>
            <Input
              type='text'
              size='md'
              placeholder='Garante'
              onChange={handleGarante2Change}
              value={garante2}
            />
            <Input
              type='text'
              size='md'
              placeholder='Descripcion'
              onChange={handleDescriptionChange}
              value={description}
            />
          </HStack>
          <Box h='15px' />
          <Button onClick={handleAddContract} bg='green.300'>Crear</Button>
        </VStack>
        <Spacer />
      </HStack>
    </VStack>
  );
};

export default Home