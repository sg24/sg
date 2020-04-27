import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Form from './Form/Form';
import QueForm from './Form/QueForm';

class MainContent extends Component {
    render() {
        let cnt = <Form />
        if (this.props.location.search && Number.parseInt(this.props.location.search.split('=')[1]) > 0) {
            cnt = <QueForm />
        }
        return cnt
    }
};

export default withRouter(MainContent);