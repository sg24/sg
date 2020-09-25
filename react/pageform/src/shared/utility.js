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

    const updateDataArray = [...dataArray];
    updateDataArray[dtIndex] = data;
    let updateStartArray = [...updateDataArray];
    data = updateObject(data, {changeFavActive: data.liked})
    updateStartArray[dtIndex] = data;
    return {
        updateStartArray,
        updateDataArray 
    }
   }

   return dataArray;
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid =  value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid =  value.length >= rules.minLength  && isValid
    }

    return isValid;
}

export const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

export const getImageURL = image => {
    let canvas = document.createElement('canvas');
    return new Promise((resolve, reject) => {
        if (canvas.getContext) {
                canvas.width = image.videoWidth;
                canvas.height = image.videoHeight;
                canvas.getContext('2d').drawImage(image, 0, 0);
                let snapShot = canvas.toDataURL('image/png');
                resolve(snapShot);;
        } else {
            reject('Please update your Browser')
        }
    })
}

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