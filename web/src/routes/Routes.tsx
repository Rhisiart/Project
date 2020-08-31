import React from 'react';
import {BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";
import {Home} from "../Component/pages/home";
import {Login} from "../Component/pages/login";
import {Register} from "../Component/pages/register";
import {UserInfo} from "../Component/pages/UserInfo";
import { useAuth } from '../Context/AuthContext';

const AppRoutes : React.FC = () => {
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
          <ul>
            <li>
              <Link to="/user">User Info</Link>
            </li>
          </ul>
        </nav> 
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signin" component={Register}/>
            <Route exact path="/user" component={UserInfo}/>
          </Switch>
      </div>
    </Router>
    );
}

const AuthRoutes : React.FC = () => {
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
              <Link to="/user">User info</Link>
            </li>
          </ul>
        </nav> 
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/user" component={UserInfo}/>
          </Switch>
      </div>
    </Router>
    );
}

export default function Routes() {
  const { isLog } = useAuth();

  return isLog ? <AuthRoutes/> : <AppRoutes/>;
}
