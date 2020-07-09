import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';
import draftToHtml from 'draftjs-to-html'

import './GroupInfo.css';
import Input from './Input/Input';
import Users from './Users/Users';
import * as actions from '../../../store/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import Loader from '../../../components/UI/Loader/Loader';

class GroupInfo extends Component {
    state = {
        showInput: false,
        showNewTab: false,
        curTab: 'online'
    }

    closeShareHandler = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        if (this.props.grpInfo) {
            this.props.onFetchInfo(this.props.grpInfo._id, this.state.curTab);
        }
    }

    componentWillUnmount() {
        this.props.onDefaultShareProps();
    }

    componentDidUpdate() {  
        if (this.state.showNewTab) {
            this.props.onFetchInfo(this.props.grpInfo, this.state.curTab);
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


    render() { 
        let searchInput = null;
        let requestCnt = null;
        let searchIcnClass = ['reuse-share__tab--srch__icn'];
        let adminImage = null;
        let groupImage = null;
        let adminStatus = <div className="reuse-prf__grp--img__status reuse-prf__grp--img__status--off"></div>

        if (this.state.showInput) {
            searchIcnClass.push('reuse-share__tab--srch__icn--hidden')
            searchInput = (
                <div className="reuse-share__tab--srch__wrapper">
                    <div 
                        className="reuse-share__tab--srch__close"
                        onClick={this.showSearchInputHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'times']}/>
                    </div>
                    <div className="reuse-share__tab--srch__input-wrapper">
                       <Input /> 
                    </div>
                </div>
            )
        }

        let grpInfo= (
            <div className="reuse-share__wrapper">  
                <Loader />
            </div>
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

            grpInfo = (
                <div className="reuse-share__wrapper"> 
                    <div className="reuse-prf">
                        <div className="reuse-prf__grp">
                            <div className="reuse-prf__grp--img">
                                <div className="reuse-prf__grp--img__wrapper">
                                    { groupImage }
                                   { this.props.grpInfo.userOpt ? 
                                     <div>
                                        <a href={`/edit/group/${this.props.grpInfo._id}`}>
                                        <FontAwesomeIcon 
                                            icon={['fas', 'edit']}  />
                                        </a>
                                    </div> : null}
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
                                                <li><span>{ this.props.grpInfo.studenttotal }</span> Friend</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p 
                        className="reuse-share__desc"
                        dangerouslySetInnerHTML={{
                            __html: htmlContent
                        }}>
                    </p>
                    <div className="reuse-share__tab">
                        <ul className="reuse-share__tab--cnt">
                            <li 
                                className={this.state.curTab === 'online' ? "active-grp-content-tab" : null}
                                onClick={this.changeTabHandler.bind(this, 'online')}>
                                {this.state.curTab === 'online' ? <div className="active-grp-content-tab__active"></div> : null }
                                Online
                            </li>
                            <li
                                className={this.state.curTab === 'offline' ? "reuse-share__tab--cnt__offline active-grp-content-tab" : 'reuse-share__tab--cnt__offline'}
                                onClick={this.changeTabHandler.bind(this, 'offline')}>
                                {this.state.curTab === 'offline' ? <div className="active-grp-content-tab__active"></div> : null }
                                Offline
                            </li>
                            { requestCnt }
                        </ul>
                        <div className="reuse-share__tab--srch">
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
                </div>
            )
        }

        if (this.props.grpErr) {
            grpInfo = (
                <Modal 
                    err={this.props.grpErr}/>
            );
        }

        let share = (
            <div className="reuse-share">
                <div className="reuse-share__main-wrapper">
                    <div className="reuse-share__backdrop"  onClick={this.closeShareHandler}>
                    </div>  
                    { grpInfo }
                </div>
            </div>
        );

        if (!this.props.grpInfo) {
            this.closeShareHandler();
            share = null
        };

        return share
    }
}

const mapStateToProps = state => {
    return {
        grpInfo: state.grp.grpInfo,
        grpErr: state.grp.grpErr,
        status: state.auth.status,
        requestTotal: state.grp.requestTotal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDefaultShareProps: () => dispatch(actions.shareGrpUser()),
        onFetchInfo: (id, status) => dispatch(actions.fetchInfoInit(id, status)),
        onResetInputFilter: () => dispatch(actions.resetInputFilter())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupInfo));