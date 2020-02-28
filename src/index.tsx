import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Member from './pages/member'
import MemberList from './pages/memberList'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import BrowserRouter from 'react-router-dom/BrowserRouter'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={MemberList} />
            <Route path="/member/:id" component={(props) => <Member {...props}/>} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
