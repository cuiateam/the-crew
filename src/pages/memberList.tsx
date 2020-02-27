import React from 'react'
import Firebase from '../config/firebase'
import Link from 'react-router-dom/Link'
import {
    ThemeProvider,
    CSSReset,
    theme,
    List,
    ListItem,
    Button,
    Flex,
    Heading,
    Grid,
    Box
} from '@chakra-ui/core'

interface Skill { name: String, value: number }
interface Props { }
interface Member { id?: string, name?: string, phone?: string, phoneaux?: string, email?: string, github?: string, linkedin?: string, skills?: Skill[], www?: string[], obs?: string }
interface State { memberList?: Member[] }
const db: any = Firebase.firestore()

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            memberList: []
        }

        let member: Member

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

    deleteMember(id: string) {
        db.collection("Members").doc(id).delete()

        this.setState({
            memberList: this.state.memberList.filter(m => m.id.trim() !== id.trim())
        })
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CSSReset />
                <Flex ml={10} mr={10} mt={10}>
                    <Heading>The Crew</Heading>
                    <Button ml="10" fontSize="xs" variantColor="green"><Link to={`/member/0/INS`}>+</Link></Button>
                </Flex>
                <Grid display="flex" justifyContent="center" alignItems="center" m={10}>
                    <Box justifyContent="center" alignItems="center" width={['100%', "80%", "50%", "40%"]}>
                        <List>
                            {
                                this.state.memberList.map((m, index) => 
                                <div key={"div" + index}>
                                    <ListItem key={index} display="inline" fontWeight="bold" mr="10" >- <Link to={`/member/${m.id}/UPD`}>{m.name}</Link></ListItem>
                                    <Button key={"bt" + index} size="xs" variantColor="red"  onClick={e => this.deleteMember(m.id)} >x</Button>
                                    <br />
                                </div>
                                )
                            }
                        </List>
                    </Box>
                </Grid>
            </ThemeProvider>
        )
    }



}

export default App;
