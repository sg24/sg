import React from 'react';

import ModelComment from'./ModelComment/ModelComment';

const modelComments = props => {
    return props.comments.map((comment, index) => (
        <ModelComment 
            key={index}
            comment={comment}
            cntGrp={props.cntGrp}
            reply={props.reply.bind(this, comment._id)}
            correct={props.correct}
            wrong={props.wrong}
            smile={props.correct}/>
    ))
};

export default modelComments;