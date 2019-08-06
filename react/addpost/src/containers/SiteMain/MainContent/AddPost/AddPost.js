import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AddPost.css';
import AddImage from './AddImage/AddImage';
import AddVideo from './AddVideo/AddVideo';
import AddUsers from './AddUsers/AddUsers';

const addPost = props => {
    return (
        <form action="" className="reuse-form">
        <div className="reuse-form__wrapper">
            <div className="reuse-form__overlay"></div>
            <h3 className="reuse-form__title">
                <div>
                    <div>
                    <FontAwesomeIcon 
                        icon={['fas', 'pencil-alt']} />
                    </div> 
                    Add Post
                </div>
            </h3>
            <div className="reuse-form__cnt">
                <div className="reuse-form__cnt--wrapper">
                    <label className="reuse-form__cnt--title">
                        <FontAwesomeIcon 
                            icon={['fas', 'tags']} 
                            className="icon icon__reuse-form--cnt__tag" />
                        Post Tags
                    </label>
                    <div className="reuse-form__cnt--det">
                        <div className="reuse-form__cnt--det__wrapper">
                            <div className="reuse-form__cnt--det__selec reuse-form__cnt--det__selec--categ">
                                Category 
                                <FontAwesomeIcon 
                                    icon={['fas', 'angle-down']} 
                                    className="icon icon__reuse-form--angle" />
                                <ul className="reuse-form__cnt--det__selec--opt">
                                    <li>Entertainment</li>
                                    <li>Social</li>
                                    <li>Social</li>
                                    <li>Poem</li>
                                    <li>Prose</li>
                                    <li>Poet</li>
                                     <li>Entertainment</li>
                                    <li>Social</li>
                                    <li>Social</li>
                                    <li>Poem</li>
                                    <li>Prose</li>
                                    <li>Poet</li>
                                </ul>
                            </div>
                            <div className="reuse-form__cnt--det__alt">
                                <div className="reuse-form__cnt--det__alt--title">
                                    <div>OR</div>
                                </div>
                                <div className="reuse-form__cnt--det__alt--cnt">
                                    <input type="text" name="" id="" className="reuse-form__cnt--det__input" placeholder="Add Category" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="reuse-form__cnt--tag">
                        <h3><i className="fas fa-bars icon icon__reuse-form__cnt--categ"></i>Category </h3>
                        <ul className="reuse-form__cnt--tag__itm">
                            <li>
                                Poem 
                                <div>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'times']} 
                                        className="icon icon__reuse-form__cnt--tag__close" />
                                </div>
                            </li>
                            <li>
                                Poet 
                                <div>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'times']} 
                                        className="icon icon__reuse-form__cnt--tag__close" />
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* {{!-- <div class="reuse-form__err">Pls, select category</div> --}} */}
                </div>
                <div className="reuse-form__cnt--wrapper">
                    <label className="reuse-form__cnt--title">Post Title</label>
                    <div className="reuse-form__cnt--det">
                        <input type="text" name="" id="" className="reuse-form__cnt--det__input reuse-form__cnt--det__input--lg" />
                    </div>
                    {/* {{!-- <div class="reuse-form__err">Pls, Enter a title</div> --}} */}
                </div>
                <div className="reuse-form__cnt--wrapper">
                    <label className="reuse-form__cnt--title">Content </label>
                    <div className="reuse-form__cnt--det">
                        <textarea name="" id="" className="reuse-form__cnt--det__info"></textarea>
                    </div>
                    {/* {{!-- <div class="reuse-form__err">Pls, content must not be empty</div> --}} */}
                </div>
                <div className="reuse-form__cnt--wrapper">
                    <div className="reuse-form__cnt--det">
                        <div className="reuse-form__cnt--det__wrapper">
                            <div className="reuse-form__cnt--det__selec reuse-form__cnt--det__selec--add">
                                Add  Items 
                                <FontAwesomeIcon 
                                    icon={['fas', 'angle-down']} 
                                    className="icon icon__reuse-form--angle" />
                                <ul className="reuse-form__cnt--det__selec--opt">
                                    <li className="reuse-form__cnt--det__selec--opt__img">Image</li>
                                    <li className="reuse-form__cnt--det__selec--opt__vid">Video</li>
                                </ul>
                            </div>
                            <div className="reuse-form__cnt--det__selec reuse-form__cnt--det__selec--user">
                                <FontAwesomeIcon 
                                    icon={['fas', 'chalkboard-teacher']} 
                                    className="icon icon__reuse-form--cnt__user" />
                                Share Users 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <AddImage />
    
            <AddVideo />
    
            <AddUsers />
            
            <div className="reuse-form__footer reuse-form__btn">
                <button type="submit" className="reuse-form__btn--dft"><i class="fas fa-eye-slash icon icon__reuse-form--btn"></i> Draft</button>
                <button type="submit" className="reuse-form__btn--add"><i class="fas fa-plus icon icon__reuse-form--btn"></i> Add</button>
            </div>
        </div>
    </form>
    );
};

export default addPost;