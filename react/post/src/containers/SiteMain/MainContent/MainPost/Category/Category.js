import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Category.css';

function Category() {
    return (
        <div className="reuse-categ">
            <div>
                Category 
                <FontAwesomeIcon 
                    icon={['fas', 'angle-down']} 
                    className="icon icon__reuse-categ--angle"/>
            </div>
            <ul className="reuse-categ__opt">
                <li><a href="">Scholarships</a></li>
            </ul>
        </div>    
    );
}

export default Category;