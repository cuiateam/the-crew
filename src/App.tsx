import './css/main.css'
import React, { useState } from 'react';
import Login from './pages/login'
import NotFound from './pages/notFound'
import Member from './pages/member'
import MemberList from './pages/memberList'
import { Route, Switch, BrowserRouter }from 'react-router-dom'
import { IoMdHeart, IoLogoGithub } from 'react-icons/io'
import { UserContext } from './context/UserContext'

const App = () => {
  
  const [userInfo, setUserInfo] = useState({ uid: '', email: '', isSignedIn: false, isAdmin: false })
  
  return(
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <BrowserRouter>
          <div className="content">
              <Switch>
                  {userInfo.isSignedIn && 
                    <>
                      <Route path="/" exact={true} component={MemberList} />
                      <Route path="/member/:id" component={(props) => <Member {...props}/>} />
                    </>
                  }
                  <Route path={["/", "/login", "/member/:id"]} component={Login} />
                  <Route path="*" component={NotFound} />
              </Switch>
          </div>
          <div className="footer">
              <hr />
              Fork me on <a href="https://github.com/cuiateam/the-crew" target="blank" ><IoLogoGithub />.</a><br /> 
              Made with <IoMdHeart /> by <a href="https://cuiateam.github.io/site/" target="blank">Cuia Team.</a>
          </div>
      </ BrowserRouter>
    </UserContext.Provider>
  )
}

export default App