import React, { Component } from 'react';

import './MainPost.css';
import Category from './Category/Category';
import Filter from './Filter/Filter';  
import Posts from './Posts/Posts';
import Aux from '../../../../hoc/Auxs/Aux';

class MainPost extends Component {
    render() {
        return (
            <Aux>
                <div className="reuse-pt-filter">
                    <div className="reuse-pt-filter__wrapper">
                        <Category />
                        <Filter />
                        <div className="reuse-pt-filter__pt">
                            My Post 
                            <div>99</div>
                        </div>
                        <div className="reuse-pt-filter__add">
                            <a href="/add/post">Add Post</a>
                        </div>
                    </div>
                </div>
                <Posts />
            </Aux>
        )
    }

}

export default MainPost;