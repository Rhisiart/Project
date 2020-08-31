import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { IUser } from '../../Models/user';

export const Login : React.FC = () =>
{
  const [email,setEmail] = useState<any>();
  const [password,setPassword] = useState<any>();
  const {LogIn} = useAuth();

  async function handleLogin(e : React.FormEvent<HTMLFormElement>) {
      e.preventDefault(); //dont refresh page
      
      const user : IUser = {
        email:email,
        password:password
      }

      await LogIn(user);
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
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