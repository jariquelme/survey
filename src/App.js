import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';

import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { surveyJson } from "./surveyJson"
import { GoogleSpreadsheet } from 'google-spreadsheet';

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

  const alertResults = useCallback((sender) => {
    const results = sender.data;
    results['createdAt']= new Date().toUTCString();

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    appendSpreadsheet(doc,results);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default App;
