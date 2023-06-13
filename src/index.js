import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { UserInfoProvider } from './context/UserInfoContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  </React.StrictMode>,
);
