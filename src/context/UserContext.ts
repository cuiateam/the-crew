import { createContext, useContext } from 'react'

type UserInfo = {
  uid: string,
  email: string,
  signedIn: boolean
}

type UserContextType ={ 
  userInfo: UserInfo,
  setUserInfo: (UserInfo: UserInfo) => void
}

export const UserContext = createContext<UserContextType>({ userInfo: {uid: '', email: '', signedIn: false}, setUserInfo: userInfo => console.warn('no theme provider')})

export const useUserContext = () => useContext(UserContext)