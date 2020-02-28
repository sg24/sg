import React from 'react';
import { withRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const activeLink = (props) => {
    const handleClick = (e) => {
        e.preventDefault()
        props.router.push(props.href)
    }

    return (
        <a href={props.href} onClick={handleClick} className={props.router.pathname === props.href ? 'active-content-tab' : null }>
            <FontAwesomeIcon 
                icon={['fas', props.icnGrp]} 
                className={props.icnClass} /> 
            {props.children}
        </a>
    )
}

export default withRouter(activeLink)
