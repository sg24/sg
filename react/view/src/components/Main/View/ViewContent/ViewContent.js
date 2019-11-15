import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import draftToHtml from 'draftjs-to-html';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from "draft-js-export-html";

import './ViewContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';
import Aux from '../../../../hoc/Auxs/Aux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteActive from '../../../UI/FavoriteActive/FavoriteActive';

const viewContent = props => {
const formatter = buildFormatter(engStrings);
const HtmlContent = draftToHtml(JSON.parse(props.cnt.desc));
let temp = document.createElement('div');
temp.innerHTML = HtmlContent;
let htmlObject = temp.firstChild
// console.log(htmlObject)
let raw = convertFromRaw(JSON.parse(props.cnt.desc));
let desc = stateToHTML(raw);  

  return(
    <div className="reuse-view">
        <div className="reuse-view__main">
            <div className="reuse-view__main--header">
                <p className="reuse-view__main--header__title">
                    {props.cnt.title}
                </p> 
                <ul className="reuse-view__main--header__det">
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'clock']} 
                            className="icon icon__reuse-view--main__tm" />
                        {<TimeAgo date={props.cnt.postCreated} live={false} formatter={formatter}/>}
                    </li>
                    <li className="reuse-view__main--header__det--ans">Comments <div>{ props.cnt.comment}</div></li>
                    <li>
                        <div>
                            <FontAwesomeIcon 
                                icon={['far', 'eye']} 
                                className="icon icon__reuse-view--main__eye" />
                        </div> 
                        { props.cnt.view }
                    </li>
                </ul>
            </div>
            <p 
                className="reuse-view__main--cnt" 
                dangerouslySetInnerHTML={{
                    __html: desc
                }}>
                {/* {temp} */}
            </p>
            <div className="reuse-view__main--det">
                <div className="reuse-view__main--det__edit">
                    <div className="reuse-view__main--det__edit--title">
                        <div>
                            <FontAwesomeIcon 
                                icon={['far', 'edit']} 
                                className="icon icon__reuse-view--main__edit" />
                        </div> 
                        edit
                    </div>
                    <div className="reuse-view__main--det__edit--tm">2m ago</div>
                </div>
                <div className="reuse-view__main--det__user">
                    <div className="reuse-view__main--det__user--img">

                    </div>
                    <ul>
                        <li><a href="/"> User User</a></li>
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
                    <span>
                        <FontAwesomeIcon 
                            icon={['far', 'heart']} 
                            className="icon icon__reuse-view--fav" />
                    </span>
                </div>
                <a href="/view/#Add-Comment" id="Add-Comment-link" className="reuse-view__main--footer__add"> 
                    <FontAwesomeIcon 
                        icon={['fas', 'pencil-alt']} 
                        className="icon icon__reuse-view--main__add" />
                    Add Comment
                </a>
                <div className="reuse-view__main--footer__user-det">
                    <FontAwesomeIcon 
                        icon={['fas', 'circle']} 
                        className="icon icon__reuse-view--circle" />
                    <FontAwesomeIcon 
                        icon={['fas', 'circle']} 
                        className="icon icon__reuse-view--circle" />
                    <FontAwesomeIcon 
                        icon={['fas', 'circle']} 
                        className="icon icon__reuse-view--circle" />
                    <ul className="reuse-view__main--footer__user-det--opt">
                        <li>
                            <a href="/">
                                <FontAwesomeIcon 
                                    icon={['far', 'edit']} 
                                    className="icon icon__reuse-view--options" />
                                Edit 
                            </a>
                        </li>
                        <li> 
                            <FontAwesomeIcon 
                                icon={['far', 'eye-slash']} 
                                className="icon icon__reuse-view--options" />
                            Draft
                        </li>
                        <li>
                            <a href="/">
                                <FontAwesomeIcon 
                                    icon={['far', 'trash-alt']} 
                                    className="icon icon__reuse-view--options" />
                                Delete 
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="reuse-view__comments">
            <div className="reuse-view__comments--header">
                <p className="reuse-view__comments--header__ans">Comment Section 
                    <a href="/" className="reuse-view__comments--header__ask">Add Post</a>
                </p>
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
                                <div><a href="/" className="reuse-view__comments--box__header--det__title">User user</a></div>
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
                        <li className="reuse-view__comments--box__header--soln"> Added 
                            <span className="reuse-view__comments--box__header--soln__time">
                                <FontAwesomeIcon 
                                    icon={['far', 'clock']}/>
                                2hrs ago
                            </span>
                        </li>
                    </ul>
                    <p className="reuse-view__comments--box__content">
                        the solution to the question is not that difficult, when i tried to check the question
                        i saw the answer immediately so very very simple question, the answer is ...
                        <span className="reuse-view__comments--box__content--chats">
                            <FontAwesomeIcon 
                                icon={['far', 'comments']} 
                                className="icon icon__reuse-view--comments__chats" /> 
                        <span className="reuse-view__comments--box__content--chats__title">chats</span></span>
                    </p>
                    <div className="reuse-view__comments--box__footer">
                        <div className="reuse-view__comments--box__footer--user-opt">
                            {/* {{> partialshare}} */}
                            <span>
                                <FontAwesomeIcon 
                                    icon={['far', 'heart']} 
                                    className="icon icon__reuse-view--fav" />
                            </span>
                            <span className="reuse-view__comments--box__footer--user-opt__reply">
                                <FontAwesomeIcon 
                                    icon={['fas', 'reply']} 
                                    className="icon icon__reuse-view--comments__reply" /> 
                            </span>
                        </div>
                        <div className="reuse-view__comments--box__footer--user-like">
                            <span>
                                <FontAwesomeIcon 
                                    icon={['far', 'thumbs-up']} 
                                    className="icon icon__reuse-view--comments__like" />
                            </span>
                            <div className="reuse-view__comments--box__footer--user-like__total">99</div>
                        </div>
                        <div className="reuse-view__comments--box__footer--user-det">
                            <FontAwesomeIcon 
                                icon={['fas', 'circle']} 
                                className="icon icon__reuse-view--circle" />
                            <FontAwesomeIcon 
                                icon={['fas', 'circle']} 
                                className="icon icon__reuse-view--circle" />
                            <FontAwesomeIcon 
                                icon={['fas', 'circle']} 
                                className="icon icon__reuse-view--circle" />
                            <ul className="reuse-view__comments--box__footer--user-det__opt">
                                <li>
                                    <a href="/">
                                        <FontAwesomeIcon 
                                            icon={['far', 'edit']} 
                                            className="icon icon__reuse-view--options" />
                                        Edit 
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <FontAwesomeIcon 
                                            icon={['far', 'trash-alt']} 
                                            className="icon icon__reuse-view--options" />
                                        Delete 
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* {{> partialreply}} */}
                </div>

                <div className="reuse-view__comments--box__reply-wrapper">
                    <div className="reuse-view__comments--box reuse-view__comments--box__reply-cnt">
                        <div className="reuse-view__comments--box__reply-cnt--header">
                            <FontAwesomeIcon 
                                icon={['fas', 'angle-double-down']} 
                                className="icon icon__reuse-view--comments__arrow" />
                                reply
                            <FontAwesomeIcon 
                                icon={['fas', 'angle-double-down']} 
                                className="icon icon__reuse-view--comments__arrow" />
                        </div>
                        <ul className="reuse-view__comments--box__header">
                            <li>
                                <div className="reuse-view__comments--box__header--img">
                                    <img src="" alt=""/>
                                </div>
                                <div className="reuse-view__comments--box__header--det">
                                    <div><a href="/" className="reuse-view__comments--box__header--det__title">User user</a></div>
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
                            <li className="reuse-view__comments--box__header--soln"> Added <span className="reuse-view__comments--box__header--soln__time">
                                <FontAwesomeIcon 
                                    icon={['far', 'clock']} /> 
                                2hrs ago
                                </span>
                            </li>
                        </ul>
                        <p className="reuse-view__comments--box__content">
                            the solution to the question is not that difficult, when i tried to check the question
                            i saw the answer immediately so very very simple question, the answer is ...
                            <span className="reuse-view__comments--box__content--chats">
                                <FontAwesomeIcon 
                                    icon={['far', 'comments']} 
                                    className="icon icon__reuse-view--comments__chats" /> 
                            <span className="reuse-view__comments--box__content--chats__title">chats</span></span>
                        </p>
                        <div className="reuse-view__comments--box__footer">
                            <div className="reuse-view__comments--box__footer--user-opt">
                                {/* {{> partialshare}} */}
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['far', 'heart']} 
                                        className="icon icon__reuse-view--fav" /> 
                                </span>
                                <span className="reuse-view__comments--box__footer--user-opt__reply">
                                    <FontAwesomeIcon 
                                        icon={['fas', 'reply']} 
                                        className="icon icon__reuse-view--comments__reply" /> 
                                </span>
                            </div>
                            <div className="reuse-view__comments--box__footer--user-like">
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['far', 'thumbs-up']} 
                                        className="icon icon__reuse-view--comments__like" />     
                                </span>
                                <div className="reuse-view__comments--box__footer--user-like__total">99</div>
                            </div>
                            <div className="reuse-view__comments--box__footer--user-det">
                                <FontAwesomeIcon 
                                    icon={['fas', 'circle']} 
                                    className="icon icon__reuse-view--circle" /> 
                                <FontAwesomeIcon 
                                    icon={['fas', 'circle']} 
                                    className="icon icon__reuse-view--circle" /> 
                                <FontAwesomeIcon 
                                    icon={['fas', 'circle']} 
                                    className="icon icon__reuse-view--circle" /> 

                                <ul className="reuse-view__comments--box__footer--user-det__opt">
                                    <li>
                                        <a href="/">
                                            <FontAwesomeIcon 
                                                icon={['far', 'edit']} 
                                                className="icon icon__reuse-view--options" /> 
                                            Edit 
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <FontAwesomeIcon 
                                                icon={['far', 'trash-alt']} 
                                                className="icon icon__reuse-view--options" /> 
                                            Delete 
                                        </a>
                                    </li>
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
            <p className="reuse-view__form--header">
                <FontAwesomeIcon 
                    icon={['fas', 'pen-square']} 
                    className="icon icon__reuse-view--form__pen" />  
                Add Comment
            </p>
            <form action="" className="reuse-view__form--field">
                <textarea className="reuse-view__form--field__textarea" name="editor" id="Add-Comment" data-matching-link="#Add-Comment-link"></textarea>
                <button type="button">
                    <FontAwesomeIcon 
                        icon={['fas', 'plus-circle']} 
                        className="icon icon__reuse-view--form__add" />   
                    Submit
                </button>
            </form>
        </div>
    </div>
    );
};

export default viewContent;