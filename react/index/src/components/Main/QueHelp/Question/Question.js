import React from 'react';

import QuestionContent from './QuestionContent/QuestionContent';

const question = props => {
    const allPost = props.content.map((que, index) => (
        <QuestionContent 
            key={index} 
            que={que} 
            userOpt={props.userOpt.bind(this, index)} 
            showQue={props.showQueOpt}
            index={index}
            fav={props.fav.bind(this, que.id)}
            share={props.share.bind(this, index)}/>
    ));

    return allPost;
}

export default question;