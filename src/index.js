import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
const GOOGLE_OAUTH_CLIENT_ID=process.env.REACT_APP_PUBLIC_GOOGLEOAUTH_CLIENT_ID

root.render(
  <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);