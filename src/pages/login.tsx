import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    ThemeProvider,
    CSSReset,
    theme,
    Flex,
    Heading,
    Grid,
    Box,
    Divider,
    Button,
    FormControl,
    FormLabel,
    Input,
    Alert,
    AlertIcon,
} from '@chakra-ui/core'

import Firebase from '../config/firebase'
import DarkModeToggle from '../components/darkModeToggle'
import { useUserContext } from '../context/UserContext'

function Login() {
    const history = useHistory()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const { setUserInfo } = useUserContext()

    
    const loginEmail = () => {
        setErrorMessage('')

        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user.user.uid)
                setUserInfo({
                    uid: user.user.uid,
                    email: user.user.email,
                    signedIn: true
                })
                history.push("/")
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <CSSReset />

            <Flex ml={10} mr={10} mt={10}>
                <Heading>Login</Heading>
                <div className="btn-dark-mode-toggle">
                    <DarkModeToggle />
                </div>
            </Flex>

            <Divider mt={10}/>

            <Grid display="flex" justifyContent="center" alignItems="center" m={10}>
                <Box justifyContent="center" alignItems="center" width={['100%', "80%", "50%", "40%"]}>
                    {errorMessage.length > 0 && 
                        <Alert status="error" variant="solid">
                            <AlertIcon/>
                            {errorMessage}
                        </Alert>
                    }
                    <FormControl>    
                        <FormLabel pt={10}>E-mail</FormLabel>
                        <Input type="email" name="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl>    
                        <FormLabel pt={10}>Password</FormLabel>
                        <Input type="password" name="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                    </FormControl>
                    <FormControl className="group-button">
                        <Divider borderColor="blackAlpha.500" mt={10}/>
                        <Button type="submit" backgroundColor="messenger.500" color="whiteAlpha.900" mr="5" leftIcon="unlock" onClick={() => loginEmail()}>
                            Log In
                        </Button>
                        <Button backgroundColor="whatsapp.500" color="whiteAlpha.900" mr="5" leftIcon="plus-square">
                            Sign Up
                        </Button>
                    </FormControl>
                </Box>
            </Grid>
        </ThemeProvider>
    )
}

export default Login