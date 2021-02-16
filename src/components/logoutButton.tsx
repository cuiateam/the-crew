import React from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { 
    Button
} from '@chakra-ui/core'

import Firebase from '../config/firebase'

function LogoutButton () {
  const history = useHistory()

  const logout = () => {
    localStorage.removeItem('cttcid')
    Firebase.auth().signOut().then(() => {
      history.push("/login")
    }).catch(error => {
      console.log(error)
    })
    history.push("/login")
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
