import React from 'react'
import Firebase from '../config/firebase'
import { Link } from 'react-router-dom'
import { IoLogoLinkedin, IoLogoGithub, IoLogoWhatsapp } from 'react-icons/io'
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
    Avatar,
    Divider,
    Alert,
    AlertIcon,
    Textarea 
} from '@chakra-ui/core'

interface Skill { name: String, value: number }
interface Props { mode?: string, id?: string }
interface State { name?: string, phone?: string, phoneaux?: string, email?: string, github?: string, linkedin?: string, skills?: Skill[], www?: string[], obs?: string, skillname?: string, skillvalue?: number, wwwdesc?: string, alertMessage?: string, showAlert?: boolean, id?: string, mode?: string}
const db = Firebase.firestore()

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
            id: propsAux.match.params.id,
            mode: propsAux.match.params.id === '0' ? 'INS' : 'DSP'
        }
        if(this.state.mode !== "INS")
            this.loadMember()

    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addMember = e => {
        e.preventDefault()
        db.collection("Members").add({
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            github: this.state.github,
            linkedin: this.state.linkedin,
            skills: this.state.skills,
            www: this.state.www,
            obs: this.state.obs
        }).then((docRef) => {
            this.setState({alertMessage: "Member inserted with success!", showAlert: true, mode: 'DSP', id: docRef.id})
            window.scroll(0,0)
        }).then(() => setTimeout(() =>{
            this.setState({alertMessage: "", showAlert: false})
        }, 2000))

    }

    updateMember = e => {
        e.preventDefault()
        db.collection("Members").doc(this.state.id).set({
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            github: this.state.github,
            linkedin: this.state.linkedin,
            skills: this.state.skills,
            www: this.state.www,
            obs: this.state.obs
        }).then(() => {
            this.setState({alertMessage: "Member updated with success!", showAlert: true, mode: 'DSP'})
            window.scroll(0,0)
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

    deleteSkill = (s: Skill) => {
        let skillsAux: Skill[] = this.state.skills
        skillsAux = skillsAux.filter(sk => sk.name.trim() !== s.name.trim())
        this.setState({skills: skillsAux})
    }

    addWww = () => {
        this.setState({
            www: [...this.state.www, this.state.wwwdesc],
            wwwdesc: ""
        })
    }

    deleteWww = (w: string) => {
        let wwwAux: string[] = this.state.www
        wwwAux = wwwAux.filter(www => www.trim() !== w.trim())
        this.setState({www: wwwAux})
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
        let memberRef = db.collection("Members").doc(this.state.id)

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
                <Divider borderColor="blackAlpha.500" mt={10}/>
                {this.state.showAlert &&
                    <Alert status="success" mb="10" mt="-5" display="flex" justifyContent="center" alignItems="center">
                        <AlertIcon />
                        {this.state.alertMessage}
                    </Alert>
                }
                <Grid display="flex" justifyContent="center" alignItems="center" m={10}>
                    <Box justifyContent="center" alignItems="center" width={['100%', "80%", "50%", "40%"]}>
                        <FormControl>
                            <Avatar mr="10" src={"https://github.com/".concat(this.state.github ? this.state.github : "github").concat(".png?size=200")} showBorder width="100px" height="100px"/>
                            {this.state.phone &&
                                <Button backgroundColor="green.500" color="whiteAlpha.900" mt={10} mr={3} size="sm" fontSize="2xl">
                                    <a target="_blank" rel="noopener noreferrer" href={"https://wa.me/".concat(this.state.phone.replace(/[^0-9]/g, ''))}><IoLogoWhatsapp /></a>
                                </Button>
                            }
                            {this.state.github &&
                                <Button backgroundColor="gray.900" color="whiteAlpha.900" mt={10} mr={3} size="sm" fontSize="2xl">
                                    <a target="_blank" rel="noopener noreferrer" href={"https://github.com/".concat(this.state.github)}><IoLogoGithub /></a>
                                </Button>
                            }

                            {this.state.linkedin &&
                                <Button backgroundColor="blue.500" color="whiteAlpha.900" mt={10} mr={3} size="sm" fontSize="2xl">
                                    <a target="_blank" rel="noopener noreferrer" href={"https://br.linkedin.com/in/".concat(this.state.linkedin)}><IoLogoLinkedin /></a>
                                </Button>
                            }
                        </FormControl>
                        <FormControl>
                            <FormLabel pt={10}>Name</FormLabel>
                            <Input type="text" name="name" placeholder="Name" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.name} />
                        </FormControl>    
                        <FormControl>
                            <FormLabel pt={10}>Phone</FormLabel>
                            <Input type="text" name="phone" placeholder="+99 (99) 9 9999-9999" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.phone} />
                        </FormControl>    
                        <FormControl>    
                            <FormLabel pt={10}>E-mail</FormLabel>
                            <Input type="email" name="email" placeholder="E-mail" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.email} />
                        </FormControl>    
                        <FormControl>    
                            <FormLabel pt={10}>GitHub</FormLabel>
                            <Input type="text" name="github" placeholder="Github User" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.github} />
                        </FormControl>    
                        <FormControl>    
                            <FormLabel pt={10}>LinkedIn</FormLabel>
                            <Input type="text" name="linkedin" placeholder="LinkedIn User" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.linkedin} />
                        </FormControl>    
                        <FormControl>
                            <FormLabel pt={10} display="flex">Skills</FormLabel>
                            {(this.state.mode === "INS" || this.state.mode === "UPD") &&
                                 <table style={{width: '100%'}}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Input type="text" name="skillname" placeholder="Name"  onChange={this.updateInput} value={this.state.skillname} />
                                            </td>  
                                            <td className="col-value"> 
                                                <Input type="number" name="skillvalue" placeholder="Value" onChange={this.updateInput} value={this.state.skillvalue} />
                                            </td>
                                            <td>   
                                                <Button display="inline" variantColor="green" onClick={this.addSkill}>+</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            }
                            <table className="table">
                                <tbody>
                                    {this.state.skills.map((s, index) =>
                                        <tr key={"div" + index}>
                                            <td key={index}>&nbsp;&nbsp;&nbsp;{s.name}</td>
                                            <td key={"v" + index}>({s.value}/5)</td>
                                            {(this.state.mode === "INS" || this.state.mode === "UPD") &&
                                                <td>
                                                    <Button key={"bt" + index} size="xs" variantColor="red" ml="5" onClick={e => this.deleteSkill(s)} >x</Button>
                                                </td>
                                            }
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </FormControl>    
                        <FormControl>
                            <FormLabel pt={10}>Wanna Work With</FormLabel>
                            {(this.state.mode === "INS" || this.state.mode === "UPD") &&
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Input type="text" name="wwwdesc" placeholder="Description" display="inline" onChange={this.updateInput} value={this.state.wwwdesc} />
                                            </td>
                                            <td>
                                                <Button display="inline" variantColor="green" onClick={this.addWww}>+</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            }
                            <table className="table">
                                <tbody>
                                    {this.state.www.map((w, index) =>
                                        <tr key={"div" + index}>
                                            <td key={index}>&nbsp;&nbsp;&nbsp;{w}</td>
                                            {(this.state.mode === "INS" || this.state.mode === "UPD") &&
                                                <td>
                                                    <Button key={"bt" + index} size="xs" variantColor="red" ml="5" onClick={e => this.deleteWww(w)} >x</Button>
                                                </td>
                                            }
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </FormControl>    
                        <FormControl>
                            <FormLabel pt={10}>Observation</FormLabel>
                            <Textarea type="text" resize="vertical" name="obs" placeholder="Observation" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.obs} />
                        </FormControl>    
                        <FormControl>
                            <Divider borderColor="blackAlpha.500" mt={10}/>

                            {this.state.mode === "INS" &&
                                <Button backgroundColor="messenger.500" color="whiteAlpha.900" mr="5" onClick={this.addMember} leftIcon="check">
                                    Save
                                </Button>
                            }

                            {this.state.mode === "UPD" &&
                                <Button backgroundColor="messenger.500" color="whiteAlpha.900" mr="5" onClick={this.updateMember} leftIcon="check">
                                    Save
                                </Button>
                            }

                            {this.state.mode === "UPD" &&
                                <Button backgroundColor="messenger.500" color="whiteAlpha.900" mr="5" onClick={() => this.setState({mode: 'DSP'})} leftIcon="close">
                                    Cancel
                                </Button>
                            }

                            {this.state.mode === "DSP" &&
                                <Button backgroundColor="green.500" color="whiteAlpha.900" mr="5" onClick={() => this.setState({mode: 'UPD'})} leftIcon="edit">
                                    Edit
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

