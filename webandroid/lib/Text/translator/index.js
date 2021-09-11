import * as Localization from 'expo-localization';

import translate from './translate';

const translator = (sentence, keyword, positionRight, core, fullLocale) => {
    return translate(Localization.locale, sentence, keyword, positionRight, fullLocale, core)
}


export default translator;