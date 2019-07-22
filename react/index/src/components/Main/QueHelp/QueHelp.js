import React from 'react';
import QueHelpContent from './QueHelpContent/QueHelpContent';

const queHelp = props => (
    <QueHelpContent 
        auth={props.isAuth}/>
);

export default queHelp;