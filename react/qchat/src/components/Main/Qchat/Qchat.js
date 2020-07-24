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
             pay={props.payment.bind(this, cnt._id, cnt.amount, cnt.qchatTotal)}
             tooltip={props.tooltip.bind(this, cnt._id)}
             showTooltip={props.showTooltip}
             startExam={props.startExam.bind(this, cnt.contentID)}
             deleteCnt={props.changeCnt.bind(this, cnt._id, cnt.title, 'delete')}
             changeCnt={props.changeCnt.bind(this, cnt._id, cnt.title, 'draft')}
             changeCntPublish={props.changeCnt.bind(this, cnt._id, cnt.title, 'publish')}/>
    ));

    return allQchat;
}

export default qchat;