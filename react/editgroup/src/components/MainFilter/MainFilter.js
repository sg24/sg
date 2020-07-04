import React from 'react';

import Filter from './Filter/Filter';

const mainFilter = props => {
    let allFilterRes = props.filterResults.map((filterRes, index) => (
        <Filter
            key={index}
            filterRes={filterRes}
            filterPos={props.filterPos}
            filterLastPos={props.filterLastPos}
            viewCnt={props.viewCnt.bind(this, filterRes.url)}/>
    ));

    return allFilterRes
}

export default mainFilter;