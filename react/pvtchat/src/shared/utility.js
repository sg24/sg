import io from 'socket.io-client';
import uuid from 'uuid';
import axios from '../axios'

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

export const getImageURL = image => {
    let canvas = document.createElement('canvas');
    return new Promise((resolve, reject) => {
        if (canvas.getContext) {
                canvas.width = image.videoWidth;
                canvas.height = image.videoHeight;
                canvas.getContext('2d').drawImage(image, 0, 0);
                canvas.toBlob((blob) => {
                    resolve(blob)
                });
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

  export const socket = io(`${window.location.protocol + '//' + window.location.host}`);

  let chunks = [];
  export const webCameraApi = (socketConnect, mediaRecorder, cnt, opt, format, formatType,type, socketKey) => {
    return new Promise((resolve, reject) => {
        if (!cnt) {
            chunks = []
            if (!('mediaDevices' in navigator)) {
                navigator.mediaDevices = {};
            }
            
            if (!('getUserMedia' in navigator.mediaDevices)) {
                navigator.mediaDevices.getUserMedia = function(constraints) {
                var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            
                if (!getUserMedia) {
                    return reject('getUserMedia is not implemented!');
                }
            
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
                }
            }
            navigator.mediaDevices.getUserMedia(opt)
                .then(function(stream) {
                    let mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    mediaRecorder.ondataavailable = function(e) {
                        chunks.push(e.data);
                    }
                    resolve({mediaRecorder, stream})
                })
                .catch(function(err) {
                    reject(err)
                });   
        } else {
            mediaRecorder.stop();
            mediaRecorder.onstop = function(e) {
                var blob = new Blob(chunks, { 'type' : format });
                chunks = [];
                mediaRecorder.stream.getTracks().forEach( track => 
                    track.stop())
                resolve([{file: blob, type, format: formatType, chatID: uuid()}])
            }
        }
    })
}

export function changeMode (oldCnts,changeCntStart,field, isUpdate) {
    let cnts = [{...oldCnts}];
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
       return {...cnts[0]};
    }
    return oldCnts
  }

  export const createChat = (url, category, cnt) => {
      return new Promise((resolve, reject) => {
          axios.post(url, cnt, {headers: {'data-categ': category}}).then(res => {
              if (res) {
                resolve(res.data)
              }
          }).catch(err => {
              reject(err)
          })
      })
  }