import React from 'react'
import Firebase from '../config/firebase'
import { Link, Redirect } from 'react-router-dom'
import StarRating from '../components/starRating'
import { IoLogoLinkedin, IoLogoGithub, IoLogoWhatsapp, IoIosGlobe } from 'react-icons/io'
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
    Textarea, 
    Select
} from '@chakra-ui/core'
import DarkModeToggle from '../components/darkModeToggle'


enum Role { Developer, Consultant, Admin }
interface Skill { name: String, value: number }
interface Props { mode?: string, id?: string }
interface State { name?: string, phone?: string, phoneaux?: string, email?: string, github?: string, linkedin?: string, site?: string, skills?: Skill[], www?: string[], obs?: string, role?: Role, skillname?: string, skillvalue?: number, wwwdesc?: string, alertMessage?: string, showAlert?: boolean, id?: string, mode?: string, redirect?: boolean}
const db = Firebase.firestore()
const roles: string[] = ["Developer", "Consultant", "Admin"]
let memberRef = undefined

class Member extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        let propsAux: any = this.props
        this.onStarClick = this.onStarClick.bind(this)

        this.state = {
            name: "",
            phone: "",
            phoneaux: "",
            email: "",
            github: "",
            linkedin: "",
            site: "",
            skills: [],
            www: [],
            obs: "",
            role: Role.Developer,
            skillname: "",
            skillvalue: 0,
            wwwdesc: "",
            alertMessage: "",
            showAlert: false,
            id: propsAux.match.params.id,
            mode: propsAux.match.params.id === "0" ? "INS" : "DSP",
            redirect: false
        }
        if(this.state.mode !== "INS"){
            memberRef = db.collection("Members").doc(this.state.id)
            this.loadMember()
        }
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
            site: this.state.site,
            skills: this.state.skills,
            www: this.state.www,
            obs: this.state.obs,
            role: this.state.role
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
            site: this.state.site,
            skills: this.state.skills,
            www: this.state.www,
            obs: this.state.obs,
            role: this.state.role
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
        let update: boolean = false

        skillsAux.forEach(s => {
            if(s.name.trim() === this.state.skillname.trim()){
                s.value = this.state.skillvalue
                update = true
            }
        })

        if (!update)
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

    cleanMember = () => {
        this.setState({
            name: "",
            phone: "",
            phoneaux: "",
            email: "",
            github: "",
            linkedin: "",
            site: "",
            skills: [],
            www: [],
            obs: "",
            role: Role.Developer,
            skillname: "",
            skillvalue: 0,
            wwwdesc: "",
        })
    }

    loadMember = () => {
        memberRef.get().then((m: any) => {
            if(m.exists){
                this.setState({
                    name: (m.data().name ? m.data().name : this.state.name),
                    phone: (m.data().phone ? m.data().phone : this.state.phone),
                    phoneaux: this.state.phone.replace("[^0-9.]", ""),
                    email: (m.data().email ? m.data().email : this.state.email),
                    github: (m.data().github ? m.data().github : this.state.github),
                    linkedin: (m.data().linkedin ? m.data().linkedin : this.state.linkedin),
                    site: (m.data().site ? m.data().site : this.state.site),
                    skills: (m.data().skills ? m.data().skills : this.state.skills),
                    www: (m.data().www ? m.data().www : this.state.www),
                    obs: (m.data().obs ? m.data().obs : this.state.obs),
                    role: (m.data().role ? m.data().role : this.state.role)
                })
            } else {
                this.setState({redirect: true})
            }
        })
    }

    cancelEdit = () => {
        this.cleanMember()
        this.loadMember()
        this.setState({mode: "DSP"})
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({skillvalue: nextValue});
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/404' />
        }
        return (
            <ThemeProvider theme={theme}>
                <CSSReset />
                <Flex ml={10} mr={10} mt={10}>
                    <Heading>Member</Heading>
                    <div className="btn-dark-mode-toggle">
                        <DarkModeToggle />
                    </div>
                </Flex>
                <Divider mt={10}/>
                {this.state.showAlert &&
                    <Alert status="success" mb="10" mt="-5" display="flex" justifyContent="center" alignItems="center">
                        <AlertIcon />
                        {this.state.alertMessage}
                    </Alert>
                }
                <Grid display="flex" justifyContent="center" alignItems="center" m={10}>
                    <Box justifyContent="center" alignItems="center" width={['100%', "80%", "50%", "40%"]}>
                        <FormControl>
                            <Avatar mr={5} src={"https://github.com/".concat(this.state.github ? this.state.github : "github").concat(".png?size=200")} showBorder width="100px" height="100px"/>
                            {this.state.phone &&
                                <Button backgroundColor="green.500" color="whiteAlpha.900" mt={10} mr={1} size="sm" fontSize="2xl">
                                    <a target="_blank" rel="noopener noreferrer" href={"https://wa.me/".concat(this.state.phone.replace(/[^0-9]/g, ''))}><IoLogoWhatsapp /></a>
                                </Button>
                            }
                            {this.state.github &&
                                <Button backgroundColor="gray.900" color="whiteAlpha.900" mt={10} mr={1} size="sm" fontSize="2xl">
                                    <a target="_blank" rel="noopener noreferrer" href={"https://github.com/".concat(this.state.github)}><IoLogoGithub /></a>
                                </Button>
                            }

                            {this.state.linkedin &&
                                <Button backgroundColor="blue.500" color="whiteAlpha.900" mt={10} mr={1} size="sm" fontSize="2xl">
                                    <a target="_blank" rel="noopener noreferrer" href={"https://br.linkedin.com/in/".concat(this.state.linkedin)}><IoLogoLinkedin /></a>
                                </Button>
                            }

                            {this.state.site &&
                                <Button backgroundColor="gray.900" color="whiteAlpha.900" mt={10} mr={1} size="sm" fontSize="2xl">
                                    <a target="_blank" rel="noopener noreferrer" href={this.state.site}><IoIosGlobe /></a>
                                </Button>
                            }
                        </FormControl>
                        {(this.state.name || this.state.mode !== "DSP" ) &&
                            <FormControl>
                                <FormLabel pt={10}>Name</FormLabel>
                                <Input type="text" name="name" placeholder="Name" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.name} />
                            </FormControl> 
                        }
                        {(this.state.phone || this.state.mode !== "DSP" ) &&
                            <FormControl>
                                <FormLabel pt={10}>Phone</FormLabel>
                                <Input type="text" name="phone" placeholder="+99 (99) 9 9999-9999" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.phone} />
                            </FormControl>   
                        } 
                        {(this.state.email || this.state.mode !== "DSP" ) &&
                            <FormControl>    
                                <FormLabel pt={10}>E-mail</FormLabel>
                                <Input type="email" name="email" placeholder="E-mail" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.email} />
                            </FormControl>
                        }    
                        {(this.state.github || this.state.mode !== "DSP" ) &&
                            <FormControl>    
                                <FormLabel pt={10}>GitHub</FormLabel>
                                <Input type="text" name="github" placeholder="Github User" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.github} />
                            </FormControl>
                        }    
                        {(this.state.linkedin || this.state.mode !== "DSP" ) &&
                            <FormControl>    
                                <FormLabel pt={10}>LinkedIn</FormLabel>
                                <Input type="text" name="linkedin" display="flex" placeholder="LinkedIn User" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.linkedin} />
                            </FormControl>
                        }  
                        {(this.state.site || this.state.mode !== "DSP" ) &&
                            <FormControl>    
                                <FormLabel pt={10}>Personal Site</FormLabel>
                                <Input type="text" name="site" display="flex" placeholder="https://personalsite.com" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.site} />
                            </FormControl>
                        }   
                        {(this.state.skills.length > 0 || this.state.mode !== "DSP" ) &&
                            <FormControl>
                                <FormLabel pt={10} display="flex">Skills</FormLabel>
                                {(this.state.mode === "INS" || this.state.mode === "UPD") &&
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Input type="text" name="skillname" placeholder="Name"  onChange={this.updateInput} value={this.state.skillname} />
                                                </td>  
                                                <td className="col-value"> 
                                                    <StarRating name="skill" emptyStarColor="gray" value={this.state.skillvalue} editing={true} onStarClick={this.onStarClick} />
                                                </td>
                                                <td>   
                                                    <Button display="inline" variantColor="green" onClick={this.addSkill}>+</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                }
                                <table >
                                    <tbody>
                                        {this.state.skills.map((s, index) =>
                                            <tr key={"div" + index}>
                                                <td key={"v" + index}>
                                                    <StarRating name={"s" + index} emptyStarColor="gray" value={s.value} editing={this.state.mode !== "DSP"}/>
                                                </td>
                                                <td key={index}>&nbsp;&nbsp;&nbsp;{s.name}</td>
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
                        }    
                        {(this.state.www.length > 0 || this.state.mode !== "DSP" ) &&
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
                                                        <Button key={"bt" + index} size="xs" variantColor="red" ml="5" mt="5" onClick={e => this.deleteWww(w)} >x</Button>
                                                    </td>
                                                }
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </FormControl>
                        }  
                        {(this.state.obs || this.state.mode !== "DSP" ) &&
                            <FormControl>
                                <FormLabel pt={10}>Observation</FormLabel>
                                <Textarea type="text" resize="vertical" name="obs" placeholder="Observation" isReadOnly={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.obs} />
                            </FormControl>
                        }   
                        <FormControl>
                            <FormLabel pt={10}>Role</FormLabel>
                            <Select name="role" isDisabled={this.state.mode === "DSP"} onChange={this.updateInput} value={this.state.role}>
                                {roles.map((r, index) => 
                                    <option key={index} value={index}>{r}</option>
                                )}
                            </Select>
                        </FormControl>  
                        <FormControl className="group-button" mb={10}>
                            <Divider mt={10} mb={10} />

                            {this.state.mode === "INS" &&
                                <Button type="submit" backgroundColor="green.500" color="whiteAlpha.900" mr="5" onClick={this.addMember} leftIcon="check">
                                    Save
                                </Button>
                            }

                            {this.state.mode === "UPD" &&
                                <Button type="submit" backgroundColor="green.500" color="whiteAlpha.900" mr="5" onClick={this.updateMember} leftIcon="check">
                                    Save
                                </Button>
                            }

                            {this.state.mode === "UPD" &&
                                <Button backgroundColor="messenger.500" color="whiteAlpha.900" mr="5" onClick={this.cancelEdit} leftIcon="close">
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

