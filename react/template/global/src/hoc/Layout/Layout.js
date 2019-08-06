import React from 'react';

import Aux from '../Auxs/Aux';
import Header from '../../containers/Header/Header';

const layout = props =>  (
    <Aux>
        <Header />
        {props.children}
    </Aux>
);
 

export default layout;