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
    IAlert
} from '@chakra-ui/core'

import Firebase from '../config/firebase'
import DarkModeToggle from '../components/darkModeToggle'
import { useUserContext } from '../context/UserContext'

const Login = () => {
    const history = useHistory()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [alertStatus, setAlertStatus] = useState<IAlert["status"]>("error")

    const { setUserInfo } = useUserContext()
    const db: any = Firebase.firestore()

    // const sendEmailValidation = async (user) => {
    //     user.sendEmailVerification().then(() => {
    //         setAlertStatus("info")
    //         setAlertMessage("A verification message has been sent to your email. Check your email to be able to log in to the system.")
    //     }).catch(error => {
    //         setAlertStatus("error")
    //         setAlertMessage(error.message)
    //     })
    // }
    
    const handleSuccesLogin = async (user) => {
        const query = await db.collection("Members").where("email", "==", user.user.email).get()
        const hasMember = query.docs.length > 0
        let isAdmin: boolean = false
        
        if (hasMember) {
            query.docs.forEach((m) => {
                localStorage.setItem('cttcid', m.id)
                isAdmin = m.data().role === "Admin"
            })
            setUserInfo({
                uid: user.user.uid,
                email: user.user.email,
                isAdmin: isAdmin 
            })
            
            history.push("/")
        } else {
            Firebase.auth().signOut().catch(error => {console.log(error)})
            setAlertStatus("error")
            setAlertMessage(`There is no user record corresponding to this identifier. The user may have been deleted.`)
        }

    }
    const loginEmail = async () => {
        setAlertMessage('')
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const query = await db.collection("Emails").where("email", "==", email).get()
            const hasMember = query.docs.length > 0

            if (hasMember) {
                await Firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(user => {
                        handleSuccesLogin(user)
                    })
                    .catch(error => {
                        setAlertMessage(error.message)
                    })
            } else {
                setAlertStatus("error")
                setAlertMessage(`There is no user record corresponding to this identifier. The user may have been deleted.`)
            }
        } else {
            setAlertStatus("error")
            setAlertMessage(`The email address is badly formatted.`)
        }
    }

    const signUp = async () => {
        setAlertMessage('')
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const query = await db.collection("Emails").where("email", "==", email).get()
            const hasMember = query.docs.length > 0
            
            if (hasMember) {
                Firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => {
                        handleSuccesLogin(user)
                    }).catch(error => {
                        setAlertMessage(error)
                    })
            } else {
                setAlertStatus("error")
                setAlertMessage(`Email '${email}' is not allowed to sign up.`)
            }
        } else {
            setAlertStatus("error")
            setAlertMessage(`The email address is badly formatted.`)
        }

    }

    const submit = e => {
        e.preventDefault()
        loginEmail()
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
                    {alertMessage.length > 0 && 
                        <Alert status={alertStatus} variant="solid">
                            <AlertIcon/>
                            {alertMessage}
                        </Alert>
                    }
                    <form onSubmit={e => {submit(e)}}>
                        <FormControl>    
                            <FormLabel pt={10}>E-mail</FormLabel>
                            <Input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </FormControl>
                        <FormControl>    
                            <FormLabel pt={10}>Password</FormLabel>
                            <Input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl className="group-button">
                            <Divider borderColor="blackAlpha.500" mt={10}/>
                            <Button type="submit" backgroundColor="messenger.500" color="whiteAlpha.900" mr="5" leftIcon="unlock" onClick={() => {loginEmail()}}>
                                Log In
                            </Button>
                            <Button backgroundColor="whatsapp.500" color="whiteAlpha.900" mr="5" leftIcon="plus-square" onClick={() => {signUp()}}>
                                Sign Up
                            </Button>
                        </FormControl>
                    </form>
                </Box>
            </Grid>
        </ThemeProvider>
    )
}

export default Login