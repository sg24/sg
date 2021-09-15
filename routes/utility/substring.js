const subString = (str, props = 'content', truncateLength = 150) =>{
    return str && str.length > 150 ? { [props]: str.substr(0, truncateLength), truncate: true } : {[props]: str};
}

module.exports = subString