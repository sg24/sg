import React from 'react';

import './SocialMed.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const socialMed = props => {
    let socialIcnClass = ['reuse-share__social-icn'];

    if (props.switchOpt) {
        socialIcnClass.push('reuse-share__social-icn--more-opt');
    };

    return (
        <ul className={socialIcnClass.join(' ')}>
            {/* <li onClick={props.shareFacebook}>
                <FontAwesomeIcon 
                    icon={['fab', 'facebook-square']} 
                    className="icon icon__reuse-share--facebook" />
            </li> */}
            {/* <li onClick={props.shareTwitter}>
                <FontAwesomeIcon 
                    icon={['fab', 'twitter']} 
                    className="icon icon__reuse-share--googleplus" />
            </li> */}
        </ul>
    );
};


export default socialMed;