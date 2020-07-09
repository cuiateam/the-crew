import React from 'react'
import Firebase from '../config/firebase'
import { Link } from 'react-router-dom'
import '../css/main.css'

import ConfirmDialog from '../components/confirmDialog'
import DarkModeToggle from '../components/darkModeToggle'

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

  } from '@chakra-ui/core'

interface Skill { name: String, value: number }
interface Props { }
interface Member { id?: string, name?: string, phone?: string, phoneaux?: string, email?: string, github?: string, linkedin?: string, skills?: Skill[], www?: string[], obs?: string }
interface State { memberList?: Member[], isConfirmDialogOpen?: boolean, rowId?: string, rowValue?: string}
const db: any = Firebase.firestore()

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            memberList: [],
            isConfirmDialogOpen: false,
            rowId: '',
            rowValue: ''
        }

        let member: Member
        this.deleteMember = this.deleteMember.bind(this)

        db.collection("Members").get().then((querySnapshot) => {
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

                this.setState({
                    memberList: [...this.state.memberList, member]
                })
            })
        })
    }

    openConfirmDialog (id: string, name: string) {
        this.setState({rowId: id, rowValue: name.replace(/ .*/,'').toUpperCase(), isConfirmDialogOpen: true})
    }

    deleteMember() {
        db.collection("Members").doc(this.state.rowId).delete()

        this.setState({
            memberList: this.state.memberList.filter(m => m.id.trim() !== this.state.rowId.trim()),
            isConfirmDialogOpen: false
        })

    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CSSReset />
                
                <Flex ml={10} mr={10} mt={10}>
                    <Heading>The Crew</Heading>
                    <Button className="btn-add-member" variantColor="green" ><Link to={`/member/0`}>+</Link></Button>
                    <DarkModeToggle />
                </Flex>
                
                <Divider mt={10}/>
                
                <ConfirmDialog title="Delete Member" 
                    description={`Are you sure to delete ${this.state.rowValue}? You can't undo this action afterwards!`}
                    isOpen={this.state.isConfirmDialogOpen} 
                    handleCLick={this.deleteMember} 
                    handleCLickClose={() => this.setState({isConfirmDialogOpen: false})}/>

                <Grid display="flex" justifyContent="center" alignItems="center" m={10}>
                    <Box justifyContent="center" alignItems="center" width={['100%', "80%", "50%", "40%"]}>
                        <table className="table">
                            <tbody>
                                {
                                    this.state.memberList.map((m, index) => 
                                    <tr key={"div" + index} className="line" >
                                        <td className="col-Name" key={index}>
                                            <strong>
                                                <Link to={`/member/${m.id}`}>{m.name}</Link>
                                            </strong>
                                        </td>
                                        <td className="col-Button">
                                            <Button key={"bt" + index} size="xs" variantColor="red" onClick={e => this.openConfirmDialog(m.id, m.name)} >x</Button>
                                        </td>
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



}

export default App;
