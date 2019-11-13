import React, { Component } from 'react';

import './MainModel.css';
import Category from './Category/Category';
import Filter from './Filter/Filter';  
import Model from './Model/Model';
import Aux from '../../../../hoc/Auxs/Aux';

class MainModel extends Component {
    render() {
        return (
            <Aux>
                <div className="reuse-pwt-filter">
                    <div className="reuse-pwt-filter__wrapper">
                        <Category />
                        <Filter />
                        <div className="reuse-pwt-filter__pwt">
                            My Works
                            <div>99</div>
                        </div>
                        <div className="reuse-pwt-filter__add">
                            <a href="/add/poet">Add</a>
                        </div>
                    </div>
                </div>
                <Model />
            </Aux>
        )
    }

}

export default MainModel;