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
                <Button className="btn-light-mode" onClick={() => setMode('light')} variant="ghost" >
                    <IoIosSunny size="30px" />
                </Button>
            }
            {mode === 'light' &&
                <Button className="btn-dark-mode" onClick={() => setMode('dark')} variant="ghost" >
                    <IoIosMoon size="30px"/>
                </Button>
            }            
        </div>
    )
}

export default DarkModeToggle
