import React from 'react';

import FilterItem from './FilterItem/FilterItem';

const FilterItems = props => {
    const tags= props.tags.map(tag => (
        <FilterItem 
            key={tag}
            path={props.path}
            tag={tag}/>
    ));

    return tags
}

export default FilterItems;