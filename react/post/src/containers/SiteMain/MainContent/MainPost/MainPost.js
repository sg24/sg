import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import './MainPost.css';
import Category from './Category/Category';
import FilterPost from './FilterPost/FilterPost';  
import Posts from './Posts/Posts';
import Aux from '../../../../hoc/Auxs/Aux';

function MainPost (props) {
    return (
        <Aux>
            <div className="reuse-pt-filter">
                <div className="reuse-pt-filter__wrapper">
                    <Category />
                    <FilterPost />
                    <div className="reuse-pt-filter__pt">
                        My Post 
                        <div>99</div>
                    </div>
                    <div className="reuse-pt-filter__add">
                        Add Post
                    </div>
                </div>
            </div>
            <Posts />
        </Aux>
    )
}

export default withRouter(MainPost);