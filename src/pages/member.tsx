import React, { useEffect, useState } from 'react'
import Firebase from '../config/firebase'
import { Link, Redirect } from 'react-router-dom'
import StarRating from 'star-rating-svg-react-hooks'
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
import { useUserContext } from '../context/UserContext'


enum Role { Developer, Consultant, Admin }
interface Skill { name: String, value: number }
const db = Firebase.firestore()
const roles: string[] = ["Developer", "Consultant", "Admin"]
let memberRef = undefined

const Member = (props) => {
    const { userInfo } = useUserContext()
    
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [github, setGithub] = useState("")
    const [linkedin, setLinkedIn] = useState("")
    const [site, setSite] = useState("")
    const [skills, setSkills] = useState([])
    const [www, setWww] = useState([])
    const [obs, setObs] = useState("")
    const [role, setRole] = useState(Role.Developer)
    const [skillname, setSkillName] = useState("")
    const [skillValue, setSkillValue] = useState(0)
    const [wwwDesc, setWwwDesc] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [id, setId] = useState(props.match.params.id)
    const [mode, setMode] = useState(props.match.params.id === "0" ? "INS" : "DSP")
    const [redirect, setRedirect] = useState(false)
        
    useEffect(() => {
        if(mode !== 'INS'){
            const load = async () => {
                memberRef = db.collection("Members").doc(id)
                loadMember()
            }
            load()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const addMember = () => {
        db.collection("Members").add({
            name: name,
            phone: phone,
            email: email,
            github: github,
            linkedin: linkedin,
            site: site,
            skills: skills,
            www: www,
            obs: obs,
            role: role
        }).then((docRef) => {
            setAlertMessage("Member inserted with success!",)
            setShowAlert(true,)
            setMode('DSP',)
            setId(docRef.id)
            window.scroll(0,0)
        }).then(() => setTimeout(() =>{
            setAlertMessage("")
            setShowAlert(false)
        }, 2000))

    }

    const updateMember = () => {
        db.collection("Members").doc(id).set({
            name: name,
            phone: phone,
            email: email,
            github: github,
            linkedin: linkedin,
            site: site,
            skills: skills,
            www: www,
            obs: obs,
            role: role
        }).then(() => {
            setAlertMessage("Member updated with success!")
            setShowAlert(true)
            setMode('DSP')
            window.scroll(0,0)
        }).then(() => setTimeout(() =>{
            setAlertMessage("")
            setShowAlert(false)
        }, 2000))
        
    }

    const addSkill = () => {
        let name: string = skillname
        let value: number = skillValue
        let skillAux: Skill = {name, value}
        let skillsAux: Skill[] = skills
        let update: boolean = false

        skillsAux.forEach(s => {
            if(s.name.trim() === skillname.trim()){
                s.value = skillValue
                update = true
            }
        })

        if (!update) skillsAux.push(skillAux)

        setSkills(skillsAux)
        setSkillName("")
        setSkillValue(0)
    }

    const deleteSkill = (s: Skill) => {
        let skillsAux: Skill[] = skills
        skillsAux = skillsAux.filter(sk => sk.name.trim() !== s.name.trim())
        setSkills(skillsAux)
    }

    const addWww = () => {
        setWww([...www, wwwDesc])
        setWwwDesc("")
    }

    const deleteWww = (w: string) => {
        let wwwAux: string[] = www
        wwwAux = wwwAux.filter(www => www.trim() !== w.trim())
        setWww(wwwAux)
    }

    const cleanMember = () => {
        setName("")
        setPhone("")
        setEmail("")
        setGithub("")
        setLinkedIn("")
        setSite("")
        setSkills([])
        setWww([])
        setObs("")
        setRole(Role.Developer)
        setSkillName("")
        setSkillValue(0)
        setWwwDesc("")
    }

    const loadMember = () => {
        memberRef.get().then((m: any) => {
            if(m.exists){
                setName(m.data().name ? m.data().name : name)
                setPhone(m.data().phone ? m.data().phone : phone)
                setEmail(m.data().email ? m.data().email : email)
                setGithub(m.data().github ? m.data().github : github)
                setLinkedIn(m.data().linkedin ? m.data().linkedin : linkedin)
                setSite(m.data().site ? m.data().site : site)
                setSkills(m.data().skills ? m.data().skills : skills)
                setWww(m.data().www ? m.data().www : www)
                setObs(m.data().obs ? m.data().obs : obs)
                setRole(m.data().role ? m.data().role : role)
            } else {
                setRedirect(true)
            }
        })
    }

    const cancelEdit = () => {
        cleanMember()
        loadMember()
        setMode("DSP")
    }

    return (
        <>
        {redirect &&
            <Redirect to='/404' />
        }
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Flex ml={10} mr={10} mt={10}>
                <Heading>Member</Heading>
                <div className="btn-dark-mode-toggle">
                    <DarkModeToggle />
                </div>
            </Flex>
            <Divider mt={10}/>
            {showAlert &&
                <Alert status="success" mb="10" mt="-5" display="flex" justifyContent="center" alignItems="center" variant="solid">
                    <AlertIcon />
                    {alertMessage}
                </Alert>
            }
            <Grid display="flex" justifyContent="center" alignItems="center" m={10}>
                <Box justifyContent="center" alignItems="center" width={['100%', "80%", "50%", "40%"]}>
                    <FormControl>
                        <Avatar mr={5} src={"https://github.com/".concat(github ? github : "github").concat(".png?size=200")} showBorder width="100px" height="100px"/>
                        {phone &&
                            <Button backgroundColor="green.500" color="whiteAlpha.900" mt={10} mr={1} size="sm" fontSize="2xl">
                                <a target="_blank" rel="noopener noreferrer" href={"https://wa.me/".concat(phone.replace(/[^0-9]/g, ''))}><IoLogoWhatsapp /></a>
                            </Button>
                        }
                        {github &&
                            <Button backgroundColor="gray.900" color="whiteAlpha.900" mt={10} mr={1} size="sm" fontSize="2xl">
                                <a target="_blank" rel="noopener noreferrer" href={"https://github.com/".concat(github)}><IoLogoGithub /></a>
                            </Button>
                        }

                        {linkedin &&
                            <Button backgroundColor="blue.500" color="whiteAlpha.900" mt={10} mr={1} size="sm" fontSize="2xl">
                                <a target="_blank" rel="noopener noreferrer" href={"https://br.linkedin.com/in/".concat(linkedin)}><IoLogoLinkedin /></a>
                            </Button>
                        }

                        {site &&
                            <Button backgroundColor="gray.900" color="whiteAlpha.900" mt={10} mr={1} size="sm" fontSize="2xl">
                                <a target="_blank" rel="noopener noreferrer" href={site}><IoIosGlobe /></a>
                            </Button>
                        }
                    </FormControl>
                    {(name || mode !== "DSP" ) &&
                        <FormControl>
                            <FormLabel pt={10}>Name</FormLabel>
                            <Input type="text" name="name" placeholder="Name" isReadOnly={mode === "DSP"} onChange={e => {setName(e.target.value)}} value={name} />
                        </FormControl> 
                    }
                    {(phone || mode !== "DSP" ) &&
                        <FormControl>
                            <FormLabel pt={10}>Phone</FormLabel>
                            <Input type="text" name="phone" placeholder="+99 (99) 9 9999-9999" isReadOnly={mode === "DSP"} onChange={e => {setPhone(e.target.value)}} value={phone} />
                        </FormControl>   
                    } 
                    {(email || mode !== "DSP" ) &&
                        <FormControl>    
                            <FormLabel pt={10}>E-mail</FormLabel>
                            <Input type="email" name="email" placeholder="E-mail" isReadOnly={mode === "DSP"} onChange={e => { setEmail(e.target.value) }} value={email} />
                        </FormControl>
                    }    
                    {(github || mode !== "DSP" ) &&
                        <FormControl>    
                            <FormLabel pt={10}>GitHub</FormLabel>
                            <Input type="text" name="github" placeholder="Github User" isReadOnly={mode === "DSP"} onChange={e => {setGithub(e.target.value)}} value={github} />
                        </FormControl>
                    }    
                    {(linkedin || mode !== "DSP" ) &&
                        <FormControl>    
                            <FormLabel pt={10}>LinkedIn</FormLabel>
                            <Input type="text" name="linkedin" display="flex" placeholder="LinkedIn User" isReadOnly={mode === "DSP"} onChange={e => {setLinkedIn(e.target.value)}} value={linkedin} />
                        </FormControl>
                    }  
                    {(site || mode !== "DSP" ) &&
                        <FormControl>    
                            <FormLabel pt={10}>Personal Site</FormLabel>
                            <Input type="text" name="site" display="flex" placeholder="https://personalsite.com" isReadOnly={mode === "DSP"} onChange={e => {setSite(e.target.value)}} value={site} />
                        </FormControl>
                    }   
                    {(skills.length > 0 || mode !== "DSP" ) &&
                        <FormControl>
                            <FormLabel pt={10} display="flex">Skills</FormLabel>
                            {(mode === "INS" || mode === "UPD") &&
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Input type="text" name="skillname" placeholder="Name"  onChange={e => { setSkillName(e.target.value) }} value={skillname} />
                                            </td>  
                                            <td className="col-value starRating"> 
                                                <StarRating name="skill" noOfStars={5} selectedRating={skillValue} setSelectedRating={setSkillValue} starFillColor = {'yellow'}
                                                    starEmptyColor = {'white'} starBorderColor = {'gray'} starSpacing = {'5px'} isReadOnly = {false} width = {"30"} height = {"30"}
                                                />
                                            </td>
                                            <td>   
                                                <Button display="inline" variantColor="green" onClick={() => { addSkill() }}>+</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            }
                            <table >
                                <tbody>
                                    {skills.map((s, index) =>
                                        <tr key={"div" + index}>
                                            <td key={"v" + index} className="starRating">
                                                <StarRating name={"s" + index} noOfStars={5} selectedRating={s.value} starFillColor = {'yellow'}
                                                    starEmptyColor = {'white'} starBorderColor = {'gray'} starSpacing = {'5px'} isReadOnly = {true} width = {"30"} height = {"30"}
                                                />
                                            </td>
                                            <td key={index}>&nbsp;&nbsp;&nbsp;{s.name}</td>
                                            {(mode === "INS" || mode === "UPD") &&
                                                <td>
                                                    <Button key={"bt" + index} size="xs" variantColor="red" ml="5" onClick={e => { deleteSkill(s) }} >x</Button>
                                                </td>
                                            }
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </FormControl>
                    }    
                    {(www.length > 0 || mode !== "DSP" ) &&
                        <FormControl>
                            <FormLabel pt={10}>Wanna Work With</FormLabel>
                            {(mode === "INS" || mode === "UPD") &&
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Input type="text" name="wwwdesc" placeholder="Description" display="inline" onChange={e => { setWwwDesc(e.target.value) }} value={wwwDesc} />
                                            </td>
                                            <td>
                                                <Button display="inline" variantColor="green" onClick={() => { addWww() }}>+</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            }
                            <table className="table">
                                <tbody>
                                    {www.map((w, index) =>
                                        <tr key={"div" + index}>
                                            <td key={index}>&nbsp;&nbsp;&nbsp;{w}</td>
                                            {(mode === "INS" || mode === "UPD") &&
                                                <td>
                                                    <Button key={"bt" + index} size="xs" variantColor="red" ml="5" mt="5" onClick={e => { deleteWww(w) }} >x</Button>
                                                </td>
                                            }
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </FormControl>
                    }  
                    {(obs || mode !== "DSP" ) &&
                        <FormControl>
                            <FormLabel pt={10}>Observation</FormLabel>
                            <Textarea type="text" resize="vertical" name="obs" placeholder="Observation" isReadOnly={mode === "DSP"} onChange={e => { setObs(e.target.value) }} value={obs} />
                        </FormControl>
                    }   
                    {userInfo.isAdmin && 
                        <FormControl>
                            <FormLabel pt={10}>Role</FormLabel>
                            <Select name="role" isDisabled={mode === "DSP"} onChange={e => { setRole(Role[e.target.value]) }} value={role}>
                                {roles.map((r, index) => 
                                    <option key={index} value={index}>{r}</option>
                                )}
                            </Select>
                        </FormControl>  
                    }
                    <FormControl className="group-button" mb={10}>
                        <Divider mt={10} mb={10} />

                        {mode === "INS" &&
                            <Button type="submit" backgroundColor="green.500" color="whiteAlpha.900" mr="5" onClick={() => { addMember() }} leftIcon="check">
                                Save
                            </Button>
                        }

                        {mode === "UPD" &&
                            <Button type="submit" backgroundColor="green.500" color="whiteAlpha.900" mr="5" onClick={() => { updateMember() }} leftIcon="check">
                                Save
                            </Button>
                        }

                        {mode === "UPD" &&
                            <Button backgroundColor="messenger.500" color="whiteAlpha.900" mr="5" onClick={() => { cancelEdit() }} leftIcon="close">
                                Cancel
                            </Button>
                        }

                        {mode === "DSP" && (userInfo.email === email || userInfo.isAdmin) &&
                            <Button backgroundColor="green.500" color="whiteAlpha.900" mr="5" onClick={() => { setMode('UPD')}} leftIcon="edit">
                                Edit
                            </Button>
                        }
                        <Button backgroundColor="gray.500" color="whiteAlpha.900" leftIcon="arrow-back"><Link to="/">Back</Link></Button>
                    </FormControl>
                </Box>
            </Grid>
        </ThemeProvider>
        </>
    )

}

export default Member

