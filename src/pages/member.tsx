import React from 'react'
import Firebase from '../config/firebase'
import { Link } from 'react-router-dom'
import {
    ThemeProvider,
    CSSReset,
    theme,
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    Heading,
    Grid,
    Box,
    List,
    ListItem,
    Avatar,
    Divider,
    Alert,
    AlertIcon
} from '@chakra-ui/core'

interface Skill { name: String, value: number }
interface Props { mode?: string, id?: string }
interface State { name?: string, phone?: string, phoneaux?: string, email?: string, github?: string, linkedin?: string, skills?: Skill[], www?: string[], obs?: string, skillname?: string, skillvalue?: number, wwwdesc?: string, alertMessage?: string, showAlert?: boolean, props?: any}

class Member extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        let propsAux: any = this.props

        this.state = {
            name: "",
            phone: "",
            phoneaux: "",
            email: "",
            github: "",
            linkedin: "",
            skills: [],
            www: [],
            obs: "",
            skillname: "",
            skillvalue: 0,
            wwwdesc: "",
            alertMessage: "",
            showAlert: false,
            props: propsAux.match.params
        }
        if(this.state.props.mode !== "INS")
            this.loadMember()

    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addMember = e => {
        e.preventDefault()
        const db = Firebase.firestore()
        db.collection("Members").add({
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            github: this.state.github,
            linkedin: this.state.linkedin,
            skills: this.state.skills,
            www: this.state.www,
            obs: this.state.obs
        }).then(() => {
            this.setState({alertMessage: "Member inserted with success!", showAlert: true})
        }).then(() => setTimeout(() =>{
            this.setState({alertMessage: "", showAlert: false})
        }, 2000))
    }

    updateMember = e => {
        e.preventDefault()
        const db = Firebase.firestore()
        db.collection("Members").doc(this.state.props.id).set({
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            github: this.state.github,
            linkedin: this.state.linkedin,
            skills: this.state.skills,
            www: this.state.www,
            obs: this.state.obs
        }).then(() => {
            this.setState({alertMessage: "Member updated with success!", showAlert: true})
        }).then(() => setTimeout(() =>{
            this.setState({alertMessage: "", showAlert: false})
        }, 2000))
        
    }

    addSkill = () => {
        let name: string = this.state.skillname
        let value: number = this.state.skillvalue
        let skillAux: Skill = {name, value}
        let skillsAux: Skill[] = this.state.skills

        skillsAux = skillsAux.filter(s => s.name.trim() !== this.state.skillname.trim())
        skillsAux.push(skillAux)

        this.setState({
            skills: skillsAux,
            skillname: "",
            skillvalue: 0
        })

    }

    addWww = () => {
        this.setState({
            www: [...this.state.www, this.state.wwwdesc],
            wwwdesc: ""
        })
    }

    cleanState = () => {
        this.setState({
            name: "",
            phone: "",
            phoneaux: "",
            email: "",
            github: "",
            linkedin: "",
            skills: [],
            www: [],
            obs: "",
            skillname: "",
            skillvalue: 0
        })
    }

    loadMember = () => {
        const db = Firebase.firestore()
        let memberRef = db.collection("Members").doc(this.state.props.id)

        memberRef.get().then((m: any) => {
            if(m.exists){
                this.setState({
                    name: (m.data().name ? m.data().name : this.state.name),
                    phone: (m.data().phone ? m.data().phone : this.state.phone),
                    phoneaux: this.state.phone.replace("[^0-9.]", ""),
                    email: (m.data().email ? m.data().email : this.state.email),
                    github: (m.data().github ? m.data().github : this.state.github),
                    linkedin: (m.data().linkedin ? m.data().linkedin : this.state.linkedin),
                    skills: (m.data().skills ? m.data().skills : this.state.skills),
                    www: (m.data().www ? m.data().www : this.state.www),
                    obs: (m.data().obs ? m.data().obs : this.state.obs)
                })
            }
        })
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CSSReset />
                <Flex ml={10} mr={10} mt={10}>
                    <Heading>Member</Heading>
                </Flex>
                <Grid display="flex" justifyContent="center" alignItems="center" m={10}>
                    <Box justifyContent="center" alignItems="center" width={['100%', "80%", "50%", "40%"]}>
                        <FormControl>
                            <Avatar src={"https://github.com/".concat(this.state.github ? this.state.github : "github").concat(".png?size=200")} showBorder width="100px" height="100px"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel pt={10}>Name</FormLabel>
                            <Input type="text" name="name" placeholder="Name" isReadOnly={this.state.props.mode === "DSP"} onChange={this.updateInput} value={this.state.name} />
                        </FormControl>    
                        <FormControl>
                            <FormLabel pt={10}>Phone</FormLabel>
                            <Input type="text" name="phone" placeholder="(99) 9 9999-9999" isReadOnly={this.state.props.mode === "DSP"} onChange={this.updateInput} value={this.state.phone} />
                        </FormControl>    
                        <FormControl>    
                            <FormLabel pt={10}>E-mail</FormLabel>
                            <Input type="email" name="email" placeholder="E-mail" isReadOnly={this.state.props.mode === "DSP"} onChange={this.updateInput} value={this.state.email} />
                        </FormControl>    
                        <FormControl>    
                            <FormLabel pt={10}>GitHub</FormLabel>
                            <Input type="text" name="github" placeholder="Github User" isReadOnly={this.state.props.mode === "DSP"} onChange={this.updateInput} value={this.state.github} />
                        </FormControl>    
                        <FormControl>    
                            <FormLabel pt={10}>LinkedIn</FormLabel>
                            <Input type="text" name="linkedin" placeholder="LinkedIn User" isReadOnly={this.state.props.mode === "DSP"} onChange={this.updateInput} value={this.state.linkedin} />
                        </FormControl>    
                        <FormControl>
                            <FormLabel pt={10} display="flex">Skills</FormLabel>
                            {(this.state.props.mode === "INS" || this.state.props.mode === "UPD") &&
                                <div>
                                    <Input type="text" name="skillname" placeholder="Name" display="inline" width="60%" onChange={this.updateInput} value={this.state.skillname} />
                                    <Input type="number" name="skillvalue" placeholder="Value" display="inline" width="20%" onChange={this.updateInput} value={this.state.skillvalue} />
                                    <Button display="inline" variantColor="green" onClick={this.addSkill}>+</Button>
                                </div>
                            }
                            <List>
                            {this.state.skills.map((s, index) => <ListItem key={index}> - {s.name} ({s.value}/5)</ListItem> )}
                            </List>
                        </FormControl>    
                        <FormControl>
                            <FormLabel pt={10}>Wanna Work With</FormLabel>
                            {(this.state.props.mode === "INS" || this.state.props.mode === "UPD") &&
                                <div>
                                    <Input type="text" name="wwwdesc" placeholder="Name" display="inline" width="80%" onChange={this.updateInput} value={this.state.wwwdesc} />
                                    <Button display="inline" variantColor="green" onClick={this.addWww}>+</Button>
                                </div>
                            }
                            <List>
                            {this.state.www.map((w, index) => <ListItem key={index}> - {w}</ListItem>)}
                            </List>
                        </FormControl>    
                        <FormControl>
                            <FormLabel pt={10}>Observation</FormLabel>
                            <Input type="text" name="obs" placeholder="Observation" isReadOnly={this.state.props.mode === "DSP"} onChange={this.updateInput} value={this.state.obs} />
                        </FormControl>    
                        <FormControl>
                            {this.state.phone &&
                                <Button size="sm" backgroundColor="green.500" color="whiteAlpha.900" mt={10} leftIcon="external-link">
                                    <a target="_blank" rel="noopener noreferrer" href={"https://wa.me/".concat(this.state.phone.replace(/[^0-9]/g, ''))}>WhatsApp</a>
                                </Button>
                            }
                            {this.state.github &&
                                <Button size="sm" backgroundColor="gray.900" color="whiteAlpha.900" mt={10} ml={5} leftIcon="external-link">
                                    <a target="_blank" rel="noopener noreferrer" href={"https://github.com/".concat(this.state.github)}>GitHub</a>
                                </Button>
                            }

                            {this.state.linkedin &&
                                <Button size="sm" backgroundColor="blue.500" color="whiteAlpha.900" mt={10} ml={5} leftIcon="external-link">
                                    <a target="_blank" rel="noopener noreferrer" href={"https://br.linkedin.com/in/".concat(this.state.linkedin)}>LinkedIn</a>
                                </Button>
                            }

                            {this.state.showAlert &&
                                <Alert mt={10} status="success" mb="10">
                                    <AlertIcon />
                                    {this.state.alertMessage}
                                </Alert>
                            }

                            <Divider borderColor="blackAlpha.500" mt={10}/>

                            {this.state.props.mode === "INS" &&
                                <Button backgroundColor="messenger.500" color="whiteAlpha.900" mr="5" onClick={this.addMember} leftIcon="check">
                                    Save
                                </Button>
                            }

                            {this.state.props.mode === "UPD" &&
                                <Button backgroundColor="messenger.500" color="whiteAlpha.900" mr="5" onClick={this.updateMember} leftIcon="check">
                                    Save
                                </Button>
                            }
                            <Button backgroundColor="gray.500" color="whiteAlpha.900" leftIcon="arrow-back"><Link to="/">Back</Link></Button>
                        </FormControl>
                    </Box>
                </Grid>
            </ThemeProvider>
        )
    }
}

export default Member

