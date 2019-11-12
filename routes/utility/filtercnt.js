module.exports = filtercnt = (filter) => {
    return new Promise((resolve, reject) => {
        let comment = {};
        let favorite = {};
        let view = {};
        let helpFull = {};
        for (let filterOpt of filter.filterSelect) {
            let filterRanges = String(filterOpt.rangeValue).split('-');
            if (filterOpt.filterGrp === 'comment') {
                comment = filterRanges.length === 1 ? {comment: {[filterOpt.rangeType] : filterOpt.rangeValue}} :
                {comment: {[filterOpt.rangeType] : filterRanges[0], '$lt' : filterRanges[1]}}
            } else if (filterOpt.filterGrp === 'view') {
                view = filterRanges.length === 1 ? {view: {[filterOpt.rangeType] : filterOpt.rangeValue}} : 
                {view: {[filterOpt.rangeType] : filterRanges[0], '$lt' : filterRanges[1]}}
            } else if(filterOpt.filterGrp === 'helpFull') {
                helpFull = filterRanges.length === 1 ? {helpFull: {[filterOpt.rangeType] : filterOpt.rangeValue}} : 
                {helpFull: {[filterOpt.rangeType] : filterRanges[0], '$lt' : filterRanges[1]}}
            }else {
                favorite = filterRanges.length === 1 ?{favorite: {[filterOpt.rangeType] : filterOpt.rangeValue}} :
                {favorite: {[filterOpt.rangeType] : filterRanges[0], '$lt' : filterRanges[1]}}
            }
        }
        let filterCateg = filter.category.length > 0 ? {category: { $all: filter.category }} : {};
        resolve( {searchCnt: filter.searchCnt,comment, view, helpFull, favorite, category: filterCateg})
    })
}