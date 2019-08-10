import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';

class SiteMain extends Component {
    checkHeaderDefault = () => {
        if (!this.props.default) {
            this.props.onNavDefault()
        }
    }

    render() {
        return (
            <div 
                className="site-main site-main__fm" 
                onClick={this.checkHeaderDefault}>
            <div className="wrapper__exmain">
                <MainContent />
            </div>
        </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(SiteMain); 