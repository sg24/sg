import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import asyncComponent from '../../../../hoc/asyncComponent/asyncComponent';

const AsyncGroupNav = asyncComponent(() => {
    return import ('./GroupNav/GroupNav');
});

const AsyncPrivateNav = asyncComponent(() => {
    return import ('./PrivateNav/PrivateNav');
});

 
class Nav extends Component {
    render() {
        
        return (
            <AsyncGroupNav/>
        )
    }
};

export default withRouter(Nav);