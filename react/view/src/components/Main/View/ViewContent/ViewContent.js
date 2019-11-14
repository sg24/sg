import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import './ViewContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';
import Aux from '../../../../hoc/Auxs/Aux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteActive from '../../../UI/FavoriteActive/FavoriteActive';

const viewContent = props => {
  return(
    <div className="reuse-view">
        <div className="reuse-view__main">
            <div className="reuse-view__main--header">
                <p className="reuse-view__main--header__title">
                    What is your view about this stuff
                </p> 
                <ul className="reuse-view__main--header__det">
                    <li><i className="far fa-clock icon icon__reuse-view--main__tm"></i> 2m ago</li>
                    <li className="reuse-view__main--header__det--ans">Comments <div>99</div></li>
                    <li><div><i className="far fa-eye icon icon__reuse-view--main__eye"></i></div> 222</li>
                </ul>
            </div>
            <p className="reuse-view__main--cnt">
                the view about stuffs is always very important and this is the reason while this
                post was writen, do you know that the secret is somewhere within this content and 
                that is while it is very important to know the reason while the title is given such
                name, ok well i can discuss it later ,.
            </p>
            <div className="reuse-view__main--det">
                <div className="reuse-view__main--det__edit">
                    <div className="reuse-view__main--det__edit--title"><div><i class="far fa-edit icon icon__reuse-view--main__edit"></i></div> edit</div>
                    <div className="reuse-view__main--det__edit--tm">2m ago</div>
                </div>
                <div className="reuse-view__main--det__user">
                    <div className="reuse-view__main--det__user--img">

                    </div>
                    <ul>
                        <li><a href=""> User User</a></li>
                        <li className="reuse-view__main--det__user--status">
                            {/* {{!-- <div class="reuse-view__main--det__user--status__off"></div> 2m ago --}} */}
                            <div className="reuse-view__main--det__user--status__on"></div> online
                        </li>
                    </ul>
                </div>
            </div>
            <div className="reuse-view__main--footer">
                <div className="reuse-view__main--footer__user-opt">
                    {/* {{> partialshare}} */}
                    <span><i className="far fa-heart icon icon__reuse-view--fav"></i></span>
                </div>
                <a href="/view/#Add-Comment" id="Add-Comment-link" className="reuse-view__main--footer__add"> <i class="fas fa-pencil-alt icon icon__reuse-view--main__add"></i> Add Comment</a>
                <div class="reuse-view__main--footer__user-det">
                    <i className="fas fa-circle icon icon__reuse-view--circle"></i>
                    <i className="fas fa-circle icon icon__reuse-view--circle"></i>
                    <i className="fas fa-circle icon icon__reuse-view--circle"></i>

                    <ul class="reuse-view__main--footer__user-det--opt">
                        <li><a href=""><i className="far fa-edit icon icon__reuse-view--options"></i>Edit </a></li>
                        <li><i class="far fa-eye-slash icon icon__reuse-view--options"></i> Draft</li>
                        <li><a href=""><i className="far fa-trash-alt icon icon__reuse-view--options"></i>Delete </a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="reuse-view__comments">
            <div className="reuse-view__comments--header">
                <p className="reuse-view__comments--header__ans">Comment Section <a href="" class="reuse-view__comments--header__ask">Add Post</a></p>
            </div> 
            <div className="reuse-view__comments--wrapper">
                <div className="reuse-view__comments--wrapper__overlay">
                </div>  
                <div className="reuse-view__comments--box">
                    <ul className="reuse-view__comments--box__header">
                        <li>
                            <div className="reuse-view__comments--box__header--img">
                                <img src="" alt=""/>
                            </div>
                            <div className="reuse-view__comments--box__header--det">
                                <div><a href="" className="reuse-view__comments--box__header--det__title">User user</a></div>
                                {/* {{!-- <div className="reuse-view__comments--box__header--det__status">
                                    <div className="reuse-view__comments--box__header--det__status--off"></div>
                                    <span>2m ago</span>
                                </div> --}} */}
                                <div className="reuse-view__comments--box__header--det__status">
                                    <div className="reuse-view__comments--box__header--det__status--on"></div>
                                    <span>online</span>
                                </div>
                            </div>
                        </li>
                        <li className="reuse-view__comments--box__header--soln"> Added <span class="reuse-view__comments--box__header--soln__time"><i class="far fa-clock"></i> 2hrs ago</span></li>
                    </ul>
                    <p className="reuse-view__comments--box__content">
                        the solution to the question is not that difficult, when i tried to check the question
                        i saw the answer immediately so very very simple question, the answer is ...
                        <span className="reuse-view__comments--box__content--chats"><i class="far fa-comments icon icon__reuse-view--comments__chats"></i> <span class="reuse-view__comments--box__content--chats__title">chats</span></span>
                    </p>
                    <div className="reuse-view__comments--box__footer">
                        <div className="reuse-view__comments--box__footer--user-opt">
                            {/* {{> partialshare}} */}
                            <span><i className="far fa-heart icon icon__reuse-view--fav"></i></span>
                            <span className="reuse-view__comments--box__footer--user-opt__reply"><i class="fas fa-reply con icon__reuse-view--comments__reply"></i></span>
                        </div>
                        <div className="reuse-view__comments--box__footer--user-like">
                            <span><i className="far fa-thumbs-up icon icon__reuse-view--comments__like"></i></span>
                            <div class="reuse-view__comments--box__footer--user-like__total">99</div>
                        </div>
                        <div className="reuse-view__comments--box__footer--user-det">
                            <i className="fas fa-circle icon icon__reuse-view--circle"></i>
                            <i className="fas fa-circle icon icon__reuse-view--circle"></i>
                            <i className="fas fa-circle icon icon__reuse-view--circle"></i>

                            <ul className="reuse-view__comments--box__footer--user-det__opt">
                                <li><a href=""><i className="far fa-edit icon icon__reuse-view--options"></i>Edit </a></li>
                                <li><a href=""><i className="far fa-trash-alt icon icon__reuse-view--options"></i>Delete </a></li>
                            </ul>
                        </div>
                    </div>
                    {/* {{> partialreply}} */}
                </div>

                <div className="reuse-view__comments--box__reply-wrapper">
                    <div className="reuse-view__comments--box reuse-view__comments--box__reply-cnt">
                        <div className="reuse-view__comments--box__reply-cnt--header">
                            <i className="fas fa-angle-double-down icon icon__reuse-view--comments__arrow"></i>
                                reply
                            <i className="fas fa-angle-double-down icon icon__reuse-view--comments__arrow"></i>
                        </div>
                        <ul className="reuse-view__comments--box__header">
                            <li>
                                <div className="reuse-view__comments--box__header--img">
                                    <img src="" alt=""/>
                                </div>
                                <div className="reuse-view__comments--box__header--det">
                                    <div><a href="" class="reuse-view__comments--box__header--det__title">User user</a></div>
                                    {/* {{!-- <div class="reuse-view__comments--box__header--det__status">
                                        <div className="reuse-view__comments--box__header--det__status--off"></div>
                                        <span>2m ago</span>
                                    </div> --}} */}
                                    <div className="reuse-view__comments--box__header--det__status">
                                        <div className="reuse-view__comments--box__header--det__status--on"></div>
                                        <span>online</span>
                                    </div>
                                </div>
                            </li>
                            <li className="reuse-view__comments--box__header--soln"> Added <span class="reuse-view__comments--box__header--soln__time"><i class="far fa-clock"></i> 2hrs ago</span></li>
                        </ul>
                        <p className="reuse-view__comments--box__content">
                            the solution to the question is not that difficult, when i tried to check the question
                            i saw the answer immediately so very very simple question, the answer is ...
                            <span class="reuse-view__comments--box__content--chats"><i class="far fa-comments icon icon__reuse-view--comments__chats"></i> <span class="reuse-view__comments--box__content--chats__title">chats</span></span>
                        </p>
                        <div className="reuse-view__comments--box__footer">
                            <div className="reuse-view__comments--box__footer--user-opt">
                                {/* {{> partialshare}} */}
                                <span><i class="far fa-heart icon icon__reuse-view--fav"></i></span>
                                <span class="reuse-view__comments--box__footer--user-opt__reply"><i class="fas fa-reply icon icon__reuse-view--comments__reply"></i></span>
                            </div>
                            <div className="reuse-view__comments--box__footer--user-like">
                                <span><i className="far fa-thumbs-up icon icon__reuse-view--comments__like"></i></span>
                                <div className="reuse-view__comments--box__footer--user-like__total">99</div>
                            </div>
                            <div className="reuse-view__comments--box__footer--user-det">
                                <i className="fas fa-circle icon icon__reuse-view--circle"></i>
                                <i className="fas fa-circle icon icon__reuse-view--circle"></i>
                                <i className="fas fa-circle icon icon__reuse-view--circle"></i>

                                <ul className="reuse-view__comments--box__footer--user-det__opt">
                                    <li><a href=""><i className="far fa-edit icon icon__reuse-view--options"></i>Edit </a></li>
                                    <li><a href=""><i className="far fa-trash-alt icon icon__reuse-view--options"></i>Delete </a></li>
                                </ul>
                            </div>
                        </div>
                        {/* {{> partialreply}} */}
                    </div>
                </div> 

            </div>
        </div>

            {/* {{!-- <div className="viewall__tips">
                <h3 class="viewall__tips--title">
                    Tips
                </h3>
                <h4 className="viewall__tips--subtitle">Not satisfied with the solution</h4>
                <ul>
                    <li>Check <span>chats</span> for related question and answers or chat to ask question inside the chats</li>
                    <li>For Items released by the teacher, click the teacher image or name for options</li>
                </ul>
                <p className="viewall__tips--note"><span> Notes</span> No direct chats </p>
                <p className="viewall__tips--note__details">All question should be asked by clicking <span><i class="fas fa-reply"></i> reply </span> or <span><i class="fas fa-comments"></i> chats</span> </p>
            </div> --}} */}

        <div className="reuse-view__form">
            <p className="reuse-view__form--header"><i className="fas fa-pen-square icon icon__reuse-view--form__pen"></i> Add Comment</p>
            <form action="" className="reuse-view__form--field">
                <textarea className="reuse-view__form--field__textarea" name="editor" id="Add-Comment" data-matching-link="#Add-Comment-link"></textarea>
                <button type="button"><i className="fas fa-plus-circle icon icon__reuse-view--form__add"></i>   Submit</button>
            </form>
        </div>
    </div>
    );
};

export default viewContent;