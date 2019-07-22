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

export function changeFav(datas, dataID) {
    const dataArray = [...datas];
    let dtIndex;
    let dtArray = dataArray.filter((data, index) => {
        if (data.id === dataID) {
            dtIndex = index
            return true
        }
        return false
    });

   if (dtArray.length > 0) {
    let data = dtArray[0];
    data = updateObject(data, {liked: !data.liked})

    if (data.liked) {
        data = updateObject(data, {favorite: data.favorite + 1})

    } else {
        data = updateObject(data, {favorite: data.favorite - 1})
    }

    const updateDataArray = dataArray;
    updateDataArray[dtIndex] = data;
    return updateDataArray
   }

   return dataArray;
};