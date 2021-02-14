import { createContext, useContext } from 'react'

type UserInfo = {
  uid: string,
  email: string,
  isSignedIn: boolean,
  isAdmin: boolean
}

type UserContextType ={ 
  userInfo: UserInfo,
  setUserInfo: (UserInfo: UserInfo) => void
}

export const UserContext = createContext<UserContextType>({ userInfo: {uid: '', email: '', isSignedIn: false, isAdmin: false}, setUserInfo: userInfo => console.warn('no theme provider')})

export const useUserContext = () => useContext(UserContext)