import React from 'react';

import './SocialMed.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const socialMed = props => {
    let socialIcnClass = ['reuse-share__social-icn'];

    if (props.switchOpt) {
        socialIcnClass.push('reuse-share__social-icn--more-opt');
    };

    return (
        <ul className={socialIcnClass.join(' ')}>
            <li>
                <a href="/">
                    <FontAwesomeIcon 
                        icon={['fab', 'facebook-square']} 
                        className="icon icon__reuse-share--facebook" />
                </a>
            </li>
            <li>
                <a href="/">
                    <FontAwesomeIcon 
                        icon={['fab', 'google-plus-square']} 
                        className="icon icon__reuse-share--googleplus" />
                </a>
            </li>
        </ul>
    );
};


export default socialMed;