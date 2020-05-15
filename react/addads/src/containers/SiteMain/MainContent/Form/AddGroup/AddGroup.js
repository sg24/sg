import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { updateObject } from '../../../../../shared/utility';
import * as actions from '../../../../../store/actions/index';
import Loader from '../../../../../components/UI/Loader/Loader';
import GroupContents from '../../../../../components/Main/GroupContents/GroupContents';
import Input from './Input/Input';

class AddUsers extends Component {
    state = {
        curTab: 'group',
        showNewTab: false,
        users: null,
        showInput: false,
        userSelected: this.props.media.user ? [...this.props.media.user] : [],
        showGroupSelect: false 
    };

    componentDidMount() {
        this.props.onFetchGroup();
    }

    componentDidUpdate() {
        // if (this.state.showNewTab && this.state.curTab !== 'groupselect') {
        //     this.setState({showNewTab: false, users: this.props.users});
        // }

        // if (this.state.showGroupSelect && this.state.curTab === 'groupselect') {
        //     let userSelect = [...this.state.userSelected];
        //     let users = [...this.props.onlineUser,...this.props.offlineUser]
        //     this.props.onShowUserSelect(users, userSelect);
        //     this.setState({users: this.props.users, showGroupSelect: false});
        // }
    }

    changeTabHandler = (newtab) => { 
        let curTab = null;
        curTab =  newtab === 'group' ? newtab : curTab;
        curTab =  newtab === 'groupselect' ? newtab : curTab;
        this.setState({curTab, showNewTab: true, showGroupSelect: curTab === 'groupselect'})
    }

    showSearchInputHandler = () => {
        this.setState((prevState, props) => {
            return {
                showInput: !prevState.showInput
            };
        });
        if (this.state.showInput) {
            this.props.onFetchUsers(this.state.curTab);
        }
    }

    selectedUserHandler = (user) => {
        let userSelectedArray = [...this.state.userSelected];
        let userSelected = userSelectedArray.filter(userID => userID === user.id );
        if (userSelected.length > 0) {
            let updateUserSelectArray = [...userSelectedArray.filter(userID => userID !== user.id )];
            this.setState({
                userSelected: updateUserSelectArray,
                showGroupSelect: this.state.curTab === 'groupselect'});
            if (this.props.media.user && this.props.media.user.length > 0) {
                this.props.onAddUserSelect(updateObject(this.props.media, {user: updateUserSelectArray}));
            }
            return
        }

        userSelectedArray.push(user.id)
        this.setState({userSelected: userSelectedArray, showGroupSelect: this.state.curTab === 'groupselect' });
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
        let group = null;
        let userSelectClass = ['reuse-form__itm--tab__cnt--selec'];
        let searchInput = null;

        if (this.props.start) {
            group = <Loader />
        }

        if (this.props.groupErr) {
            group = null
        }

        if (this.props.group) {
            group = <GroupContents 
                content={this.props.group}
                selected={this.selectedUserHandler}
                selectedUser={this.state.userSelected}/>
        }

        if (this.props.filteredUser) {
            group = <GroupContents 
            content={this.props.filteredUser}
            selected={this.selectedUserHandler}
            selectedUser={this.state.userSelected}/>
        }
        

        if (this.state.curTab === 'groupselect') {
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
                            className={this.state.curTab === 'group' ? "active-content-tab" : null}
                            onClick={this.changeTabHandler.bind(this, 'group')}>
                            {this.state.curTab === 'group' ? <div className="active-content-tab__active"></div> : null }
                            Group
                        </li>
                        <li
                            className={this.state.curTab === 'groupselect' ? "active-content-tab" : null}
                            onClick={this.changeTabHandler.bind(this, 'groupselect')}>
                                Group Selected 
                            {this.state.curTab === 'groupselect' ? <div className="active-content-tab__active"></div> : null }
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
                   { group }
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
        filteredUser: state.form.filteredUser,
        media: state.form.media,
        curTab: state.form.curTab,
        start: state.form.startGroup,
        groupErr: state.form.groupErr,
        group: state.form.group
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchGroup: () => dispatch(actions.fetchGroupInit()),
        onResetTab: () => dispatch(actions.resetTab()),
        onAddUserSelect: (users) => dispatch(actions.userSelect(users)),
        // onShowUserSelect: (users, userID) => dispatch(actions.showGroupSelectInit(users, userID)),
        onSubmitMedia: (media) => dispatch(actions.submitMedia(media)),
        onhideMediaBox: () => dispatch(actions.hideMediaBox())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);