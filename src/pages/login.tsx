import React from 'react'
import { Link } from 'react-router-dom'
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
} from '@chakra-ui/core'

function Login() {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />

            <Flex ml={10} mr={10} mt={10}>
                <Heading>Login</Heading>
            </Flex>

            <Divider borderColor="blackAlpha.500" mt={10} />

            <Grid display="flex" justifyContent="center" alignItems="center" m={10}>
                <Box justifyContent="center" alignItems="center" width={['100%', "80%", "50%", "40%"]}>
                    <FormControl>    
                        <FormLabel pt={10}>E-mail</FormLabel>
                        <Input type="email" name="email"/>
                    </FormControl>
                    <FormControl>    
                        <FormLabel pt={10}>Password</FormLabel>
                        <Input type="password" name="password" />
                    </FormControl>
                    <FormControl>
                        <Divider borderColor="blackAlpha.500" mt={10}/>
                        <Button type="submit" backgroundColor="messenger.500" color="whiteAlpha.900" mr="5" leftIcon="unlock">
                            Log In
                        </Button>
                        <Button backgroundColor="whatsapp.500" color="whiteAlpha.900" mr="5" leftIcon="plus-square">
                            Sign Up
                        </Button>
                        <Button backgroundColor="gray.500" color="whiteAlpha.900" leftIcon="arrow-back"><Link to="/">Back</Link></Button>
                    </FormControl>
                </Box>
            </Grid>
        </ThemeProvider>
    )
}

export default Login