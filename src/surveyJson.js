export const surveyJson = {
  "title": "Workday evaluation",
  "logo": "https://dkckbwr4t7ug6.cloudfront.net/assets/application/shared/meta_data/default_og_image-2383bf42e9b1c5a9d4e2b3f7ed8a90a70db9e39844273f9839dfdd0549be9647.png",
  "logoPosition": "right",
  "pages": [
   {
    "name": "page3",
    "elements": [
     {
      "type": "text",
      "name": "whichDayDoYouWantToEvaluate",
      "title": "Which day do you want to evaluate?",
      "isRequired": true,
      "inputType": "date"
     }
    ],
    "title": "Day to evaluate"
   },
   {
    "name": "aboutYou",
    "elements": [
     {
      "type": "dropdown",
      "name": "TeamSelection",
      "title": "What is your Team?",
      "isRequired": true,
      "choices": [
       {
        "value": "blue",
        "text": "Blue"
       },
       {
        "value": "green",
        "text": "Green"
       },
       {
        "value": "orange",
        "text": "Orange"
       },
       {
        "value": "purple",
        "text": "Purple"
       },
       {
        "value": "yellow",
        "text": "Yellow"
       }
      ]
     },
     {
      "type": "boolean",
      "name": "anonymousSurvey",
      "title": "Do you want to send the survey anonymously?",
      "isRequired": true
     },
     {
      "type": "dropdown",
      "name": "TeamOrangeMembers",
      "visibleIf": "({TeamSelection} = 'orange') and ({anonymousSurvey} = false)",
      "title": "Who are you?",
      "isRequired": true,
      "choices": [
       {
        "value": "Item 1",
        "text": "A.C."
       },
       {
        "value": "Item 2",
        "text": "B.H."
       },
       {
        "value": "Item 3",
        "text": "F.C."
       },
       {
        "value": "Item 4",
        "text": "J.L."
       },
       {
        "value": "Item 5",
        "text": "M.L."
       }
      ]
     },
     {
      "type": "text",
      "name": "whatIsYourAlias",
      "visibleIf": "{anonymousSurvey} = true",
      "title": "What is your alias?",
      "isRequired": true
     }
    ],
    "title": "About you"
   },
   {
    "name": "page2",
    "elements": [
     {
      "type": "boolean",
      "name": "DidYouWorkWithOtherPeople",
      "title": "Did you work with other people?",
      "isRequired": true
     },
     {
      "type": "boolean",
      "name": "didYouHelpOtherPeople",
      "title": "Did you help other people?"
     },
     {
      "type": "boolean",
      "name": "wasYourWorkInterrupted",
      "title": "Was your work interrupted?",
      "isRequired": true
     },
     {
      "type": "text",
      "name": "canYouGiveMoreInformation",
      "visibleIf": "{wasYourWorkInterrupted} = true",
      "title": "Can you give more information?"
     },
     {
      "type": "boolean",
      "name": "didYouMakeProgressTowardYourGoals",
      "title": "Did you make progress toward your goals?",
      "isRequired": true
     }
    ],
    "title": "Workday"
   },
   {
    "name": "page1",
    "elements": [
     {
      "type": "rating",
      "name": "howWasYourWorkDay",
      "title": "How was your work day?",
      "rateMax": 10
     }
    ],
    "title": "Evaluation"
   }
  ]
 }