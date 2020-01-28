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

export const getSnapshot = (url, mediaType) => {
    return new Promise ((resolve, reject) => {
        let media = document.createElement(mediaType);
        function multipleEventListener(el, mediaLoadHandler) {
            'loadedmetadata loadeddata suspend'.split(' ').forEach(event => {
                el.addEventListener(event, mediaLoadHandler, false)
            })
        }
        media.onerror = function() {
            reject(media.error.message);
        }
        media.src = url;
        multipleEventListener(media, mediaLoadHandler)
        let event_fired = 0;
        function mediaLoadHandler() {
            if (++event_fired === 3) {
                media.currentTime = 1;
                media.addEventListener('seeked', function(event) {
                    resolve();
                })
            }
        }
    })
}

export const getImageURL = url => {
    let image = new Image();
    image.src = url;
    let canvas = document.createElement('canvas');
    return new Promise((resolve, reject) => {
        if (canvas.getContext) {
            image.onload = function() {
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                canvas.getContext('2d').drawImage(image, 0, 0);
                let snapShot = canvas.toDataURL('image/png');
                resolve(snapShot);
            }
        } else {
            reject('Please update your Browser')
        }
    })
}