import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, Spinner } from '@chakra-ui/react'
import React from 'react'
import {load} from '../src/funcs'
//Components
import { NavBar } from '../src/components/NavBar'

const Contracts: React.FC = ()=>{

    const [refresh, setRefresh] = React.useState<boolean>(true);
    const [addressAccount, setAddressAccount] = React.useState<any>(null);
    const [contracts, setContracts] = React.useState<any[]>([]);
    const [contract, setContract] = React.useState<any>(null); 
    //Handles
    const handleDone = async (id:number) =>{
        if (contract) {
            await contract.toggleDone(id, { from: addressAccount });
            setRefresh(true);
        }
    };
    //React useEffect
    React.useEffect(() => {
      if(!refresh) return;
      setRefresh(false);
      load()
        .then((e) => {
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
        },[refresh]
    );

    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;
    
    //const formBackGraund = useColorModeValue("gray.100", "gray.700");

    return (
        <VStack>
          <HStack w='full' alignItems='center'>
            <Spacer />
            <VStack>
              <NavBar />
              <Text>{tab}</Text>
              <Text>{tab}</Text>
              <Text>{tab}</Text>
              <Text>Contratos en ejecucion</Text>
              {contracts === null ? (
                <Spinner />
              ) : (
                contracts.map((contract, idx) =>
                    contract[9]? (
                        <HStack key={idx} w='md' borderRadius={7}>
                            <Box w='5px' />
                            <Text>{contract.descripcion}</Text> 
                            <Spacer />
                            <Box w='15px' />
                            <Button
                                bg='red.300'
                                onClick={() => handleDone(contract.id[0])} 
                            >
                                UNDONE
                            </Button>
                        </HStack>
                  ) : null
                )
              )}
              <Box h='10px' />
            </VStack>
            <Spacer />
          </HStack>
        </VStack>
      );
};

export default Contracts