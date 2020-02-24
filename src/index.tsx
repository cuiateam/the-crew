import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Member from './pages/member'
import MemberList from './pages/memberList'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// ReactDOM.render(<Member mode="UPD" id="J5c6UIcyBO2T2bylT0ev"/>, document.getElementById('root'));
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={MemberList} />
            <Route path="/member/:id/:mode" component={(props) => <Member {...props}/>} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
