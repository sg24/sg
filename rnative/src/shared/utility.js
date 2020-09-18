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

    if (rules.isEqual) {
        isValid =  value === rules.isEqual;
    }

    return isValid;
}

export const transformNumber = (favNumber) => {
    const favNumArray = String(favNumber).split("");
    
    if (favNumArray.length === 4 ) {
        return `${favNumArray[0]}K`
    }

    if (favNumArray.length === 5 ) {
        const favNum = favNumArray[0] + favNumArray[1]
        return `${favNum}K`
    }

    if (favNumArray.length === 6 ) {
        const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
        return `${favNum}K`
    }

    if (favNumArray.length === 7 ) {
        const favNum = favNumArray[0];
        return `${favNum}M`
    }

    if (favNumArray.length === 8 ) {
        const favNum = favNumArray[0] + favNumArray[1];
        return `${favNum}M`
    }

    if (favNumArray.length === 9 ) {
        const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
        return `${favNum}M`
    }

    if (favNumArray.length === 10 ) {
        const favNum = favNumArray[0];
        return `${favNum}B`
    }

    if (favNumArray.length === 11 ) {
        const favNum = favNumArray[0] + favNumArray[1];
        return `${favNum}B`
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