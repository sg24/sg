module.exports = userFilter = (filter) => {
    return new Promise((resolve, reject) => {
        let filterCnt = {};
        for (let filterOpt of filter.filterSelect) {
            let filterRanges = String(filterOpt.rangeValue).split('-');
            filterCnt[filterOpt.filterGrp] = (filterRanges.length === 1 ? {[filterOpt.rangeType] : filterOpt.rangeValue} :
              {[filterOpt.rangeType] : filterRanges[0], '$lt' : filterRanges[1]})
        }
        resolve( {searchCnt: filter.searchCnt,filterCnt, category: filter.category, categoryGrp: filter.categoryGrp})
    })
}