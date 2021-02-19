import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import Firebase from '../config/firebase'

const PrivateRoute = ({children, ...props}) => {
  const { userInfo, setUserInfo } = useUserContext()
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true)
  const db = Firebase.firestore()

  useEffect(() => {
    if (userInfo.uid !== null && userInfo.uid.length > 0){
      setIsSignedIn(true)
    } else {
      if (localStorage.getItem('cttcid') !== null) {
        getUser(localStorage.getItem('cttcid'))
      } else {
        setIsSignedIn(false)
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUser = async (uid: string) => {
    const user = await db.collection("Members").doc(uid).get()
    if (user.exists){
      setUserInfo({
          uid: user.data().uid,
          email: user.data().email,
          isAdmin: user.data().role === "Admin" 
      })
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  }

  return (
      <Route {...props} render={() => {
          return isSignedIn ?
                  children
              :
                  <Redirect to='/login' />
      }} />
  )
}

export default PrivateRoute