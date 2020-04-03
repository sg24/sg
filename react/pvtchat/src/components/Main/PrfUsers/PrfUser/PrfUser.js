import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import { transformNumber, engStrings } from '../../../../shared/utility';
import './PrfUser.css';

const prfUser = props => {
    const formatter = buildFormatter(engStrings);
    let expertise = [...props.cnt.subjectpoet,...props.cnt.subjectpost, ...props.cnt.subjectque].map((exp, index) => (
        <li key={index}>{exp}</li>
    ))
    let userImage = <img src={props.cnt.image} alt=""/>
    let status = (
        <div className="reuse-prf__user--img__status--wrapper">
            <div className="reuse-prf__user--img__status--off"></div>
            <span>{ <TimeAgo date={props.cnt.offline} live={false} formatter={formatter}/> }</span>
        </div>
    )
    let edit = null;
    let editCnt = props.cnt.about && !props.updateDet ? props.cnt.about : props.updateDet ? props.updateDet : '';
    
    let userOpt = (
        <ul className="reuse-prf__user--det__opt">
            <li 
                className="reuse-prf__user--det__opt--add"
                onClick={props.addUser}>
                <div>
                    <FontAwesomeIcon 
                        icon={['fas', 'plus']} 
                        className="icon icon__reuse-prf--add" /> 
                </div> 
                Add 
            </li>
            {/* <li 
                className="reuse-prf__user--det__opt--add"
                onClick={props.blockUser}>
                <div>
                    <FontAwesomeIcon 
                        icon={['fas', 'eye-slash']}/> 
                </div> 
                Block
            </li> */}
        </ul>
    );


    if (props.cnt.status) {
        status = (
            <div className="reuse-prf__user--img__status--wrapper">
                <div className="reuse-prf__user--img__status--on"></div>
                <span>online</span>
            </div>
        )
    }
 
    if (props.cnt.username && !props.cnt.image) {
        userImage = <Avatar  name={props.cnt.username} size='100'/>;
    }

    if (props.cnt.request) {
        userOpt = (
            <ul className="reuse-prf__user--det__opt">
                <li 
                    className="reuse-prf__user--det__opt--add"
                    onClick={props.acceptUser}>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'user']} 
                            className="icon icon__reuse-prf--add" /> 
                    </div> 
                    Accept
                </li>
                <li 
                    className="reuse-prf__user--det__opt--add"
                    onClick={props.rejUser}>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'user-slash']} 
                            className="icon icon__reuse-prf--cancel" /> 
                    </div> 
                    Reject
                </li>
            </ul>
        );
    }

    if (props.cnt.pending) {
        userOpt = (
            <ul className="reuse-prf__user--det__opt">
                <li 
                    className="reuse-prf__user--det__opt--add"
                    onClick={props.cancelReq}>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'times']} 
                            className="icon icon__reuse-prf--cancel" /> 
                    </div> 
                    Cancel
                </li>
                {/* <li 
                    className="reuse-prf__user--det__opt--add"
                    onClick={props.blockUser}>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'eye-slash']} /> 
                    </div> 
                    Block
                </li> */}
            </ul>
        );
    }

    if (props.cnt.accept) {
        userOpt = (
            <ul className="reuse-prf__user--det__opt">
                 {/* <li className="reuse-prf__user--det__opt--chat">
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'comment-alt']} 
                            className="icon icon__reuse-prf--comment" />
                    </div> 
                    Chat
                </li> */}
                <li 
                    className="reuse-prf__user--det__opt--add"
                    onClick={props.unfriend}>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'user-slash']} 
                            className="icon icon__reuse-prf--cancel" /> 
                    </div> 
                    Unfriend 
                </li>
            </ul>
        );
    }

    if (props.cnt.edit) {
        edit = (
            <button
                onClick={props.editProfile}
                className="reuse-prf__about--cnt__button reuse-prf__about--cnt__edit"
                type="button">
                <FontAwesomeIcon 
                    icon={['fas', 'edit']} 
                    className="icon icon__reuse-prf--edit" /> 
                Edit
            </button>
        )
        userOpt = (
            <ul className="reuse-prf__user--det__opt">
                <li 
                    className="reuse-prf__user--det__opt--add"
                    onClick={props.changeImage}>
                    <div>
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} 
                            className="icon icon__reuse-prf--cancel" /> 
                    </div> 
                    Change Image
                </li>
            </ul>
        )
    }

    if (props.editEnable) {
        editCnt = (
            <div className="reuse-prf__about--cnt__editor">
                <textarea 
                    className="reuse-prf__about--cnt__input"
                    placeholder="Short description ...."
                    onChange={props.inputChanged}
                    value={props.value}></textarea>
                <button
                    onClick={props.editProfile}
                    className="reuse-prf__about--cnt__button reuse-prf__about--cnt__cancel"
                    type="button"
                    disabled={props.start}>
                    <FontAwesomeIcon 
                        icon={['fas', 'times']} 
                        className="icon icon__reuse-prf--edit" /> 
                    Cancel
                </button>
                <button
                    onClick={props.saveProfile}
                    className="reuse-prf__about--cnt__button reuse-prf__about--cnt__save"
                    type="button"
                    disabled={props.start || !props.saveEnable}>
                    {props.start ? 'Saving ...' : 'Save'}
                </button>
            </div>
        );
        edit = null
    }

    return (
        <div className="reuse-prf">
            <div className="reuse-prf__user">
                <div className="reuse-prf__user--img">
                    <div className="reuse-prf__user--img__wrapper">
                        { userImage }
                    </div>
                    <div className="reuse-prf__user--img__status">
                        { status }
                    </div>
                </div>
                <div className="reuse-prf__user--det">
                    <div className="reuse-prf__user--det__name">{ props.cnt.username }</div>
                    <ul className="reuse-prf__user--det__exp">
                        <li>Expertise : </li>
                        { expertise }
                    </ul>
                    { userOpt }
                </div>
            </div>
            <div className="reuse-prf__about">
                <span className="reuse-prf__about--title">
                About Me
                </span>
                <div className="reuse-prf__about--cnt">
                    { editCnt }
                    { edit }
                </div>
            </div>
            {/* {{!-- <ul className="reuse-prf__tab">
                <li>Details</li>
                <li><div><i className="fas fa-store icon icon__reuse-prf--tab"></i></div> Reviews</li>
            </ul> --}} */}
            <div className="reuse-prf__outlet">
                <div className="reuse-prf__det">
                    <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'user']} 
                                className="icon icon__reuse-prf--user" />    
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__sntaccept"> 
                                Students  <span>{ props.cnt.studenttotal }</span></li>
                            {/* <li className="reuse-prf__det--cnt__sntreject"> Student Rejected <span>0</span></li> */}
                        </ul>
                    </div>
                    {/* <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'coffee']} 
                                className="icon icon__reuse-prf--onlineque" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__onlineque"> Online Questions <span>222K</span></li>
                        </ul>
                    </div> */}
                    {/* <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'edit']} 
                                className="icon icon__reuse-prf--que" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__que"> Questions Answered <span>222K</span></li>
                        </ul>
                    </div> */}
                    <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'clone']} 
                                className="icon icon__reuse-prf--pt" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__pt"> Post Published <span>{ transformNumber(props.cnt.postpub) }</span></li>
                        </ul>
                    </div>
                    <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'book']} 
                                className="icon icon__reuse-prf--que" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__pt"> Poets published <span>{ transformNumber(props.cnt.pwtpub) }</span></li>
                        </ul>
                    </div>
                    {/* <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'users']} 
                                className="icon icon__reuse-prf--grp" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__grp"> Groups <span>222K</span></li>
                        </ul>
                    </div> */}
                    <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn reuse-prf__det--icn__itm">
                            <FontAwesomeIcon 
                                icon={['fas', 'edit']} 
                                className="icon icon__reuse-prf--itm" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__itm">  Questions Answered <span>{ transformNumber(props.cnt.comment) }</span></li>
                        </ul>
                    </div>
                    {/* <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn reuse-prf__det--icn__itm">
                            <FontAwesomeIcon 
                                icon={['fas', 'store']} 
                                className="icon icon__reuse-prf--itm" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__itm"> Items in stock <span>222K</span></li>
                        </ul>
                    </div> */}
                </div>
                <div className="reuse-prf__rev">
                    <div className="reuse-prf__rev--wrapper">
                        <div className="reuse-prf__rev--img">
                            
                        </div>
                        <div className="reuse-prf__rev--name">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default prfUser;