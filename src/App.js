import './app.css';
import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';

import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { surveyJson } from "./surveyJson"
import { GoogleSpreadsheet } from 'google-spreadsheet';

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const SPREADSHEET_ID = process.env.REACT_APP_PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY = process.env.REACT_APP_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n') // process.env.PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const appendSpreadsheet = async (doc, row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    await sheet.addRow(row);
  } catch (e) {
    console.error('Error: ', e);
  }
};
function App() {
  const survey = new Model(surveyJson);
  const [ user, setUser ] = useState(null);
  const [ profile, setProfile ] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
};

  const alertResults = useCallback((sender) => {
    const results = sender.data;
    results['createdAt']= new Date().toUTCString();

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    appendSpreadsheet(doc,results);
  }, []);

  useEffect(
    () => {
      console.log("entro", user)
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
              setProfile(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    [ user ]
);
  survey.onComplete.add(alertResults);

  return (
    <div>
        {profile ? (
            <div>
              <img src={profile.picture} />
              <br />
              <br />
              <button onClick={logOut}>Log out</button>
              <Survey model={survey} />
            </div>
        ) : (
            <button className="login-with-google-btn" onClick={() => login()}>Sign in with Google 🚀 </button>
        )}
    </div>
);
  return <Survey model={survey} />;
}

export default App;
