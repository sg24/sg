import dictionary from './translations';

const translation = (locale, sentence = '', keyword = null, positionRight = true, fullLocale = false, core) => {
    let updateLocale = fullLocale ? locale : locale.split('-')[0];
    let updateSentence = sentence ? String(sentence).trim().toLowerCase() : sentence;
    let languageDictionary = dictionary[updateLocale];
    if (!languageDictionary) {
        return keyword ? positionRight ? `${sentence} ${keyword}` : `${keyword} ${sentence}` : sentence;
    }
    for (let word in languageDictionary) {
        if (word.trim().toLowerCase() === updateSentence) {
            return keyword ? positionRight ? `${languageDictionary[word]} ${keyword}` :  ` ${keyword} ${languageDictionary[word]}` : languageDictionary[word]
        }
    }
    return sentence;
}

export default translation;