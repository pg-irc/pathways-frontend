const { buildExploreFixture } = require('../lib/fixtures/hard_coded/explore');
const R = require('ramda');

const explore = buildExploreFixture();
const { sections }  = explore;
const sectionKeys = R.keys(sections);

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
  const nameStrings = sectionKeys.map(section => getLanguageStrings(sections, section, language_code, 'name'));
  const descriptionStrings = sectionKeys.map(section => getLanguageStrings(sections, section, language_code, 'description'));
  return R.concat(nameStrings, descriptionStrings);
}

setupPoFile = (combinedLanguageStrings) => {
  for(let i = 0; i < combinedLanguageStrings.length; i++) {
    const { msgid, msgstr} = combinedLanguageStrings[i];
    console.log(`msgid "${msgid}"`);
    console.log(`msgstr "${msgstr}"`);
    console.log('');
  }
}

const getLanguageStrings = (section, key, language_code, nameOrDescription) => { 
  const string = section[key][nameOrDescription];
  if(language_code !== 'en'){
    return {msgstr: string[language_code]};
  }
  return {msgid: string[language_code]};
}

createPoFile();