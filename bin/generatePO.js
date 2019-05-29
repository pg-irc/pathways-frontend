const questionnaire = require('../lib/fixtures/hard_coded/questionnaire');
const R = require('ramda');
const questions = questionnaire.questions;
const answers = questionnaire.answers;
const questionKeys = R.keys(questions);
const answerKeys = R.keys(answers);


const createPoFile = () => {
  const combinedLanguageStrings = orderCollectionsByQuestionAnswers('zh_TW');
  setupPoFile(combinedLanguageStrings);
}

const orderCollectionsByQuestionAnswers = (language_code) => {
  const unordered_collection = combineTwoLanguageCollections(language_code)
  const ordered = []
  for(let i = 0; i < questionKeys.length; i++) {
    for(let j = 0; j < unordered_collection.length; j++) {
      if(questionKeys[i] === unordered_collection[j].id || questionKeys[i] === unordered_collection[j].questionId){
        ordered.push(unordered_collection[j]);
      }
    }
  }
  return ordered
}

const combineTwoLanguageCollections = (language_code) => {
  const en = createLanguageCollection('en');
  const translation_language = createLanguageCollection(language_code);

  const combinedStrings = en.map((enObj, i) =>({...enObj, ...enObj.msgstr = translation_language[i]}) );
  return combinedStrings;
}

const createLanguageCollection = (language_code) => {
  const questionStrings = questionKeys.map(question => getLanguageStrings(questions,question, language_code));
  const answersStrings = answerKeys.map(answer => getLanguageStrings(answers, answer, language_code));
  return R.concat(questionStrings, answersStrings);
}

const setupPoFile = (combinedLanguageStrings) => {
  for(let i = 0; i < combinedLanguageStrings.length; i++) {
    const { msgid, msgstr} = combinedLanguageStrings[i];
    console.log(`msgid "${msgid}"`);
    console.log(`msgstr "${msgstr}"`);
    console.log('');
  }
}

const getLanguageStrings = (section, key, language_code) => { 
  const string = section[key].text;
  const { id } = section[key]

  if(language_code !== 'en' && !section[key].questionId){
    return {msgstr: string[language_code], id};
  }

  if(language_code !== 'en' && section[key].questionId){
    const { questionId } = section[key];
    return {msgstr: string[language_code], questionId};
  }
  return {msgid: string[language_code], id};
}
createPoFile();