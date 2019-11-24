import React, { Component } from 'react';

import './MainModel.css';
import Category from './Category/Category';
import Search from './Search/Search';
import Filter from './Filter/Filter';  
import Model from './Model/Model';
import Aux from '../../../../hoc/Auxs/Aux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MainModel extends Component {
    render() {
        return (
            <Aux>
                <Search />
                <div className="reuse-user-filter">
                    <div className="reuse-user-filter__wrapper">
                        <Category />
                        <Filter />
                        <div className="reuse-user-filter__teach">
                            My Teachers
                            <div>99</div>
                        </div>
                        <div className="reuse-user-filter__srch">
                            <FontAwesomeIcon 
                                icon={['fas', 'search']} 
                                className="icon icon__reuse-user-filter--srch" />
                        </div>
                    </div>
                </div>
                <Model />
            </Aux>
        )
    }

}

export default MainModel;