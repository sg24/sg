import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MediaItems extends Component {
    render() {
        let media = this.props.cnt.map((cnt, index) => (
            <div 
                className="reuse-form--itm__prev--wrapper"
                key={index}>
                <div 
                    className="reuse-form--itm__prev--close"
                    onClick={this.props.removeMedia.bind(this, cnt.id)}>
                    <FontAwesomeIcon 
                        icon={['fas', 'times']} />
                </div>
                {cnt.type === 'image' ? <img src={cnt.url} alt="" /> : 
                <video 
                    src={cnt.url} 
                    controls>
                    <p>our browser doesn't support embedded videos</p>
                </video>}
            </div>
        ))
        return <div className="reuse-form--itm__prev">{media}</div>;
    }
}

export default MediaItems;