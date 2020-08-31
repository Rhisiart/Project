import React, { useState } from 'react';
import { IPerson } from "../../Models/user";
import {RegisterQuery} from "../../Api/Queries";

export const Register: React.FC = () => {
  const [email,setEmail] = useState<string>();
  const [password,setPassword] = useState<string>();
  const [firstname,setFirstName] = useState<string>();
  const [lastname,setlastName] = useState<string>();

  const person : IPerson = {
    firstname : firstname!,
    lastname: lastname!,
    email:email!,
    password: password!,
  } 

  async function handleSignIn(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const response = await RegisterQuery(person);
    alert(response?.status);
  }

  return (
    <form onSubmit={handleSignIn}>
      <div>
        <h2>Register</h2>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstname} placeholder="First Name" onChange={(e)=> setFirstName(e.target.value)}/>
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastname} placeholder="Last Name" onChange={(e)=> setlastName(e.target.value)}/>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} placeholder="exemple@email.com" onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} placeholder="password" onChange={(e) => { setPassword(e.target.value)}}/>
        </div>
          <button type="submit">Login</button>
        </div>
    </form>
  );
}