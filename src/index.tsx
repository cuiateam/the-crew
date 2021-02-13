import './css/main.css'
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Login from './pages/login'
import NotFound from './pages/notFound'
import Member from './pages/member'
import MemberList from './pages/memberList'
import { Route, Switch, BrowserRouter }from 'react-router-dom'
import { IoMdHeart, IoLogoGithub } from 'react-icons/io'

ReactDOM.render(
    <BrowserRouter>
        <div className="content">
            <Switch>
                <Route path="/" exact={true} component={MemberList} />
                <Route path="/login" component={Login} />
                <Route path="/member/:id" component={(props) => <Member {...props}/>} />
                <Route path="*" component={NotFound} />
            </Switch>
        </div>
        <div className="footer">
            Fork me on <a href="https://github.com/cuiateam/the-crew" target="blank" ><IoLogoGithub />.</a><br /> 
            Made with <IoMdHeart color="#ff5555" /> by <a href="https://cuiateam.github.io/site/" target="blank">Cuia Team.</a>
        </div>
    </ BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
