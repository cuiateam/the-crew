import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { 
    Button
} from '@chakra-ui/react'

import Firebase from '../config/firebase'

function LogoutButton () {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('cttcid')
    Firebase.auth().signOut().catch(error => {console.log(error.message)})
    navigate("/login")
  }

  return (
      <div>
        <Button className="btn-light-mode" variant="ghost" onClick={() => { logout() }}>
            <AiOutlineLogout size="30px" color="red" />
        </Button>
      </div>
  )
}

export default LogoutButton
