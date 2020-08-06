import React from 'react';
import {loginQuery} from "../../Api/Queries"

export interface Props
{
  email: String;
  password: String;
}

export class Login extends React.Component<Props,Props>
{
  constructor(props:Props){
    super(props)
    this.state = props;
  }

  handleChangeEmail = (event : React.ChangeEvent<HTMLInputElement>) =>{
     this.setState({email: event.target.value});
  }

  handleChangePassword = (event : React.ChangeEvent<HTMLInputElement>) =>{
    this.setState({password: event.target.value});
 }

  render(){
    return (
      <form onSubmit={ async event => {
        event.preventDefault(); //dont refresh page
        console.log("form submit");
        const response = await loginQuery(this.state);
        console.log(response?.data);
      }}>
        <div>
          <h2>Login</h2>
          <div>
            <label>Email:</label>
            <input type="email" placeholder="exemple@email.com" onChange={this.handleChangeEmail}/>
            <label>Password:</label>
            <input type="password" placeholder="password" onChange={this.handleChangePassword}/>
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    );
  }
}
