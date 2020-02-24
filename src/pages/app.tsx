import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from 'react-router-dom'
import Member from './member'
import MemberList from './memberList'

  export default function App() {
    return (
      <Router>
        <div>
          <MemberList />
  
          <Switch>
            <Route path="/member/:id" children={<Member />} />
          </Switch>
        </div>
      </Router>
    );
  }