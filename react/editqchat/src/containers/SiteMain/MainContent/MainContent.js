import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Form from './Form/Form';
import QueForm from './Form/QueForm';
import {clearAllData } from '../../../shared/utility';

class MainContent extends Component {
    constructor(props) {
        super(props);
        if (this.props.match.params.id) {
            localStorage.setItem('id', this.props.match.params.id)
        }
        if (!this.props.match.params.id && (localStorage.getItem('id') === null)) {
            window.location.assign('/qchat');
        }
        if ('indexedDB' in window) {
            clearAllData('media')
        }
        localStorage.removeItem('question')
        localStorage.removeItem('removedMedia')
    }
    render() {
        let cnt = <Form />
        if (this.props.location.search && Number.parseInt(this.props.location.search.split('=')[1]) > 0) {
            cnt = <QueForm />
        }
        return cnt
    }
};

export default withRouter(MainContent);