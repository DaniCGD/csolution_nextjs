import Head from 'next/head'
import type { NextPage } from 'next'
import { 
  VStack, 
  Heading, 
  Flex, 
  Button, 
  Input, 
  Box, 
  useColorMode, 
  useColorModeValue 
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoSunny, IoMoon } from 'react-icons/io5'

const Login: NextPage = () =>{

  const {toggleColorMode} = useColorMode();
  const [toggle, setToggle] = useState(false);

  const formBackGraund = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack>
      <Head>
        <title>CSolution</title>
        <meta name='description' content='Csolution'/>
        <link rel="icon" href="/favicon.ico" />
      </Head> 
       
      <Flex 
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex
          direction={"column"}
          background={formBackGraund}
          p={"12"}
          rounded={"6"}
          position={"relative"}
        >
          <Heading mb={6}>
            Login
          </Heading>
          <Input 
            placeholder='Your email...'
            variant={"filled"}
            mb={3}
            type="email"
          />

          <Input
            placeholder='*************'
            variant={"filled"}
            type="password"
            mb={6}

          />

          <Button
            colorScheme={"teal"}
          >
            Log in
          </Button>

          <Box
            position={"absolute"}
            top={"2"}
            right={"2"}
            cursor={"pointer"}
            onClick={() =>{
              toggleColorMode();
              setToggle(!toggle);
            }}
          >
            {toggle ? <IoMoon/> : <IoSunny/>}
          </Box>
          
        </Flex>
      </Flex>
          
    </VStack>
  )

}

export default Login