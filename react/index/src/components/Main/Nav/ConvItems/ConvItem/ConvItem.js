import React from 'react';

import { transformNumber } from '../../../../../shared/utility';

const convItem = props => {
    let conv = null;
    let userStatus = <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__on"></div>;
    let pvtUserOptDetClass= ['reuse-pvt-chat__opt'];
    let pvtUserOptClass= ['reuse-pvt-chat__opt--det'];
    let grpUserOptDetClass= ['reuse-grp-chat__opt'];
    let grpUserOptClass= ['reuse-grp-chat__opt--det'];

    if (!props.conv.status) {
        userStatus =  <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__off"></div>
    }

    if (props.showConv && props.showConv.visible && props.index === props.showConv.index && props.conv.type === 'pvtChat') {
        pvtUserOptDetClass.push('reuse-pvt-chat__opt--clk');
        pvtUserOptClass.push('reuse-pvt-chat__opt--det__visible')
    }

    if (props.showConv && props.showConv.visible && props.index === props.showConv.index && props.conv.type === 'grpChat') {
        grpUserOptDetClass.push('reuse-grp-chat__opt--clk');
        grpUserOptClass.push('reuse-grp-chat__opt--det__visible')
    }

    if (props.conv.type === 'pvtChat') {
        conv = (
            <div className="reuse-pvt-chat reuse-pvt-chat__nav">
                <div className="active__main active__main--chat-cnt"><div>9</div></div>
                <div className="reuse-pvt-chat__img">
                    <img src={ props.conv.userImage } alt="" />
                    { userStatus }
                </div>
                <ul className="reuse-pvt-chat__det">
                    <li><a href="/">{ props.conv.user } <span>@ { props.conv.convCreated }</span></a></li>
                    <li><a href="/">{ props.conv.lastMsg }</a></li>
                </ul>
                <div className={pvtUserOptDetClass.join(' ')} onClick={props.userOpt}>
                    <div className="reuse-pvt-chat__opt--mid"></div>
                    <ul className={pvtUserOptClass.join(' ')}>
                        <li><i className="fas fa-eye-slash icon icon__reuse-conv--blk"></i> Block</li>
                        <li><i className="fas fa-trash-alt icon icon__reuse-conv--del"></i> Delete</li>
                    </ul>
                </div>
            </div> 
        );
    }

    if (props.conv.type === 'grpChat') {
        conv = (
            <div className="reuse-grp-chat reuse-grp-chat__nav">
                <div className="active__main active__main--chat-cnt"><div>9</div></div>
                <div className="reuse-grp-chat__img"><img src={ props.conv.groupImage } alt=""/></div>
                <ul className="reuse-grp-chat__det">
                    <li className="reuse-grp-chat__det--title"><a href="/">{ props.conv.title }</a></li>
                    <li className="reuse-grp-chat__det--last-msg">{ props.conv.lastMsg }</li>
                    <li className="reuse-grp-chat__det--status"><div className="reuse-grp-chat__det--status__on reuse-grp-chat__det--status__on--nav"> online <span>{ transformNumber(props.conv.online) }</span></div> <div className="reuse-grp-chat__det--status__off"> offline <span>{ transformNumber(props.conv.offline) }</span></div> </li>
                </ul>
                <div className={grpUserOptDetClass.join(' ')} onClick={props.userOpt}>
                    <div className="reuse-grp-chat__opt--mid"></div>
                    <ul className={grpUserOptClass.join(' ')}>
                        <li><i className="fas fa-eye-slash icon icon__reuse-conv--blk"></i> Block</li>
                        <li><i className="fas fa-trash-alt icon icon__reuse-conv--del"></i> Delete</li>
                    </ul>
                </div>
            </div>
        );
    }

    return conv;
}

export default convItem;