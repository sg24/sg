import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import MainContent from '../../containers/MainContent/MainContent';
import MainNav from '../../containers/MainNav/MainNav'
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';;

const AsyncShare= asyncComponent(() => {
    return import ('../../containers/Share/Share');
});

const main = props => {
    return (
        <div className="site-main">
        <div className="wrapper__exmain">
            <MainContent />
            <MainNav />
        </div>
        <Route path="/index/share" component={AsyncShare} />
    </div>
    )
};

export default withRouter(main);