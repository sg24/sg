import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { updateObject } from '../../../../../shared/utility';
import * as actions from '../../../../../store/actions/index';
import Users from '../../../../../components/Main/Users/Users';
import Input from './Input/Input';

class AddUsers extends Component {
    state = {
        curTab: 'online',
        showNewTab: false,
        users: null,
        showInput: false,
        userSelected: this.props.media.user ? [...this.props.media.user] : [],
        showUserSelect: false 
    };

    componentDidMount() {
        this.props.onFetchUsers(this.state.curTab);
    }

    componentDidUpdate() {
        if (this.state.showNewTab && this.state.curTab !== 'userselect') {
            this.props.onFetchUsers(this.state.curTab);
            this.setState({showNewTab: false, users: this.props.users});
        }

        if (this.state.showUserSelect && this.state.curTab === 'userselect') {
            let userSelect = [...this.state.userSelected];
            this.props.onShowUserSelect(userSelect);
            this.setState({users: this.props.users, showUserSelect: false});
        }
    }

    changeTabHandler = (newtab) => { 
        let curTab = null;
        curTab =  newtab === 'online' ? newtab : curTab;
        curTab =  newtab === 'offline' ? newtab : curTab;
        curTab =  newtab === 'userselect' ? newtab : curTab;

        this.setState({curTab, showNewTab: true, showUserSelect: curTab === 'userselect'})
    }

    showSearchInputHandler = () => {
        this.setState((prevState, props) => {
            return {
                showInput: !prevState.showInput
            };
        });
    }

    selectedUserHandler = (user) => {
        let userSelectedArray = [...this.state.userSelected];
        let userSelected = userSelectedArray.filter(userID => userID === user.id );
        if (userSelected.length > 0) {
            let updateUserSelectArray = [...userSelectedArray.filter(userID => userID !== user.id )];
            this.setState({
                userSelected: updateUserSelectArray,
                showUserSelect: this.state.curTab === 'userselect'});
            if (this.props.media.user && this.props.media.user.length > 0) {
                this.props.onAddUserSelect(updateObject(this.props.media, {user: updateUserSelectArray}));
            }
            return
        }

        userSelectedArray.push(user.id)
        this.setState({userSelected: userSelectedArray, showUserSelect: this.state.curTab === 'userselect' });
        if (this.props.media.user && this.props.media.user.length > 0) {
            this.props.onAddUserSelect(updateObject(this.props.media, {user: userSelectedArray}));
        }
    }

    submitMediaHandler = () => {
        let userSelected = [...this.state.userSelected];
        let media = {...this.props.media};
        this.props.onSubmitMedia(updateObject(media, {user: userSelected}));
        
    }

    closeMediaBoxHandler = () => {
        this.props.onhideMediaBox();
    }

    render() {
        let users = null;
        let userSelectClass = ['reuse-form__itm--tab__cnt--selec'];
        let searchInput = null;

        if (this.props.users) {
            users = <Users 
                content={this.props.users}
                selected={this.selectedUserHandler}
                selectedUser={this.state.userSelected}/>
        }

        if (this.props.filteredUser) {
            users = <Users 
            content={this.props.filteredUser}
            selected={this.selectedUserHandler}
            selectedUser={this.state.userSelected}/>
        }
        

        if (this.state.curTab === 'userselect') {
            userSelectClass.push('reuse-form__itm--tab__cnt--selec__active');
        }

        if (this.state.showInput) {
            searchInput = (
                <div className="reuse-form__itm--tab__srch--wrapper">
                    <div 
                        className="reuse-form__itm--tab__srch--close"
                        onClick={this.showSearchInputHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'times']}/>
                    </div>
                    <Input /> 
                </div>
            )
        }

        return (
            <div className="reuse-form__itm reuse-form__itm--user">
                <div className="reuse-form__itm--tab">
                    <ul className="reuse-form__itm--tab__cnt">
                        <li 
                            className={this.state.curTab === 'online' ? "active-content-tab" : null}
                            onClick={this.changeTabHandler.bind(this, 'online')}>
                            {this.state.curTab === 'online' ? <div className="active-content-tab__active"></div> : null }
                            Online
                        </li>
                        <li
                            className={this.state.curTab === 'offline' ? "active-content-tab" : null}
                            onClick={this.changeTabHandler.bind(this, 'offline')}>
                            {this.state.curTab === 'offline' ? <div className="active-content-tab__active"></div> : null }
                            Offline
                        </li>
                        <li
                            className={this.state.curTab === 'userselect' ? "active-content-tab" : null}
                            onClick={this.changeTabHandler.bind(this, 'userselect')}>
                                Users Selected 
                            {this.state.curTab === 'userselect' ? <div className="active-content-tab__active"></div> : null }
                            <div className={userSelectClass.join(' ')}>{this.state.userSelected.length}</div>
                        </li>
                    </ul>
                    <div className="reuse-form__itm--tab__srch">
                        <div 
                            className="reuse-form__itm--tab__srch--icn"
                            onClick={this.showSearchInputHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'search']}
                                className="icon icon__reuse-form--srch" />
                        </div>
                        { searchInput }
                    </div>
                </div>
                
                <div className="reuse-form__itm--det">
                   { users }
                </div>
                <div className="reuse-form__itm--footer reuse-form__btn">
                    <button 
                        type="button" 
                        className="reuse-form__btn--close"
                        onClick={this.closeMediaBoxHandler}>Exit</button>
                    <button 
                        type="button" 
                        className="reuse-form__btn--add"
                        onClick={this.submitMediaHandler}
                        disabled={this.state.userSelected.length < 1}>Share</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>  {
    return {
        users: state.form.users,
        filteredUser: state.form.filteredUser,
        media: state.form.media,
        curTab: state.form.curTab
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: (tab) => dispatch(actions.fetchUsersInit(tab)),
        onAddUserSelect: (users) => dispatch(actions.userSelect(users)),
        onShowUserSelect: (userID) => dispatch(actions.showUserSelectInit(userID)),
        onSubmitMedia: (media) => dispatch(actions.submitMedia(media)),
        onhideMediaBox: () => dispatch(actions.hideMediaBox())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);