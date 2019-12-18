import React from 'react';

import {ReactComponent as Logo } from './Logo.svg'

const logo = props => (
    <div className="site-header__logo">
        <div className="site-header__logo--graphics">
            <Logo />
        </div>
    </div>
);

export default logo;