import { createContext, useContext } from 'react'

type UserInfo = {
  uid: string,
  email: string,
  isAdmin: boolean
}

type UserContextType ={ 
  userInfo: UserInfo,
  setUserInfo: (UserInfo: UserInfo) => void
}

export const UserContext = createContext<UserContextType>({ userInfo: {uid: '', email: '', isAdmin: false}, setUserInfo: userInfo => console.warn('no theme provider')})

export const useUserContext = () => useContext(UserContext)