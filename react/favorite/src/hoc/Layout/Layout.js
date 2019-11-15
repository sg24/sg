import React from 'react';

import Aux from '../Auxs/Aux';
import Header from '../../containers/Header/Header';
import SiteHero from '../../containers/SiteHero/SiteHero';

const layout = props =>  (
    <Aux>
        <Header />
        <SiteHero />
        {props.children}
    </Aux>
);
 

export default layout;