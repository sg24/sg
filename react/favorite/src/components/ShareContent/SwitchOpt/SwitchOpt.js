import React from 'react';

import './SwitchOpt.css'

const switchOpt = props => {
    return (
        <div className="reuse-share__switch-opt" onClick={props.switchOpt}>
            <div className="reuse-share__switch-opt--mid"></div>
        </div>
    );
}

export default switchOpt;
    
