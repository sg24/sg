import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import Avatar from 'react-avatar';

import './Main.css';
import { transformNumber } from '../../../../shared/utility';
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

    groupDetHandler = () => {
        this.props.onCloseBackdrop();
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}?id=groupInfo`);
    };

    showMemberHandler = () => {
        this.props.onCloseBackdrop();
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}?id=friends`);
    };

    chatRoomHandler = () => {
        this.props.onCloseBackdrop();
        this.props.onShowNav()
    };

    render() {
        let groupImage = <Avatar  name={this.props.cnt.title} size='50' round />
        let userOpt = null
        let status = <div className="site-main__chat--header__status"></div>
        if (this.props.cnt.image && this.props.cnt.image.length > 0) {
            groupImage = <img src={`${window.location.protocol + '//' + window.location.host}/media/image/${this.props.cnt.image[0].id}`} alt="group" />
        }

        if (this.props.connect) {
            status = (
                <div className="site-main__chat--header__status site-main__chat--header__status-on"></div>
            )
        }
        
        let header = (
            <>
                <div className="site-main__chat--header__img">
                    { groupImage }
                </div>
                <h3 className="site-main__chat--header__title">
                    { this.props.cnt.title }
                </h3>
                <div className="site-main__chat--header__det">
                    <div className="site-main__chat--header__det--users site-main__chat--header__det--users__grp">
                        <div className="site-main__chat--header__det--users__icn"><FontAwesomeIcon  icon={['fas', 'users']} className="icon icon__site-main--chat__header--user"/></div>
                        <span> { transformNumber(this.props.cnt.members)} </span>
                    </div>
                    <div 
                        className="site-main__chat--header__det--cnt site-main__chat--header__det--cnt__lg"
                        onClick={this.groupDetHandler}>
                        Details
                        <div></div>
                    </div>
                    <div 
                        className="site-main__chat--header__det--cnt site-main__chat--header__det--cnt__sm"
                        onClick={this.chatRoomHandler}>
                        Chat Room
                    </div>
                    <div className="site-main__chat--header__det--calend">
                        <FontAwesomeIcon  icon={['far', 'calendar-alt']} className="icon icon__site-main--chat__header--calend"/> 
                        <Moment format="MMM YYYY">
                            {this.props.cnt.groupCreated}
                        </Moment>
                    </div>
                </div> 
            </> 
        );

        let footerOpt =(
            <li 
                className="site-main__chat--header__user-opt--list__grp-det"
                onClick={this.groupDetHandler}>Group Details</li>
        )

        if (this.props.userBackdrop) {
            userOpt = (
                <ul className="site-main__chat--header__user-opt--list">
                    <li 
                        className="site-main__chat--header__user-opt--list__srch"
                        onClick={this.searchChatHandler}> Search Chat </li>
                    <li 
                        className="site-main__chat--header__user-opt--list__grp"
                        onClick={this.groupListHandler}> Groups <FontAwesomeIcon  icon={['fas', 'caret-right']} className="icon icon__site-main--chat__header--angle"/></li>
                    {/* <li className="site-main__chat--header__user-opt--list__chat"> Conversation <FontAwesomeIcon  icon={['fas', 'caret-right']} className="icon icon__site-main--chat__header--angle"/></li> */}
                    <li 
                        className="site-main__chat--header__user-opt--list__srch-user"
                        onClick={this.showMemberHandler}> Friends <FontAwesomeIcon  icon={['fas', 'caret-right']} className="icon icon__site-main--chat__header--angle"/></li>
                    { footerOpt }
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