import React from 'react';
import Moment from 'react-moment';
import Avatar from 'react-avatar';

import './GroupContent.css';
import { transformNumber } from '../../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const groupContent = props => {
    let userClass = ['reuse-group__wrapper'];
    let userSelectClass = ['reuse-user__det--select'];

    let groupImage = <Avatar  name={props.cnt.title} size='60' round />;
    if (props.cnt.image && props.cnt.image.length > 0) {
        groupImage = <img src={`${window.location.protocol + '//' + window.location.host}/media/image/${props.cnt.image[0].id}`} alt="group" />
    }
    if (props.selectedGroup.length > 0) {
        for (let groupID of props.selectedGroup) {
            if (groupID === props.cnt.id) {
                userClass.push('reuse-user__det--clk');
                userSelectClass.push('reuse-user__det--select__clk > svg')
            }
        }
    }

    return (
        <div 
            className="reuse-group"
            onClick={props.selected}>
            <div className={userClass.join(' ')}>
                <div className="reuse-group__cnt">
                    <div className="reuse-group__cnt--img">
                        { groupImage }
                    </div>
                    <div className="reuse-group__cnt--desc">
                        <div className="reuse-group__cnt--desc__title">
                            { props.cnt.title }
                        </div>
                        <div className="reuse-group__cnt--desc__categ">
                            <div className="reuse-group__cnt--desc__categ--icn">
                                <FontAwesomeIcon 
                                    icon={['fas', 'tag']}
                                    className="icon icon__reuse-group--desc__tag" />
                            </div> 
                            { props.cnt.groupMode }
                        </div>
                    </div>
                </div>
                <div className={userSelectClass.join(' ')}>
                    <FontAwesomeIcon
                        icon={['fas', 'check-circle']} />
                </div>
            </div>
        </div>
    )
};

export default groupContent;