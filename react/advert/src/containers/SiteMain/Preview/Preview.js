import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Preview.css';
import Carousel from '../../../components/UI/Media/Media';

class Preview extends Component {
    componentDidMount() {
        if (this.props.preview.length < 1) {
            this.props.history.push('/advert') 
        }
    }

    render() {
        let cnt = null;
        if (this.props.preview.length > 0) {
            cnt = (
                <Carousel
                    images={this.props.preview}
                    wrapperClass="preview__media--wrapper"
                    prevClass="preview__media--cnt preview__media--cnt__prev"
                    prevIcnClass="icon icon__preview--media__prev"
                    nextClass="preview__media--cnt preview__media--cnt__nxt"
                    nextIcnClass="icon icon__preview--media__nxt"
                    playClass="preview__media--wrapper__icn"
                    playIcnClass="icon icon__preview--media__play"/>
            )
        }

        return (
            <div className="preview">
                { cnt }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        preview: state.cnt.preview
    };
};

export default withRouter(connect(mapStateToProps, null)(Preview))