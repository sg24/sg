export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
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
    seconds: '%d',
    minute: '%d',
    minutes: '%d',
    hour: '%d',
    hours: '%d',
    day: '%d',
    days: '%d',
    month: '%d',
    months: '%d',
    year: '%d',
    years: '%d'
  };