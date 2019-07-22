import React from 'react';

import './SocialMed.css'

const socialMed = props => {
    let socialIcnClass = ['reuse-share__social-icn'];

    if (props.switchOpt) {
        socialIcnClass.push('reuse-share__social-icn--more-opt');
    };

    return (
        <ul className={socialIcnClass.join(' ')}>
            <li><a href="/"><i className="fab fa-facebook-square icon icon__reuse-share--facebook"></i></a></li>
            <li><a href="/"><i className="fab fa-google-plus-square icon icon__reuse-share--googleplus"></i></a></li>
        </ul>
    );
};


export default socialMed;