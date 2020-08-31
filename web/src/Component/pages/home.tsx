import React from 'react';
import { useAuth } from '../../Context/AuthContext';

export const Home: React.FC = () => {
  const {LogOut} = useAuth();

  return (
    <div>
      <div>
        <h2>Home Page</h2>
      </div>
      <div>
        <button onClick={() =>{ LogOut() }}>LogOut</button>
      </div>
    </div>
  );
}

