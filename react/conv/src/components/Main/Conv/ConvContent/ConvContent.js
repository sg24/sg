import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Avatar from 'react-avatar';

import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';

const convContent = props => {
    const formatter = buildFormatter(engStrings);
    let pvtImg =  <img src={props.conv.userImage} alt=""/>
    let pvtStatus = <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__off"></div> 
    if(props.conv.username && !props.conv.userImage) {
        pvtImg = <Avatar  name={props.conv.username} size='50' round />;
    }

    if (props.conv.status) {
        pvtStatus = <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__on"></div>
    }
    let pvtActive = null;

    if (props.conv.active && (props.conv.active > 0)){
        pvtActive = <div className="active__main active__main--chat-cnt"><div>{props.conv.active}</div></div>
    }

    let grpImg =  <Avatar  name={props.conv.title} size='50' round />;

    if(props.conv.image && props.conv.image.length > 0) {
        grpImg = <img src={`${window.location.protocol + '//' + window.location.host}/media/image/${props.conv.image[0].id}`} alt="group" />
    }

    let cnt =  (
        <div className="reuse-grp-chat reuse-grp-chat__conv">
            { pvtActive }
            <div className="reuse-grp-chat__img">
                { grpImg }
            </div>
            <ul className="reuse-grp-chat__det">
                <li className="reuse-grp-chat__det--title"><a href={`/chat/group/${props.conv._id}`}>{ props.conv.title }</a></li>
                <li className="reuse-grp-chat__det--last-msg">{ props.conv.msg ? props.conv.msg : '...'}</li>
                <li className="reuse-grp-chat__det--status"><div className="reuse-grp-chat__det--status__on"> online <span>{ transformNumber(props.conv.online) }</span></div> <div className="reuse-grp-chat__det--status__off"> offline <span>{ transformNumber(props.conv.offline)}</span></div> </li>
            </ul>
            {/* <div className="reuse-grp-chat__opt">
                <div className="reuse-grp-chat__opt--mid"></div>
                <ul className="reuse-grp-chat__opt--det">
                    <li> 
                        <FontAwesomeIcon 
                            icon={['fas', 'eye-slash']} className="icon__reuse-conv--blk" />
                        Block
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'trash-alt']} className="icon icon__reuse-conv--del" />
                        Delete
                    </li>
                </ul>
            </div> */}
        </div>
    )
    if (props.curTab === 'private') {
        cnt = (
            <div className="reuse-pvt-chat reuse-pvt-chat__conv">
                { pvtActive}
                <div className="reuse-pvt-chat__img">
                   { pvtImg }
                    { pvtStatus }
                </div>
                <ul className="reuse-pvt-chat__det">
                    <li><a href={`/chat/user/${ props.conv._id}`}> { props.conv.username } <span> @ { <TimeAgo date={props.conv.created} live={false} formatter={formatter} />}</span></a></li>
                    <li className="reuse-pvt-chat__det--msg"><a href={`/chat/user/${ props.conv._id}`}>{ props.conv.msg ? props.conv.msg : '...'}</a></li>
                </ul>
                {/* <div className="reuse-pvt-chat__opt">
                    <div className="reuse-pvt-chat__opt--mid"></div>
                    <ul className="reuse-pvt-chat__opt--det">
                    <li> 
                        <FontAwesomeIcon 
                            icon={['fas', 'eye-slash']} className="icon__reuse-conv--blk" />
                        Block
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'trash-alt']} className="icon icon__reuse-conv--del" />
                        Delete
                    </li>
                    </ul>
                </div> */}
            </div>
        )
    }

    return cnt;
 };

export default convContent;