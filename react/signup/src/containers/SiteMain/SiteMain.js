import React, { Component } from 'react';

import LogoSvg from './Logo.svg';
import MainContent from './MainContent/MainContent';

class SiteMain extends Component {
        
      render() {
        return (
            <div className="site-main">
                <div className="wrapper">
                    <div className="wrapper__exmain">
                        <MainContent />
                    </div>
                </div>
            </div>
        )
      }
};

export default SiteMain; 