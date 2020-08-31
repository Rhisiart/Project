import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';
import { AuthProvider } from './Context/AuthContext';


ReactDOM.render(
  <AuthProvider>
    <Routes />
  </AuthProvider>,
  document.getElementById('root')
);