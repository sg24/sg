const search = ( cnt, cntType, searchCnt = '') => cnt.filter(c => c[cntType].toLowerCase().indexOf(searchCnt.toLowerCase()) > -1);
module.exports = search
