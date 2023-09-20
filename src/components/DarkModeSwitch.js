import { useColorMode, Switch } from "@chakra-ui/react";
import React, { useState } from 'react'

export const DarkModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    return (
            <Switch
                color="green"
                isChecked={isDark}
                onChange={toggleColorMode}
            >
            </Switch>    
    )
}