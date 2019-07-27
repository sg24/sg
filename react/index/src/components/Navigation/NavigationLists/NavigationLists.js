import React from 'react';

import NavigationList from './NavigationList/NavigationList';

const navigationLists = props => {
    const allNavLists = props.content.map((navList, index ) => (
        <NavigationList 
            key={index}
            navList={navList}/>
    ))
    
    return allNavLists
};

export default navigationLists