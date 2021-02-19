import React, { useEffect, useState } from 'react'
import Firebase from '../config/firebase'
import { Link } from 'react-router-dom'
import '../css/main.css'

import ConfirmDialog from '../components/confirmDialog'
import DarkModeToggle from '../components/darkModeToggle'
import LogoutButton from '../components/logoutButton'

import {
    ThemeProvider,
    CSSReset,
    theme,
    Button,
    Flex,
    Heading,
    Grid,
    Box,
    Divider,
    Avatar, 
    Text

  } from '@chakra-ui/core'

import { useUserContext } from '../context/UserContext'

interface Skill { name: String, value: number }
interface Member { id?: string, name?: string, phone?: string, phoneaux?: string, email?: string, github?: string, linkedin?: string, skills?: Skill[], www?: string[], obs?: string }
const db: any = Firebase.firestore()

const App = () => {
    const { userInfo } = useUserContext()

    const [memberList, setMemberList ] = useState<Member[]>([])
    const [isConfirmDialogOpen, setIsConfirmDialogOpen ] = useState<boolean>(false)
    const [rowId, setRowId ] = useState<string>('')
    const [rowValue, setRowValue ] = useState<string>('')

    useEffect(() => {
        loadMembers()
        // eslint-disable-next-line
    }, [])

    const loadMembers = async () => {
        let member: Member

        await db.collection("Members").get().then((querySnapshot) => {
            querySnapshot.forEach((m) => {
                member = {
                    id: m.id,
                    name: (m.data().name ? m.data().name : ""),
                    phone: (m.data().phone ? m.data().phone : ""),
                    email: (m.data().email ? m.data().email : ""),
                    github: (m.data().github ? m.data().github : ""),
                    linkedin: (m.data().linkedin ? m.data().linkedin : ""),
                    skills: (m.data().skills ? m.data().skills : []),
                    www: (m.data().www ? m.data().www : []),
                    obs: (m.data().obs ? m.data().obs : "")
                }

                setMemberList(list => [...list, member])
            })
        })
    }

    const openConfirmDialog = (id: string, name: string) => {
        setRowId(id)
        setRowValue(name.replace(/ .*/,'').toUpperCase())
        setIsConfirmDialogOpen(true)
    }

    const deleteMember = async () => {
        await db.collection("Members").doc(rowId).delete()

        setMemberList(memberList.filter(m => m.id.trim() !== rowId.trim()))
        setIsConfirmDialogOpen(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            
            <Flex ml={10} mr={10} mt={10}>
                <Heading>The Crew</Heading>
                <Button className="btn-add-member" variantColor="green" ><Link to={`/member/0`}>+</Link></Button>
                <DarkModeToggle />
                <LogoutButton />
            </Flex>
            
            <Divider mt={10}/>
            
            <ConfirmDialog title="Delete Member" 
                description={`Are you sure to delete ${rowValue}? You can't undo this action afterwards!`}
                isOpen={isConfirmDialogOpen} 
                handleCLick={() => {(deleteMember())}} 
                handleCLickClose={() => setIsConfirmDialogOpen(false)}/>

            <Grid display="flex" justifyContent="center" alignItems="center" m={10}>
                <Box justifyContent="center" alignItems="center" width={['100%', "80%", "50%", "40%"]}>
                    <table className="table">
                        <tbody>
                            {
                                memberList.map((m, index) => 
                                <tr key={"div" + index} className="line" >
                                    <td className="col-avatar" key={`avatar-${index}`}>
                                        <Link to={`/member/${m.id}`}>
                                            <Avatar size="md" mr={5} mb={2} mt={2} src={"https://github.com/".concat(m.github ? m.github : "github").concat(".png?size=200")}/>
                                        </Link>
                                    </td>
                                    <td className="col-name" key={`name-${index}`}>
                                        <strong>
                                            <Link to={`/member/${m.id}`}>
                                                <Text fontSize={["sm", "sm", "md", "lg"]}>
                                                    {m.name}
                                                </Text>
                                            </Link>
                                        </strong>
                                    </td>
                                    {userInfo.isAdmin &&
                                        <td className="col-button">
                                            <Button key={`button-${index}`} size="xs" variantColor="red" onClick={e => {openConfirmDialog(m.id, m.name)}} >x</Button>
                                        </td>
                                    }
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Box>
            </Grid>
        </ThemeProvider>
    )
}

export default App;
