import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './FilterPost.css';   

function FilterPost() {
    return (
        <div className="reuse-filter">
            <div className="reuse-filter__title">
                Filter 
                <FontAwesomeIcon 
                    icon={['fas', 'angle-down']} 
                    className="icon icon__reuse-filter--angle"/>
            </div>
            <div className="reuse-filter__opt"> 
                <div className="reuse-filter__opt--srch">
                    <div className="reuse-filter__opt--srch__calend">
                        <FontAwesomeIcon 
                            icon={['far', 'calendar-alt']} 
                            className="icon icon__reuse-filter--calend"/>
                    </div> 
                    <input type="text" className="reuse-filter__opt--srch__input" placeholder="Enter Post Title" />
                </div>
                <div className="reuse-filter__opt--fnd">
                    <div className="reuse-filter__opt--fnd__title">
                        Found
                        <div className="reuse-filter__opt--fnd__title--total">255</div>
                    </div>
                    <div className="reuse-filter__opt--fnd__alt">
                        <div className="reuse-filter__opt--fnd__alt--wrapper">
                            OR
                        </div>
                    </div>
                </div>
                <div className="reuse-filter__opt--cnt">
                    <div className="reuse-filter__opt--cnt__wrapper reuse-filter__opt--cnt__wrapper--mid">
                        <h3 className="reuse-filter__opt--cnt__title">
                            <FontAwesomeIcon 
                                icon={['far', 'comments']} 
                                className="icon icon__reuse-pt-filter--comment"/>
                            Comments
                        </h3>
                        <ul className="reuse-filter__opt--cnt__det">
                            <li>
                                Low 
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'angle-left']} />
                                    4000
                                </span>
                            </li>
                            <li>
                                Average
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'angle-left']} />
                                    4000
                                </span>
                            </li>
                            <li>
                                High
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'angle-left']} />
                                    4000
                                </span>
                            </li>
                        </ul>
                    </div>
        
                    <div className="reuse-filter__opt--cnt__wrapper reuse-filter__opt--cnt__wrapper--mid">
                        <h3 className="reuse-filter__opt--cnt__title">
                            <FontAwesomeIcon 
                                icon={['far', 'eye']} 
                                className="icon icon__reuse-pt-filter--view"/>  
                            views
                        </h3>
                        <ul className="reuse-filter__opt--cnt__det">
                            <li>
                                Low 
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'angle-left']} />
                                    4000
                                </span>
                            </li>
                            <li>
                                Average 
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'angle-left']} />
                                    4000
                                </span>
                            </li>
                            <li>
                                High 
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'angle-left']} />
                                    4000
                                </span>
                            </li>
                        </ul>
                    </div>
        
                    <div className="reuse-filter__opt--cnt__wrapper reuse-filter__opt--cnt__wrapper--mid">
                        <h3 className="reuse-filter__opt--cnt__title">
                            <FontAwesomeIcon 
                                icon={['fas', 'heart']} 
                                className="icon icon__reuse-pt-filter--fav"/>  
                            Favorites
                        </h3>
                        <ul className="reuse-filter__opt--cnt__det">
                            <li>
                                Low 
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'angle-left']} />
                                    4000
                                </span>
                            </li>
                            <li>
                                Average 
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'angle-left']} />
                                    4000
                                </span>
                            </li>
                            <li>
                                High 
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'angle-left']} />
                                    4000
                                </span>
                            </li>
                        </ul>
                    </div>
        
                    <div className="reuse-filter__opt--cnt__wrapper reuse-filter__opt--cnt__wrapper--mid">
                        <h3 className="reuse-filter__opt--cnt__title">
                            <FontAwesomeIcon 
                                icon={['fas', 'bars']} 
                                className="icon icon__reuse-filter--categ"/>
                            Category 
                        </h3>
                        <ul className="reuse-filter__opt--cnt__det reuse-filter__opt--cnt__det--categ">
                            <li>Scholarships</li>
                            <li>Sport</li>
                            <li>Entertainment Entertainment Entertainment</li>
                            <li>Scholarships</li>
                            <li>Sport</li>
                            <li>Entertainment Entertainment Entertainment</li>
                            <li>Scholarships</li>
                            <li>Sport</li>
                            <li>Entertainment Entertainment Entertainment</li>
                        </ul>
                    </div>
                </div>
        
                <div className="reuse-filter__opt--info">
                    <h3>
                        <FontAwesomeIcon 
                            icon={['fas', 'bars']} 
                            className="icon icon__reuse-filter--categ"/>
                        Category 
                    </h3>
                    <ul className="reuse-filter__opt--info__cnt">
                        <li>Poem 
                            <div>
                                <FontAwesomeIcon 
                                    icon={['fas', 'times']} 
                                    className="icon icon__reuse-filter--close"/>
                            </div>
                        </li>
                    </ul>
                </div>
        
                <div className="reuse-filter__opt--btn">
                    <button className="reuse-filter__opt--btn__cancel" type="button">
                        <FontAwesomeIcon 
                            icon={['fas', 'times']} 
                            className="icon icon__reuse-filter--cancel"/>
                        Cancel
                    </button>
                    <button className="reuse-filter__opt--btn__apply" type="button">
                        <FontAwesomeIcon 
                            icon={['fas', 'check']} 
                            className="icon icon__reuse-filter--apply"/>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterPost;