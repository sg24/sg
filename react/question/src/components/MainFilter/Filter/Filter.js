import React from 'react';

const filter = props => {
    let filterClass = props.filterRes.grp === 'post' ? ['site-main__content--filter__wrapper--pt'] :
    props.filterRes.grp === 'question' ? ['site-main__content--filter__wrapper--que'] : 
    ['site-main__content--filter__wrapper--pwt'];

    return (
        <li
            onClick={props.viewCnt}>
            <div
                style={{
                    paddingLeft: props.filterPos,
                    paddingRight: props.filterLastPos
                }}>
                <span
                    className={filterClass.join('')}>{props.filterRes.grp}</span>
                {props.filterRes.title}
            </div>
        </li>
    );
}

export default filter;