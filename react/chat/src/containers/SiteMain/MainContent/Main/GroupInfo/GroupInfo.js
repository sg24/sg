import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';
import draftToHtml from 'draftjs-to-html'

import './GroupInfo.css';
import Input from './Input/Input';
import Users from './Users/Users';
import * as actions from '../../../../../store/actions/index';
import Backdrop from '../../../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../../../components/UI/Modal/Modal';
import Loader from '../../../../../components/UI/Loader/Loader';
import CntBackdrop from '../../../../../components/UI/CntBackdrop/CntBackdrop';

class Share extends Component {
    state = {
        showInput: false,
        showNewTab: false,
        curTab: 'online',
        id: this.props.match.params.id,
        categ: this.props.match.params.categ
    }

    closeShareHandler = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        if (this.props.cnts) {
            for (let key in this.props.cnts) {
                if (this.props.cnts[key] === this.props.match.params.id) {
                    this.props.onFetchInfo(this.props.match.params.id, this.state.curTab);
                    this.props.onSetGrpInfo(this.props.cnts)
                }
            }
        }
    }

    componentWillUnmount() {
        // this.props.onDefaultShareProps();
    }

    componentDidUpdate() {  
        if (this.state.showNewTab) {
            this.props.onFetchInfo(this.state.id, this.state.curTab);
            this.setState({showNewTab: false})
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

    changeTabHandler = (newtab) => { 
        let curTab = null;
        curTab =  newtab === 'online' ? newtab : curTab;
        curTab =  newtab === 'offline' ? newtab : curTab;
        curTab =  newtab === 'request' ? newtab : curTab;
        this.setState({curTab, showNewTab: true})
    }

    closeModelBackdropHandler = () => {
        this.props.onCloseBackdrop()
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}`)
    }

    

    changeCntHandler = () => {
        this.props.onChangeCnt(this.props.changeCntStart.id, this.props.changeCntStart.user, this.props.changeCntStart.categ, this.props.changeCntStart.username, this.props.changeCntStart.curTab, true)
    }

    closeChangeCntHandler = () => {
        this.props.onCloseChangeCnt()
    }

    closeModelCntBackdropHandler = () =>  {
        this.props.onCloseModelBackdrop()
    }


    render() { 
        let searchInput = null;
        let requestCnt = null;
        let searchIcnClass = ['site-main__chat--grp-info__srch--icn'];
        let adminImage = null;
        let groupImage = null;
        let adminStatus = <div className="reuse-prf__grp--img__status reuse-prf__grp--img__status--off"></div>

        if (this.state.showInput) {
            searchIcnClass.push('site-main__chat--grp-info__srch--icn__hidden')
            searchInput = (
                <div className="site-main__chat--grp-info__srch--wrapper">
                    <div 
                        className="site-main__chat--grp-info__srch--close"
                        onClick={this.showSearchInputHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'times']}/>
                    </div>
                    <div className="site-main__chat--grp-info__srch--input-wrapper">
                       <Input /> 
                    </div>
                </div>
            )
        }

        let shareCnt = (
            <Loader /> 
        )

        if (this.props.grpInfo && !this.props.grpInfo.userImage) {
            adminImage = <Avatar  name={this.props.grpInfo.username} size='30' round/>;
        }

        if (this.props.grpInfo && this.props.grpInfo.userImage) {
            adminImage = <img src={this.props.grpInfo.userImage} alt=""/>
        }

        if (this.props.grpInfo && !this.props.grpInfo.image.length) {
            groupImage = <Avatar  name={this.props.grpInfo.title} size='100' />;
        }

        if (this.props.grpInfo && this.props.grpInfo.image.length > 0) {
            groupImage = <img src={`${window.location.protocol + '//' + window.location.host}/media/image/${this.props.grpInfo.image[0].id}`} alt="group" />
        }
        
        
        if (this.props.grpInfo) {
            let desc =  JSON.parse(this.props.grpInfo.desc)
            const htmlContent = draftToHtml(desc,{ trigger: '#',separator: ' '}, true);

            if (this.props.grpInfo.status) {
                adminStatus = <div className="reuse-prf__grp--img__status reuse-prf__grp--img__status--on"></div>
            }

            if (this.props.grpInfo.userOpt) {
                requestCnt = (
                    <li
                        className={this.state.curTab === 'request' ? "active-grp-content-tab" : null}
                        onClick={this.changeTabHandler.bind(this, 'request')}>
                            Request
                        { this.props.requestTotal > 0 ? <span>{ this.props.requestTotal}</span> : null}
                        {this.state.curTab === 'request' ? <div className="active-grp-content-tab__active"></div> : null }
                    </li>
                )
            }

            shareCnt = (
                <>
                    <div className="reuse-prf">
                        <div className="reuse-prf__grp">
                            <div className="reuse-prf__grp--img">
                                <div className="reuse-prf__grp--img__wrapper">
                                    { groupImage }
                                </div>
                            </div>
                            <div className="reuse-prf__grp--det">
                                <div className="reuse-prf__grp--det__name">
                                    { this.props.grpInfo.title }
                                </div>
                                <div className="reuse-prf__grp--det__admin">
                                    <div className="reuse-prf__grp--det__admin--title">
                                    <FontAwesomeIcon 
                                        icon={['fas', 'cogs']} 
                                        className="icon icon__reuse-prf__grp--admin" />
                                        Admin
                                    </div>
                                    <div className="reuse-prf__grp--det__admin--info">
                                        <div className="reuse-prf__grp--det__admin--info-wrapper">
                                            <div>
                                                { adminImage }
                                                { adminStatus }
                                            </div>
                                            <ul>
                                                <li><a href={`/user/profile/${this.props.grpInfo.authorID}`}>{ this.props.grpInfo.username } </a></li>
                                                <li><span>{ this.props.grpInfo.studenttotal }</span> Student</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p 
                        className="site-main__chat--grp-info__desc"
                        dangerouslySetInnerHTML={{
                            __html: htmlContent
                        }}>
                    </p>
                    <div className="site-main__chat--grp-info__tab">
                        <ul className="site-main__chat--grp-info__tab--cnt">
                            <li 
                                className={this.state.curTab === 'online' ? "active-grp-content-tab" : null}
                                onClick={this.changeTabHandler.bind(this, 'online')}>
                                {this.state.curTab === 'online' ? <div className="active-grp-content-tab__active"></div> : null }
                                Online
                            </li>
                            <li
                                className={this.state.curTab === 'offline' ? "site-main__chat--grp-info__offline active-grp-content-tab" : 'site-main__chat--grp-info__offline'}
                                onClick={this.changeTabHandler.bind(this, 'offline')}>
                                {this.state.curTab === 'offline' ? <div className="active-grp-content-tab__active"></div> : null }
                                Offline
                            </li>
                            { requestCnt }
                        </ul>
                        <div className="site-main__chat--grp-info__srch">
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
                    <Users />
                </>
            )
        }

        if (this.props.grpErr) {
            shareCnt = (
                <Backdrop 
                    component={ Modal }
                    close={this.closeModelBackdropHandler}
                    err={ this.props.grpErr || this.state.err } />
            );
        }

        let share = (
            <div className="site-main__chat--grp-info">
                 { this.props.changeCntStart !== null ? 
                    <CntBackdrop   
                        show={ this.props.showBackdrop }
                        component={ Modal }
                        close={this.closeModelCntBackdropHandler}
                        err={ this.props.changeCntErr }
                        warn={{
                            msg: this.props.changeCntStart.categ === 'reject'  || this.props.changeCntStart.categ === 'remove' ?
                            `Are you sure you want to ${this.props.changeCntStart.categ}` : `Are you sure you want to ${this.props.changeCntStart.categ}`,
                            cnt: this.props.changeCntStart.username,
                            det: this.props.changeCntStart.categ
                        }}
                        exit={{
                            msg: this.props.changeCntStart.categ === 'reject'  || this.props.changeCntStart.categ === 'remove' ?
                            `${this.props.changeCntStart.username} ${this.props.changeCntStart.categ === 'reject' ? 'rejected' : 'removed'} successfully` : this.props.changeCntStart.categ,
                            close: this.props.changeCnt}}
                        changeCnt={this.changeCntHandler}
                        closeChangeCnt={this.closeChangeCntHandler}/> : null}
                 <div className="site-main__chat--grp-info__wrapper">
                    <div className="site-main__chat--grp-info__close">
                        <h4>Room</h4>
                        <div 
                            className="site-main__chat--grp-info__close--wrapper"
                            onClick={this.closeModelBackdropHandler}>
                            <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                        </div>
                    </div>
                    { shareCnt }
                </div>
            </div>
        );

        if (!this.props.match.params.id || !this.props.cnts) {
            this.closeShareHandler();
            share = null
        };

        return share
    }
}

const mapStateToProps = state => {
    return {
        cnts: state.cnt.cnts,
        grpInfo: state.groupInfo.grpInfo,
        grpErr: state.groupInfo.grpErr,
        status: state.auth.status,
        requestTotal: state.groupInfo.requestTotal,
        changeCntStart: state.groupInfo.changeCntStart,
        changeCntErr: state.groupInfo.changeCntErr,
        changeCnt: state.groupInfo.changeCnt
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchInfo: (id, status) => dispatch(actions.fetchInfoInit(id, status)),
        onSetGrpInfo: (grpInfo) => dispatch(actions.setGrpInfo(grpInfo)),
        onCloseBackdrop: () => dispatch(actions.closeBackdrop()),
        onResetInputFilter: () => dispatch(actions.resetInputFilter()),
        onChangeCnt: (id, userID, categ, username, curTab, confirm) => dispatch(actions.changeCntInit(id, userID, categ, username, curTab, confirm)),
        onCloseChangeCnt: () => dispatch(actions.changeCntCancel()),
        onCloseModelBackdrop: () => dispatch(actions.resetModel())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Share));