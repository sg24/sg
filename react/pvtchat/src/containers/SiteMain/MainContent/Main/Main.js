import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import Avatar from 'react-avatar';

import './Main.css';
import { transformNumber, engStrings } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';

class Main extends Component {
    state = {
        id: this.props.match.params.id,
        categ: this.props.match.params.categ
    }

    showUserOptHandler = () => {
        this.props.onShowBackdrop()
    }

    searchChatHandler = () => {
        this.props.onCloseBackdrop();
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}?id=search`);
    }

    groupListHandler = () => {
        this.props.onCloseBackdrop();
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}?id=groups`);
    };

    profileHandler = () => {
        this.props.onCloseBackdrop();
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}?id=profile`);
    };

    showMemberHandler = () => {
        this.props.onCloseBackdrop();
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}?id=friends`);
    };

    convHandler = () => {
        this.props.onCloseBackdrop();
        this.props.onShowNav()
    };

    render() {
        const formatter = buildFormatter(engStrings);
        let userImage = <Avatar  name={this.props.cnt.username} size='50' round />
        let userOpt = null
        let status = <div className="site-main__chat--header__status"></div>
        if (this.props.cnt.image && this.props.cnt.image.length > 0) {
            userImage = <img src={this.props.cnt.image} alt="group" />
        }
        let userStatusIcn = null;

        let userStatus = (
            <div className="site-main__chat--header__det--status site-main__chat--header__det--status__off">
                 @ <TimeAgo date={this.props.cnt.offline} live={true} formatter={formatter}/>
            </div> 
        )

        if (!this.props.cnt.status) {
            userStatusIcn = (
                <div className="site-main__chat--header__img--status">
                </div>
            )
        }

        if (this.props.users) {
            for (let user of this.props.users) {
                if ((user.id === this.props.cnt._id)) {
                    if (user.status) {
                        userStatus = (
                            <div className="site-main__chat--header__det--status site-main__chat--header__det--status__on">
                                <div></div> online
                            </div>
                        )
                        userStatusIcn = null;
                    } else {
                        userStatusIcn = (
                            <div className="site-main__chat--header__img--status">
                            </div>
                        )
                    }
                }
            }
        }

        if (this.props.connect) {
            status = (
                <div className="site-main__chat--header__status site-main__chat--header__status-on"></div>
            )
        }
        
        let header = (
            <>
                <div className="site-main__chat--header__img">
                    { userImage }
                    { userStatusIcn }
                </div>
                <h3 className="site-main__chat--header__title">
                    { this.props.cnt.username }
                </h3>
                <div className="site-main__chat--header__det">
                    <div className="site-main__chat--header__det--status site-main__chat--header__det--status__on">
                        { this.props.cnt.lastMsg }
                    </div>
                    { userStatus }
                    <div 
                        className="site-main__chat--header__det--cnt site-main__chat--header__det--cnt__prf"
                        onClick={this.profileHandler}>
                        Profile
                    </div>
                    <div className="site-main__chat--header__det--users site-main__chat--header__det--users__pvt">
                        <div className="site-main__chat--header__det--users__icn"><FontAwesomeIcon  icon={['fas', 'user-friends']} className="icon icon__site-main--chat__header--user"/></div>
                        <span>{ transformNumber(this.props.cnt.studenttotal)}</span>
                    </div>
                </div>  
            </>
        );

        let  footerOpt = (
            <li 
                className="site-main__chat--header__user-opt--list__prf"
                onClick={this.profileHandler}>Profile</li>
        )

        if (this.props.userBackdrop) {
            userOpt = (
                <ul className="site-main__chat--header__user-opt--list">
                    <li 
                        className="site-main__chat--header__user-opt--list__srch"
                        onClick={this.searchChatHandler}> Search Chat </li>
                    <li 
                        className="site-main__chat--header__user-opt--list__grp"
                        onClick={this.groupListHandler}> 
                        Groups <FontAwesomeIcon  icon={['fas', 'caret-right']} className="icon icon__site-main--chat__header--angle"/>
                        { this.props.groupNotify > 0 ?
                            <div className="active__main active__main--chat-tab"><div>{this.props.groupNotify}</div></div> : null}    
                    </li>
                    {/* <li className="site-main__chat--header__user-opt--list__chat"> Conversation <FontAwesomeIcon  icon={['fas', 'caret-right']} className="icon icon__site-main--chat__header--angle"/></li> */}
                    <li 
                        className="site-main__chat--header__user-opt--list__srch-user"
                        onClick={this.showMemberHandler}> 
                        Friends <FontAwesomeIcon  icon={['fas', 'caret-right']} className="icon icon__site-main--chat__header--angle"/>
                        { this.props.userNotify > 0 ?
                            <div className="active__main active__main--chat-tab"><div>{this.props.userNotify}</div></div> : null}
                    </li>
                    { footerOpt }
                    <li 
                        className="site-main__chat--header__user-opt--list__prf site-main__chat--header__user-opt--list__conv"
                        onClick={this.convHandler}>Conversation</li>
                </ul>
            )
        }

        return (
            <div className="site-main__chat--header">
                <div className="site-main__chat--header__wrapper">
                    { header }  
                    <div className="site-main__chat--header__user-opt">
                        <div 
                            className="site-main__chat--header__user-opt--circle"
                            onClick={this.showUserOptHandler}>
                            <div className="site-main__chat--header__user-opt--circle__middle"></div>
                        </div>
                        { this.props.groupNotify+this.props.userNotify > 0 ?
                            <div className="active__main active__main--chat-opt"><div>{this.props.groupNotify+this.props.userNotify}</div></div> : null}
                        {/* <div className="active__main active__main--chat-opt"><div>99</div></div> */}
                        { userOpt }
                    </div>
                </div>
                { status }
            </div>

        )
    }
};
const mapStateToProps = state => {
    return {
        cnt: state.cnt.cnts,
        userBackdrop: state.cnt.userBackdrop,
        users: state.cnt.users,
        groupNotify: state.cnt.groupNotify,
        userNotify: state.cnt.userNotify,
        connect: state.cnt.connect
    };
 }

 const mapDispatchToProps = dispatch => {
    return {
        onShowBackdrop: () => dispatch(actions.showUserBackdrop()),
        onCloseBackdrop: () => dispatch(actions.closeBackdrop()),
        onShowNav: () => dispatch(actions.showSideNav())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); 