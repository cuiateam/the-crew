import React from 'react'
import { Link } from 'react-router-dom'
import TheCrew from '../assets/TheCrew.png'
import {
    ThemeProvider,
    CSSReset,
    theme,
    Flex,
    Heading,
    Grid,
    Box,
    Divider,
    Image,
    Text,
    Button
} from '@chakra-ui/core'

function NotFound() {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />

            <Flex ml={10} mr={10} mt={10}>
                <Heading>404 - Page Not Found</Heading>
            </Flex>

            <Divider borderColor="blackAlpha.500" mt={10} />

            <Grid display="flex" justifyContent="center" alignItems="center" m={10}>
                <Box justifyContent="center" alignItems="center" width={['100%', "80%", "50%", "40%"]}>
                    <Image src={TheCrew} alt="The Crew" className="center"/>
                    <Text style={{textAlign: 'center'}} fontSize="6xl">The Crew</Text>
                    <Text style={{textAlign: 'center'}} fontSize="1xl">
                        Find your way &nbsp;
                        <Button backgroundColor="gray.500" color="whiteAlpha.900">
                            <Link to="/">Home</Link>
                        </Button>
                    </Text>
                </Box>
            </Grid>
        </ThemeProvider>
    )
}

export default NotFound