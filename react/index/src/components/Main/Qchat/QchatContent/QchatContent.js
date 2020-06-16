import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import Avatar from 'react-avatar';

import './QchatContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const qchatContent = props => {
    const formatter = buildFormatter(engStrings);
    let userOpt = null;
    let userOptDetClass = ['reuse-onlineque__content--posted__user--det'];
    let userOptClass = ['reuse-onlineque__content--posted__user--det__opt'];
    let title = String(props.cnt.title).length > 149 ? String(props.cnt.title).substr(0, 150) + '...' : props.cnt.title;
    let tooltip = null;
    let userOptMode = (
        <li
           className="reuse-onlineque__content--posted__user--det__opt--status"
           onClick={props.changeCnt}>
            <FontAwesomeIcon 
                icon={['far', 'eye-slash']} 
                className="icon icon__reuse-onlineque--options__dft" />
            Draft
        </li>
    );

    let userImage = <img src={props.cnt.userImage} alt="" />

    if (props.cnt.mode === 'draft') {
      userOptMode = (
        <li
           className="reuse-onlineque__content--posted__user--det__opt--status"
           onClick={props.changeCntPublish}>
            <FontAwesomeIcon 
                icon={['far', 'eye']} 
                className="icon icon__reuse-onlineque--options__dft" />
            Publish
        </li>
      )
    }
    
    if (props.cnt.username && !props.cnt.userImage) {
        userImage = <Avatar  name={props.cnt.username} size='36' round />;
    }

    if (props.showCnt && props.showCnt.visible && props.cnt._id === props.showCnt.id) {
        userOptDetClass.push('reuse-onlineque__content--posted__user--det__clk ');
        userOptClass.push('reuse-onlineque__content--posted__user--det__opt--visible')
    }

    if (props.showTooltip && props.showTooltip.visible && props.cnt._id === props.showTooltip.id) {
        tooltip = (
            <ul className="reuse-onlineque__footer--tooltip">
                <li> (1) Add author as friend. <a href={`/user/profile/${props.cnt.authorID}`}>{props.cnt.username}</a></li>
                <li> (2) Chat to request access</li>
            </ul>
        )
    }

    if (props.cnt.userOpt) {
        userOpt = (
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
                 <div className="reuse-onlineque__content--posted__user--det__mid"></div>
                <ul className={userOptClass.join(' ')}>
                    <li>
                        <a href={`/edit/qchat/${props.cnt._id}`}>
                            <FontAwesomeIcon 
                                icon={['far', 'edit']} 
                                className="icon icon__reuse-onlineque--options" />
                            Edit 
                        </a>
                    </li>
                    { userOptMode }
                    <li 
                        onClick={props.deleteCnt}>
                        <FontAwesomeIcon 
                            icon={['far', 'trash-alt']} 
                            className="icon icon__reuse-onlineque--options" />
                        Delete 
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className="reuse-onlineque">
        <ul className="reuse-onlineque__header">
            <li>
                <div className="reuse-onlineque__header--quesNumber">
                    { props.cnt.qchatTotal}
                </div>
                <div className="reuse-onlineque__header--title">
                    { props.cnt.qchatTotal > 1 ? 'Questions' : 'Question'}
                </div>
            </li>
            <li>
                <div className="reuse-onlineque__header--quesTime">
                    <FontAwesomeIcon 
                        icon={['far', 'clock']} 
                        className="icon icon__reuse-onlineque--time" />
                    {`${props.cnt.hour ? props.cnt.hour : 0}hr
                        ${props.cnt.minute ? props.cnt.minute : 0}min
                        ${props.cnt.second ? props.cnt.second : 0}sec `}
                </div>
            </li>
            <li>
                <div className="reuse-share">
                    <div className="reuse-share__icn" onClick={props.share}>
                        <FontAwesomeIcon 
                            icon={['fas', 'location-arrow']} 
                            className="icon icon__reuse-share--icn" />
                    </div> 
                </div>
            </li>
        </ul>
        <div className="reuse-onlineque__content">
            <p className="reuse-onlineque__content--title">
                <a href={`/view/qchat/${props.cnt._id}`}>{ title }</a>
            </p>
            <div className="reuse-onlineque__content--posted">
                <div className="reuse-onlineque__content--posted__user">
                    <div className="reuse-onlineque__content--posted__user--img">
                        { userImage }
                    </div>
                    <span>
                        <a href={`/user/profile/${props.cnt.authorID}`}>{props.cnt.username}</a>
                        @ <TimeAgo date={props.cnt.created} live={false} formatter={formatter}/> 
                    </span>
                    { userOpt }
                </div>
            </div>
        </div>
        <ul className="reuse-onlineque__footer">
            <li>
                <FontAwesomeIcon 
                    icon={['far', 'comment-dots']} 
                    className="icon icon__reuse-onlineque--comment" />
                { transformNumber(props.cnt.comment)}
            </li>
            <li className="reuse-onlineque__footer--exam">
                {props.cnt.access ? ( <span className="reuse-onlineque__footer--exam__start"> Start</span>) : ( 
                <span 
                    className="reuse-onlineque__footer--exam__req"
                    onClick={props.tooltip}> 
                    <FontAwesomeIcon 
                        icon={['fas', 'lock']} 
                        className="icon icon__reuse-onlineque--comment" /> Request 
                </span>
                )}
            </li>
            <li>
                <FontAwesomeIcon 
                    icon={['fas', 'pencil-alt']} 
                    className="icon icon__reuse-onlineque--pen" /> 
                    { transformNumber(props.cnt.write)}
            </li>
        </ul>
        { tooltip }
    </div>
    );
};

export default qchatContent;