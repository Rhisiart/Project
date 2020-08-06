import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";
import {Home} from "./Component/pages/home";
import {Login} from "./Component/pages/login";
import {Register} from "./Component/pages/register";


export default function Routes() { 
  return (
  <Router>
    <div>
      <nav>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signin" component={Register}/>
      </Switch> 
    </div>
  </Router>
  );
}
