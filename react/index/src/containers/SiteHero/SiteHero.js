import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import LogoSvg from './Logo.svg';

class SiteHero extends Component {
    checkHeaderDefault = () => {
        if (!this.props.default) {
            this.props.onNavDefault()
        }
    }

    render() {
        return (
            <div 
                className="site-hero" 
                onClick={this.checkHeaderDefault}
                style={{
                    backgroundImage: `url('${LogoSvg}')`,
                    backgroundRepeat: 'repeat',
                    backgroundAttachment: 'fixed'
                }}>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        default: state.header.default
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SiteHero); 