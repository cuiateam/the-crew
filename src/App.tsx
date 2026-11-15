import React, { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
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
              <Routes>
                  <PrivateRoute path="/" element={<MemberList />} />
                  <PrivateRoute path="/member/:id" element={<Member />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </div>
          <div className="footer">
              <hr />
              Fork me on <a href="https://github.com/cuiateam/the-crew" target="blank" ><IoLogoGithub />.</a><br />
              Made with <IoMdHeart /> by <a href="https://cuiateam.github.io/site/" target="blank">Cuia Team.</a>
          </div>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
