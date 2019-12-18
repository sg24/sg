import React from 'react';

import FilterOption from './FilterOption/FilterOption';

const filterOptions = props => {
    let allFilterOpt = props.filterOptions.map(filterOpt => (
        <FilterOption 
            key={filterOpt.id}
            filterOpt={filterOpt}
            filterItm={props.filterItm.bind(this, filterOpt.filterRangeIcn, filterOpt.filterRange, filterOpt.id)}
            filterSelect={props.filterSelect}/>
    ));

    return allFilterOpt;
}

export default filterOptions;