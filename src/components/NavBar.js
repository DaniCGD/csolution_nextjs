import { useState } from "react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { Flex, Button, IconButton, useColorMode } from "@chakra-ui/react";

//NavBar Components
import { DarkModeSwitch } from './DarkModeSwitch'

export const NavBar= () => {

    const { colorMode } = useColorMode(); 
    const  [display, changeDisplay] = useState('none')

    return (
        <Flex>
            <Flex
                pos="fixed"
                top="1rem"
                right="1rem"
                align="center"
            >
                <Flex
                    display={['none','none', 'flex', 'flex']}
                >
                    <NextLink  href="/home" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Home"
                            my={5}
                            w="100%"
                        >
                            Home
                        </Button>
                    </NextLink>
                
                    <NextLink  href="/contracts" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Contracts"
                            my={5}
                            w="100%"
                        >
                            Contracts
                        </Button>
                    </NextLink>

                    <NextLink  href="/notifications" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Notifications"
                            my={5}
                            w="100%"
                        >
                            Notifications
                        </Button>
                    </NextLink>
                
                    <NextLink  href="/about" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="About"
                            my={5}
                            w="100%"
                        >
                            About
                        </Button>
                    </NextLink>
                
                    <NextLink  href="/contact" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Contact"
                            my={5}
                            w="100%"
                        >
                            Contact
                        </Button>
                    </NextLink>
                </Flex>
                <IconButton
                    aria-label="Open Menu"
                    size="lg"
                    mr={2}
                    icon={<HamburgerIcon/>}
                    display={['flex','flex','none','none']}
                    onClick={()=> changeDisplay('flex')}
                />
                < DarkModeSwitch />
                
            </Flex>
            <Flex
                w="100vw"
                bgColor={colorMode === 'dark' ? "gray.900" : "gray.50"}
                zIndex={20}
                h="100vh"
                pos="fixed"
                top="0"
                left="0"
                overflowY="auto"
                flexDir="column"
                display={display}
            >
                <Flex justify="flex-end">
                    <IconButton
                        mt={2}
                        mr={2}
                        arial-label="Close Menu"
                        size="lg"
                        icon={
                            <CloseIcon/>
                        }
                        onClick={()=> changeDisplay('none')}
                    />
                </Flex>
                <Flex
                    flexDir="column"
                    align="center"
                >   
                    <NextLink  href="/home" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Home"
                            my={5}
                            w="100%"
                        >
                            Home
                        </Button>
                    </NextLink>
    
                    <NextLink  href="/contracts" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Contracts"
                            my={5}
                            w="100%"
                        >
                            Contracts
                        </Button>
                    </NextLink>

                    <NextLink  href="/notifications" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Notifications"
                            my={5}
                            w="100%"
                        >
                            Notifications
                        </Button>
                    </NextLink>
    
                    <NextLink  href="/about" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="About"
                            my={5}
                            w="100%"
                        >
                            About
                        </Button>
                    </NextLink>
    
                    <NextLink  href="/contact" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Contact"
                            my={5}
                            w="100%"
                        >
                            Contact
                        </Button>
                    </NextLink>
                </Flex>   
            </Flex>    
        </Flex>    
    )
}