const questionnaire = require('../lib/fixtures/hard_coded/questionnaire');
const R = require('ramda');

const questions = questionnaire.questions;
const answers = questionnaire.answers;
const questionKeys = R.keys(questions);
const answerKeys = R.keys(answers);

const createPoFiles = () => {
  setupFRPoFile();
  setupARPoFile();
}

const combineENFRStrings = () => {
  const en = createENCollection();
  const fr = createFRCollection();
  const enFRStrings = en.map((enObj, i) =>({...enObj, ...enObj.msgstr = fr[i]}) );
  return enFRStrings;
}

const combineENARStrings = () => {
  const en = createENCollection();
  const ar = createARCollection();
  const enARStrings = en.map((enObj, i) =>({...enObj, ...enObj.msgstr = ar[i]}) );
  return enARStrings;
}

const createENCollection = () => {
  const enQuestionStrings = questionKeys.map(question => getLanguageStrings(questions,question, 'en'));
  const enAnswersStrings = answerKeys.map(answer => getLanguageStrings(answers, answer, 'en'));
  
  return R.concat(enQuestionStrings,enAnswersStrings);
}

const createFRCollection = () => {
  const frQuestionStrings = questionKeys.map(question => getLanguageStrings(questions,question, 'fr'));
  const frAnswersStrings = answerKeys.map(answer => getLanguageStrings(answers, answer, 'fr'));
  return R.concat(frQuestionStrings, frAnswersStrings);
}


const createARCollection = () => {
  const arQuestionStrings = questionKeys.map(question => getLanguageStrings(questions,question, 'ar'));
  const arAnswersStrings = answerKeys.map(answer => getLanguageStrings(answers, answer, 'ar'));
  return R.concat(arQuestionStrings, arAnswersStrings);
}

setupFRPoFile = () => {
  for(let i = 0; i < enFR.length; i++) {
    const { msgid, msgstr} = enFR[i];
    console.log(`msgid "${msgid}"`);
    console.log(`msgstr "${msgstr}"`);
    console.log('');
  }
}

setupARPoFile = () => {
  for(let i = 0; i < enAR.length; i++) {
    const { msgid, msgstr} = enAR[i];
    console.log(`msgid "${msgid}"`);
    console.log(`msgstr "${msgstr}"`);
    console.log('');
  }
}

const getLanguageStrings = (section, key, language) => { 
  const string = section[key].text;
  if(language !== 'en'){
    return {msgstr: string[language]};
  }
  return {msgid: string[language]};
}

const enFR = combineENFRStrings();
const enAR = combineENARStrings(); 

createPoFiles();