import React from 'react';
import arraySort from 'array-sort';

import QchatContent from './QchatContent/QchatContent';

const qchat = props => {
    let content = arraySort(props.content, 'created', {reverse: true})
    const allQchat = content.map((cnt, index) => (
        <QchatContent 
             key={index} 
             cnt={cnt}
             userOpt={props.userOpt.bind(this, cnt._id)} 
             showCnt={props.showCntOpt}
             share={props.share.bind(this, cnt._id)}
             tooltip={props.tooltip.bind(this, cnt._id)}
             showTooltip={props.showTooltip}
             start={props.startExam.bind(this, cnt.contentID)}
             deleteCnt={props.changeCnt.bind(this, cnt._id, cnt.title, 'delete', 'deleteqchat')}
             changeCnt={props.changeCnt.bind(this, cnt._id, cnt.title, 'draft', 'qchat')}/>
    ));

    return allQchat;
}

export default qchat;