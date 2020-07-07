import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';

import './UserOption.css';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxs/Aux';

class UserOption extends Component {
    state ={
        show: false,
        default: false,
        id: document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
        showAddOpt: false
    };

    componentDidUpdate() {
        if (this.state.show && !this.state.default && this.props.hidUserOption) {
            this.setState({
                default: true,
                show: false
            });
        }
    }

    showUserOptionHandler = () => {
        this.props.onShowUserOption();
        this.setState((prevState, props) => {
            return {
                default: false,
                show: prevState.showAddOpt ? true : !prevState.show,
                showAddOpt: false
            }
        }) 
    }

    showAddCntHandler = () => {
        this.props.onShowUserOption();
        this.setState((prevState, Props) => {
            return {
                showAddOpt: true,
                default: false,
                show:  prevState.showAddOpt ? !prevState.show : true,
            }
        })
    }

    render() {
        let userDetClass = ["site-header__user--det"];
        let userImg = <img className="site-header__user--img" src={this.props.img} alt={this.props.username}/>;
        let profile = null;

        if (this.state.show) {
            userDetClass.push("site-header__user--det__visible")
        };

        if (this.props.username && !this.props.img) {
            userImg = <Avatar  name={this.props.username} size='30' round />;
        }

        if (this.state.id){
            profile = (
                <li className="site-header__user--det__portal">
                    <a href={`/user/profile/${this.state.id}`}>
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'user']} 
                                className="icon icon__site-header--user__set" />
                        </div>
                        My Profile
                        </a>  
                </li>
            )
        }

        let cnt = (
            <Aux>
                { profile }
                {/* <li className="site-header__user--det__acc">
                    <a href="/acc/set">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'cogs']} 
                                className="icon icon__site-header--user__set" />
                        </div>
                        Account Settings
                    </a>
                </li>  */}
                <li className="site-header__user--det__logout">
                    <a href="/auth/logout">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'angle-double-right']} 
                                className="icon icon__site-header--user__log" /> 
                        </div>
                        Logout
                    </a>
                </li>
            </Aux>
        )

        if (this.state.showAddOpt) {
            cnt = (
            <Aux>
                <li className="site-header__user--det__add">select to Add New</li>
                <li className="site-header__user--det__logout">
                    <a href="/add/aroundme">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'clone']}  /> 
                        </div>
                        Post
                    </a>
                </li>
                <li className="site-header__user--det__logout">
                    <a href="/add/question">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'question']}  /> 
                        </div>
                        Question
                    </a>
                </li>
                <li className="site-header__user--det__logout">
                    <a href="/add/qchat">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'desktop']}  /> 
                        </div>
                        CBT
                    </a>
                </li>
                <li className="site-header__user--det__logout">
                    <a href="/question">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'clone']}  /> 
                        </div>
                        Answer
                    </a>
                </li>
                <li className="site-header__user--det__logout">
                    <a href="/add/poet">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'book']}  /> 
                        </div>
                        Write Up
                    </a>
                </li>
                <li className="site-header__user--det__logout">
                    <a href="/add/group">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'comment-alt']}  /> 
                        </div>
                        Chat Room
                    </a>
                </li>
                <li className="site-header__user--det__logout">
                    <a href="/add/advert">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'bullhorn']}  /> 
                        </div>
                        Advert
                    </a>
                </li>
                <li className="site-header__user--det__logout">
                    <a href="/add/post">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'newspaper']} /> 
                        </div>
                        Feed
                    </a>
                </li>
                <li className="site-header__user--det__logout">
                    <a href="/add/contest">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'comments-dollar']}  /> 
                        </div>
                        Contest
                    </a>
                </li>
                <li className="site-header__user--det__logout">
                    <a href="/add/contact">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'phone']} /> 
                        </div>
                        Contact us
                    </a>
                </li>
            </Aux>
            )    
        }

        return ( 
            <div className="site-header__user">
                <div 
                    className="site-header__user--det__addNew"
                    onClick={this.showAddCntHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'plus']} />
                </div>
               <div>
                    { userImg }
                </div>
                <ul className={userDetClass.join(' ')}>
                    { cnt }
                </ul>
                <div 
                    className="site-header__user--det__opt"
                    onClick={this.showUserOptionHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'caret-down']} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        hidUserOption: state.header.hidUserOption,
        img: state.auth.img,
        username: state.auth.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowUserOption: () => dispatch(actions.showUserOption())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOption);