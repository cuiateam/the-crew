import React, { useState, useEffect } from 'react'
import { IoIosSunny, IoIosMoon } from 'react-icons/io'
import { 
    Button
} from '@chakra-ui/core'

function DarkModeToggle () {

    const [mode, setMode] = useState(localStorage.getItem("color-mode") ? localStorage.getItem("color-mode") : 'dark')

    useEffect(() => {
        const element = document.body

        if (mode === 'dark') {
            element.classList.remove("light-mode")
            element.classList.add("dark-mode")
            localStorage.setItem("color-mode", "dark")            
        } else {
            element.classList.remove("dark-mode")
            element.classList.add("light-mode")
            localStorage.setItem("color-mode", "light")
        }
    }, [mode])

    return (
        <div>
            {mode === 'dark' &&
                <Button onClick={() => setMode('light')} variant="ghost" >
                    <IoIosSunny />
                </Button>
            }
            {mode === 'light' &&
                <Button onClick={() => setMode('dark')} variant="ghost" >
                    <IoIosMoon />
                </Button>
            }            
        </div>
    )
}

export default DarkModeToggle
