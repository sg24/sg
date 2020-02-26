import React from 'react';

import Aux from '../Auxs/Auxs';
import Header from '../../containers/Header/Header';
// import SiteHero from '../../containers/SiteHero/SiteHero';
import Footer from '../../containers/Footer/Footer';

const layout = props =>  (
    <Aux>
        <Header />
        {/* <SiteHero /> */}
        {props.children}
        <Footer />
    </Aux>
);
 

export default layout;