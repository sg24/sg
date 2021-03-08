// import io from 'socket.io-client';
import axios from '../axios'

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid =  value.trim() !== '' && isValid;
    }

    if (rules.emailValidator) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid =  re.test(String(value).toLowerCase());
    }

    if (rules.minLength) {
        isValid =  value.length >= rules.minLength  && isValid
    }

    if (rules.numbersOnly) {
        isValid =  /^\d+$/.test(value.toString()) && isValid;
    }
    
    if (rules.notZero) {
        isValid =  /0/.test(parseInt(value)) ? false : true && isValid;
    }

    if (rules.maxNumber) {
        isValid = parseInt(value) <= rules.maxNumber  && isValid;
    }

    if (rules.isEqual) {
        isValid =  value === rules.isEqual;
    }

    return isValid;
}

export const checkUri = (value) => {
    let LINK_DETECTION_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g;
    let text = String(value);
    let detectUrl = text.replace(/\n/g, ` `).split(` `).filter((token) => LINK_DETECTION_REGEX.test(token));
    return detectUrl;
}

export const verifyUri = (value) => {
    let LINK_DETECTION_REGEX = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    let text = String(value);
    let detectUrl = text.replace(/\n/g, ` `).split(` `).find((token) => LINK_DETECTION_REGEX.test(token));
    if (!detectUrl) {
        return `http://${text}`
    }
    return detectUrl;
}

export const checkHashtag = (value) => {
    let HASH_DETECTION_REGEX = /(^|\s)(#[a-z\d-]+)/i
    let text = String(value);
    let detectHash = text.replace(/\n/g, ` `).split(` `).filter((token) => HASH_DETECTION_REGEX.test(token));
    return detectHash;
}

export const transformNumber = (favNumber) => {
    if (favNumber / 1000 >= 1 && favNumber / 1000 < 1000) {
        return `${ Math.floor(favNumber / 1000) } K`;
    }
    if (favNumber / 1000000 >= 1 && favNumber / 1000000 < 1000) {
        return `${ Math.floor(favNumber / 1000000) } M`;
    }
    if (favNumber / 1000000000 >= 1 && favNumber / 1000000000 < 1000) {
        return `${ Math.floor(favNumber / 1000000000) } B`;
    }
    return favNumber
};


export const transformString = (val) => {
    const curVal = String(val).substr(0, 115);
    return curVal;
};

export function changeFav(id, liked, favAdd, changedFav) {
    let changedFavorites = [...changedFav];
    let favDets = changedFavorites.filter(fav => fav.id === id);
    for (let favDet of favDets) {
        return updateFavs(favDet);
    }   
    let newChangedFav = {id, liked, favAdd};
    return updateFavs(newChangedFav);
    
    function updateFavs(favDet) {
        favDet = updateObject(favDet, {liked: !favDet.liked});
        if (favDet.liked) {
            favDet = updateObject(favDet, {favAdd: favDet.favAdd + 1});
        } else {
            favDet = updateObject(favDet, {favAdd: favDet.favAdd - 1});
        }
        let updateChangeFav = changedFavorites.filter(fav => fav.id !== id);
        updateChangeFav.push(favDet)
        return {favDet, updateChangeFav};
    }
};

export const engStrings = {
    suffixAgo: 'ago',
    seconds: 'sec',
    minute: '%d min',
    minutes: '%d min',
    hour: '%d hr',
    hours: '%d hrs',
    day: '%d day',
    days: '%d days',
    month: '%d month',
    months: '%d months',
    year: '%d yr',
    years: '%d yrs'
  };

export const calendarStrings = {  
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY'
};

export function changeMode (oldCnts,changeCntStart,field, isUpdate) {
    let cnts = [...oldCnts];
    let curIndex;

    let user = cnts.filter((userFnd, index) => {
        curIndex = index;
        return userFnd.id === changeCntStart.id;
    });
    if (user.length > 0) {
        user[0].pending = false;
        user[0].request = false;
        user[0].accept = false;
        user[0][field] = isUpdate;
        cnts[curIndex] = user[0];
        return cnts;
    }
    return oldCnts
}

export const trim = (val) =>String(val).trim()

// export const socket = io('https://www.slodge24.com');