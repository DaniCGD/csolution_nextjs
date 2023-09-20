
import type { NextPage } from 'next'
import { VStack, HStack, Text, Button, Box, Spacer, Spinner, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import {load} from '../src/funcs'
import { useColorModeValue } from '@chakra-ui/react'
//Components
import { NavBar } from '../src/components/NavBar'
import VentanaModal from '../src/components/VentanaModal'
//Styles
import styles from '../styles/modal.module.css'
//Icons
import { AiOutlineEye } from 'react-icons/ai';
import Head from 'next/head'

const Notifications: NextPage = () =>{

    const [stateModal, setStateModal] = useState(false);
    const [contracts, setContracts] = React.useState<any[]>([]);
    const [contract, setContract] = React.useState<any>(null);
    const [addressAccount, setAddressAccount] = React.useState<any>(null);
    const [refresh, setRefresh] = React.useState<boolean>(true);

    const handleDone = async (id:number) =>{
        await contract.toggleDone(id,{from: addressAccount});
        setRefresh(true);
    };
    //React useEffect
    React.useEffect(() => {
        if(!refresh) return;
        setRefresh(false);
        load().then((e) => {
            if (e !== null) {
                setAddressAccount(e.addressAccount);
                console.log('Account', e.addressAccount);

                setContracts(e.contracts);
                console.log('Contract:', e.contracts);

                setContract(e.todoContract);
                console.log('Contracts:', e.todoContract);
            } else {
                console.error('La respuesta de load() es nula');
            }
        });
    },[refresh]);

    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;
    
    const formBackGraund = useColorModeValue("gray.100", "gray.700");

    return(
        <VStack> 
            <HStack w='full'>
                <Spacer/>
                <VStack>
                    <NavBar/>
                    <Text>{tab}</Text>
                    <Text>{tab}</Text>  
                    <Text>{tab}</Text>
                    <Text>CSolution</Text> 
                    <VStack>
                    {
                        contracts == null ? <Spinner/>
                        : contracts.map((contract, idx) =>
                        !contract[9] ?
                            <HStack key={idx} w={"md"} bg={formBackGraund} borderRadius={7}>
                                <Box w='5px' />
                                <Text>{contract[6]}</Text>
                                <Spacer />
                                <Box w='15px'/>
                                <div className={styles.ContenedorBotones}>
                                    <button 
                                        className={styles.Boton}
                                        onClick={ () => setStateModal(!stateModal)}
                                    > 
                                        <AiOutlineEye 
                                            size={"30px"}
                                        />
                                    </button>
                                </div>
                                <Button 
                                    bg='green.300' 
                                    onClick={ () => 
                                        handleDone(contract[0].toNumber())
                                    }
                                >
                                    DONE
                                </Button> 
                            </HStack> : null
                        )
                    }
                    </VStack> 
                    
                    <Box h='10px'/>   
                </VStack>
                <Spacer/>
                <VentanaModal 
                    state={stateModal}
                    changeState={setStateModal}
                    
                >
                    <div   className={styles.Contenido}>
                        {
                            contracts == null ? <Spinner/>
                            : contracts.map((contract, idx) =>
                            !contract[9] ?
                                <div key={idx}>
                                    <Text>Contratante: {contract[1]}</Text>
                                    <Text>Contratado: {contract[2]}</Text>
                                    <Text>Garante: {contract[3]}</Text>
                                    <Text>Garante: {contract[4]}</Text>
                                    <Text>Garante: {contract[5]}</Text>
                                    <Text>Descripcion: {contract[6]} </Text>
                                    <Text>Estado: {!contract[8] == false ?"Finalizado" : "En ejecucion"}</Text>    
                                </div>:null
                            )
                        }
                        <button 
                            className={styles.Buttom}
                            onClick={ () => setStateModal(!stateModal)}
                        > 
                            Aceptar
                        </button>
                    </div>    
                </VentanaModal>
            </HStack>
        </VStack>
        
    )
}

export default Notifications