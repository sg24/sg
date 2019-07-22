import React from 'react';

import Aux from '../Auxs/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SiteHero from '../../containers/SiteHero/SiteHero';

const layout = props =>  (
    <Aux>
        <Toolbar />
        <SiteHero />
        {props.children}
    </Aux>
);
 

export default layout;