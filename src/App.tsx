import React, { useState } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { IoMdHeart, IoLogoGithub } from 'react-icons/io'
import { UserContext } from './context/UserContext'
import PrivateRoute from './router/privateRouter'

import './css/main.css'
import Login from './pages/login'
import NotFound from './pages/notFound'
import Member from './pages/member'
import MemberList from './pages/memberList'

const App = () => {
  const [userInfo, setUserInfo] = useState({ uid: '', email: '', isAdmin: false })

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <BrowserRouter>
          <div className="content">
              <Switch>
                  <PrivateRoute exact path="/">
                    <MemberList />
                  </PrivateRoute>
                  <PrivateRoute path="/member/:id" >
                    <Route path="/member/:id" component={(props) => <Member {...props}/>} />
                  </PrivateRoute>
                  <Route path="/login" component={Login} />
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
