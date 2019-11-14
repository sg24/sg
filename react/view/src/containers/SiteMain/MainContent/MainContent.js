import React, { Component } from 'react';

import Views from './Views/Views'; 

class MainContent extends Component {
    render() {
        return (
            <div className="site-main__content">
                <div className="site-main__content--no-tab-wrapper">
                    <div className="site-main__content--top"></div>
                    <Views />
                </div>
            </div>
        );
    }
}


export default MainContent;