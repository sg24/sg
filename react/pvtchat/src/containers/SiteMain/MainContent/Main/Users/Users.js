import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Users.css'
import Loader from '../../../../../components/UI/Loader/Loader';
import * as actions from '../../../../../store/actions/index';
import PrivateUsers from '../../../../../components/Main/PrivateUsers/PrivateUsers'
import Backdrop from '../../../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../../../components/UI/Modal/Modal';

class Users extends Component {
    state = {
        showInput: false,
        showNewTab: false,
        curTab: 'friend',
        id: this.props.match.params.id,
        categ: this.props.match.params.categ,
        inputValue: '',
        pvtUser: null
    }


    componentDidMount() {
        this.props.onFetchPvtuser(this.state.categ, this.state.id, this.state.curTab)
    }
    
    componentDidUpdate() {  
        if (this.state.showNewTab) {
            this.props.onFetchPvtuser(this.state.categ, this.state.id, this.state.curTab);
            this.setState({showNewTab: false})
        }
        
        if (this.props.filterPvtuser && (JSON.stringify(this.state.pvtUser) !== JSON.stringify(this.props.filterPvtuser))) {
            this.setState({pvtUser: this.props.filterPvtuser})
        }

        if (!this.props.filterPvtuser && (JSON.stringify(this.state.pvtUser) !== JSON.stringify(this.props.pvtUser))) {
            this.setState({pvtUser: this.props.pvtUser})
        }

    }

    showSearchInputHandler = () => {
        this.setState((prevState, props) => {
            return {
                showInput: !prevState.showInput
            };
        });
        this.props.onResetInputFilter()
    }

    filterContentHandler = (event) => {
        this.setState({inputValue: event.target.value})
        this.props.onFilterPvtUser(event.target.value);
    }


    changeTabHandler = (newtab) => { 
        let curTab = null;
        curTab =  newtab === 'teacher' ? newtab : curTab;
        curTab =  newtab === 'friend' ? newtab : curTab;
        this.setState({curTab, showNewTab: true})
    }

    closeModelCntBackdropHandler = () =>  {
        this.props.onCloseModelBackdrop();
    }

    closeModelHandler = () => {
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}`)
    }

    render() {
        let userDet = null;
        let searchInput = null;
        let searchIcnClass =  ['site-main__chat--srch-user__cnt--tab__srch--icn'];

        if (this.props.pvtUserStart) {
            userDet = <Loader />
        }

        if (this.state.pvtUser) {
            userDet = (
                <PrivateUsers 
                    content={this.state.pvtUser}/>
            )
        }

        if (this.props.pvtUserErr) {
            userDet = (
                <Backdrop 
                    component={ Modal }
                    close={this.closeModelBackdropHandler}
                    err={ this.props.pvtUserErr || this.state.err } />
            )
        }

        if (this.state.showInput) {
            searchIcnClass.push('site-main__chat--srch-user__cnt--tab__srch--icn__hidden')
            searchInput = (
                <div className="site-main__chat--srch-user__cnt--tab__srch--wrapper">
                    <div 
                        className="site-main__chat--srch-user__cnt--tab__srch--close"
                        onClick={this.showSearchInputHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'times']}/>
                    </div>
                    <div className="site-main__chat--srch-user__cnt--tab__srch--input-wrapper">
                    <input 
                        type="text" 
                        className="site-main__chat--srch-user__cnt--tab__srch--input " 
                        placeholder="Enter friend name..."
                        onChange={this.filterContentHandler}
                        value={this.state.inputValue} />
                    </div>
                </div>
            )
        }

        return (
            <div className="site-main__chat--srch-user">
                <div className="site-main__chat--srch-user__wrapper">
                    <div className="site-main__chat--srch-user__close">
                        <h4>Friends</h4>
                        <div 
                            className="site-main__chat--srch-user__close--wrapper"
                            onClick={this.closeModelHandler}>
                            <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                        </div>
                    </div>
                    <div className="site-main__chat--srch-user__cnt">
                        <div className="site-main__chat--srch-user__cnt--tab">
                            <ul className="site-main__chat--srch-user__cnt--tab__opt">
                                {/* <li 
                                    className={this.state.curTab === 'teacher' ? "active-user-content-tab" : null}
                                    onClick={this.changeTabHandler.bind(this, 'teacher')}>
                                    {this.state.curTab === 'teacher' ? <div className="active-user-content-tab__active"></div> : null }
                                    Teacher
                                </li> */}
                                <li
                                    className={this.state.curTab === 'friend' ? "active-user-content-tab" : null}
                                    onClick={this.changeTabHandler.bind(this, 'friend')}>
                                    {this.state.curTab === 'friend' ? <div className="active-user-content-tab__active"></div> : null }
                                    Friend 
                                </li>
                            </ul>
                            <div className="site-main__chat--srch-user__cnt--tab__srch">
                                <div 
                                    className={searchIcnClass.join(' ')}
                                    onClick={this.showSearchInputHandler}>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'search']}
                                        className="icon icon__reuse-form--srch" />
                                </div>
                                { searchInput }
                            </div>
                        </div>
                        <div className="site-main__chat--srch-user__cnt--user">
                            { userDet }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        pvtUser: state.cnt.pvtUser,
        filterPvtuser: state.cnt.filterPvtuser,
        pvtUserStart: state.cnt.pvtUserStart,
        pvtUserErr: state.cnt.pvtUserErr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPvtuser: (categ, id, curTab) => dispatch(actions.fetchPvtuserInit(categ, id, curTab)),
        onFilterPvtUser: (filterContent) => dispatch(
            actions.filterPvtuser(filterContent)),
        onResetInputFilter: () => dispatch(actions.resetPvtuserFilter()),
        closeModelCntBackdropHandler: () => dispatch(actions.fetchPvtuserReset())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));