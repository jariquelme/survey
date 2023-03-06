import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';

import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { surveyJson } from "./surveyJson"

function App() {
  const survey = new Model(surveyJson);

  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    console.log(results);
    alert(results);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default App;
