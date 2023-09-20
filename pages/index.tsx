import Head from 'next/head'
import type { NextPage } from 'next'
import { VStack } from '@chakra-ui/react'
import React from 'react'
import Login from './login'
import Home from './home'

const Index: NextPage = () =>{

  

  return (
    <VStack>
      <Head>
        <title>CSolution</title>
        <meta name='description' content='Csolution' charSet="UTF-8"/>
        <link rel="icon" href="/favicon.ico" />
      </Head> 
       
      
      <Home/>
          
    </VStack>
  )

}

export default Index