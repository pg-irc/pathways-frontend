const questionnaire = require('../lib/fixtures/hard_coded/questionnaire');
const R = require('ramda');

const questions = questionnaire.questions;
const answers = questionnaire.answers;
const questionKeys = R.keys(questions);
const answerKeys = R.keys(answers);

const createPoFile = () => {
  const combinedLanguageStrings = combineTwoLanguageCollections('zh_TW');
  setupPoFile(combinedLanguageStrings);
}

const combineTwoLanguageCollections = (language_code) => {
  const en = createLanguageCollection('en');
  const translation_language = createLanguageCollection(language_code);
  const combinedStrings = en.map((enObj, i) =>({...enObj, ...enObj.msgstr = translation_language[i]}) );
  return combinedStrings;
}

createLanguageCollection = (language_code) => {
  const questionStrings = questionKeys.map(question => getLanguageStrings(questions,question, language_code));
  const answersStrings = answerKeys.map(answer => getLanguageStrings(answers, answer, language_code));
  return R.concat(questionStrings, answersStrings);
}

setupPoFile = (combinedLanguageStrings) => {
  for(let i = 0; i < combinedLanguageStrings.length; i++) {
    const { msgid, msgstr} = combinedLanguageStrings[i];
    console.log(`msgid "${msgid}"`);
    console.log(`msgstr "${msgstr}"`);
    console.log('');
  }
}

const getLanguageStrings = (section, key, language_code) => { 
  const string = section[key].text;
  if(language_code !== 'en'){
    return {msgstr: string[language_code]};
  }
  return {msgid: string[language_code]};
}

createPoFile();