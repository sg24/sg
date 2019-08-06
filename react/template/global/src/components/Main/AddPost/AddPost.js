import React from 'react';

const addPost = props => {
    return (
        <form action="" class="reuse-form">
        <div class="reuse-form__wrapper">
            <div class="reuse-form__overlay"></div>
            <h3 class="reuse-form__title">
                <div><div><i class="fas fa-pencil-alt"></i></div> Add Post</div>
            </h3>
            <div class="reuse-form__cnt">
                <div class="reuse-form__cnt--wrapper">
                    <label for="category" class="reuse-form__cnt--title"><i class="fas fa-tags icon icon__reuse-form--cnt__tag"></i> Post Tags</label>
                    <div class="reuse-form__cnt--det">
                        <div class="reuse-form__cnt--det__wrapper">
                            <div class="reuse-form__cnt--det__selec reuse-form__cnt--det__selec--categ">
                                Category <i class="fas fa-angle-down icon icon__reuse-form--angle"></i> 
                                <ul class="reuse-form__cnt--det__selec--opt">
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
                            <div class="reuse-form__cnt--det__alt">
                                <div class="reuse-form__cnt--det__alt--title">
                                    <div>OR</div>
                                </div>
                                <div class="reuse-form__cnt--det__alt--cnt">
                                    <input type="text" name="" id="" class="reuse-form__cnt--det__input" placeholder="Add Category" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="reuse-form__cnt--tag">
                        <h3><i class="fas fa-bars icon icon__reuse-form__cnt--categ"></i>Category </h3>
                        <ul class="reuse-form__cnt--tag__itm">
                            <li>Poem <div><i class="fas fa-times icon icon__reuse-form__cnt--tag__close"></i></div></li>
                            <li>Poet <div><i class="fas fa-times icon icon__reuse-form__cnt--tag__close"></i></div></li>
                            <li>News <div><i class="fas fa-times icon icon icon__reuse-form__cnt--tag__close"></i></div></li>
                            <li>Entertainment <div><i class="fas fa-times icon icon__reuse-form__cnt--tag__close"></i></div></li>
                        </ul>
                    </div>
                    {/* {{!-- <div class="reuse-form__err">Pls, select category</div> --}} */}
                </div>
                <div class="reuse-form__cnt--wrapper">
                    <label for="Post Title" class="reuse-form__cnt--title">Post Title</label>
                    <div class="reuse-form__cnt--det">
                        <input type="text" name="" id="" class="reuse-form__cnt--det__input reuse-form__cnt--det__input--lg" />
                    </div>
                    {/* {{!-- <div class="reuse-form__err">Pls, Enter a title</div> --}} */}
                </div>
                <div class="reuse-form__cnt--wrapper">
                    <label for="post content" class="reuse-form__cnt--title">Content </label>
                    <div class="reuse-form__cnt--det">
                        <textarea name="" id="" class="reuse-form__cnt--det__info"></textarea>
                    </div>
                    {/* {{!-- <div class="reuse-form__err">Pls, content must not be empty</div> --}} */}
                </div>
                <div class="reuse-form__cnt--wrapper">
                    <div class="reuse-form__cnt--det">
                        <div class="reuse-form__cnt--det__wrapper">
                            <div class="reuse-form__cnt--det__selec reuse-form__cnt--det__selec--add">
                                Add  Items <i class="fas fa-angle-down icon icon__reuse-form--angle"></i>
                                <ul class="reuse-form__cnt--det__selec--opt">
                                    <li class="reuse-form__cnt--det__selec--opt__img">Image</li>
                                    <li class="reuse-form__cnt--det__selec--opt__vid">Video</li>
                                </ul>
                            </div>
                            <div class="reuse-form__cnt--det__selec reuse-form__cnt--det__selec--user">
                                <i class="fas fa-chalkboard-teacher icon icon__reuse-form--cnt__user"></i> Share Users 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="reuse-form__itm reuse-form__itm--img">
                <h4 class="reuse-form__itm--title">Add Image</h4>
                <div class="reuse-form__itm--det">
                    <div class="reuse-form__cnt">
                        <label for="image link" class="reuse-form__cnt--title">Image Link</label>
                        <div class="reuse-form__cnt--det">
                            <input type="text" name="" id="" class="reuse-form__cnt--det__input reuse-form__cnt--det__input--lg" placeholder="paste link" />
                        </div>
                    </div>
                    <div class="reuse-form__itm--det__view"></div>
                    <div class="reuse-form__itm--det__alt">
                        OR
                    </div>
                    <div class="reuse-form__cnt">
                        <div class="reuse-form__cnt--det">
                            <div class="reuse-form__cnt--det__fil">
                                Add files
                                <input type="file" name="" id="" class="reuse-form__cnt--det__fil--input" />
                            </div>
                        </div>
                    </div>
                    <div class="reuse-form__itm--det__view"></div>
                </div>
                <div class="reuse-form__itm--footer reuse-form__btn">
                    <button type="button" class="reuse-form__btn--close">Exit</button>
                    <button type="submit" class="reuse-form__btn--add">Add</button>
                </div>
            </div>
    
            <div class="reuse-form__itm reuse-form__itm--vid">
                <h4 class="reuse-form__itm--title">Add Video</h4>
                <div class="reuse-form__itm--det">
                    <div class="reuse-form__cnt">
                         <label for="image link" class="reuse-form__cnt--title">Video Link</label>
                        <div class="reuse-form__cnt--det">
                            <input type="text" name="" id="" class="reuse-form__cnt--det__input reuse-form__cnt--det__input--lg" placeholder="paste link" />
                        </div>
                    </div>
                    <div class="reuse-form__itm--det__view"></div>
                    <div class="reuse-form__itm--det__alt reuse-form__itm--det__alt--vid">
                        OR
                    </div>
                    <div class="reuse-form__cnt">
                        <div class="reuse-form__cnt--det">
                            <div class="reuse-form__cnt--det__fil">
                                Add Video
                                <input type="file" name="" id="" class="reuse-form__cnt--det__fil--input" />
                            </div>
                        </div>
                    </div>
                    <div class="reuse-form__itm--det__view"></div>
                </div>
                <div class="reuse-form__itm--footer reuse-form__btn">
                    <button type="button" class="reuse-form__btn--close">Exit</button>
                    <button type="submit" class="reuse-form__btn--add">Add</button>
                </div>
            </div>
    
            <div class="reuse-form__itm reuse-form__itm--user">
                <ul class="reuse-form__itm--tab">
                    <li><div></div> Online</li>
                    <li><div></div> Offline</li>
                    <li class="reuse-form__itm--tab__srch"><i class="fas fa-search icon icon__reuse-form--srch"></i></li>
                </ul>
    
                <div class="reuse-form__itm--srch">
                    <div class="reuse-form__itm--srch__close">
                        <i class="fas fa-times"></i>
                    </div>
                    <div class="reuse-form__itm--srch__wrapper">
                        <div><i class="far fa-calendar-alt"></i></div>
                        <input type="text" class="reuse-form__itm--srch__input" placeholder="search..." />
                    </div>
                </div>
                
                <div class="reuse-form__itm--det">
                    <div class="reuse-form__itm--det__user">
                        <div class="reuse-pvt-chat">
                            <div class="active__main active__main--chat-cnt"><div>9</div></div>
                            <div class="reuse-pvt-chat__img">
                                <img src="/" alt="" />
                                <div class="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__off"></div>
                            </div>
                            <ul class="reuse-pvt-chat__det">
                                <li><a href="">User user <span>@ 2m ago</span></a></li>
                                <li><span> Add </span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="reuse-form__itm--det__user">
                        <div class="reuse-pvt-chat">
                            <div class="active__main active__main--chat-cnt"><div>9</div></div>
                            <div class="reuse-pvt-chat__img">
                                <img src="/" alt="" />
                                <div class="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__on"></div>
                            </div>
                            <ul class="reuse-pvt-chat__det">
                                <li><a href="">User user <span>@ 2m ago</span></a></li>
                                <li><span> Add </span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="reuse-form__itm--footer reuse-form__btn">
                    <button type="button" class="reuse-form__btn--close">Exit</button>
                    <button type="submit" class="reuse-form__btn--add">Share</button>
                </div>
            </div>
            
            <div class="reuse-form__footer reuse-form__btn">
                <button type="submit" class="reuse-form__btn--dft"><i class="fas fa-eye-slash icon icon__reuse-form--btn"></i> Draft</button>
                <button type="submit" class="reuse-form__btn--add"><i class="fas fa-plus icon icon__reuse-form--btn"></i> Add</button>
            </div>
        </div>
    </form>
    );
};

export default addPost;