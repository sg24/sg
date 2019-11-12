import React, { Component } from 'react';

import './MainQue.css';
import Category from './Category/Category';
import Filter from './Filter/Filter';  
import Questions from './Questions/Questions';
import Aux from '../../../../hoc/Auxs/Aux';

class MainQue extends Component {
    render() {
        return (
            <Aux>
                <div className="reuse-que-filter">
                    <div className="reuse-que-filter__wrapper">
                        <Category />
                        <Filter />
                        <div className="reuse-que-filter__que">
                            My Question
                            <div>99</div>
                        </div>
                        <div className="reuse-que-filter__add">
                            Add 
                        </div>
                    </div>
                </div>
                <Questions />
            </Aux>
        )
    }

}

export default MainQue;