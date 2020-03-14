import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import asyncComponent from '../../../../hoc/asyncComponent/asyncComponent';

const AsyncGroupMain = asyncComponent(() => {
    return import ('./GroupMain/GroupMain');
});

const AsyncPrivateMain = asyncComponent(() => {
    return import ('./PrivateMain/PrivateMain');
});


class Main extends Component {
    render() {
        
        return (
            <AsyncPrivateMain/>
        )
    }
};

export default withRouter(Main);