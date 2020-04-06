import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../../store/actions/index';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import Loader from '../../../components/UI/Loader/Loader';
import MainCnt from './MainCnt/MainCnt'; 

class MainContent extends Component {
    state = {
        private: {
            path: '/conv/private',
            icnGrp: 'user-friends',
            icnClass: 'icon icon__site-main--conv__tab--icn',
            title: 'Private',
        },
        group: {
            path: '/conv/group',
            icnGrp: 'users',
            icnClass: 'icon icon__site-main--conv__tab--icn',
            title: 'Group',
        },
        curTab: this.props.location.pathname.split('/').length > 2 ? this.props.location.pathname.split('/')[2] : this.props.location.pathname.split('/')[1],
        cntFetch: false
    }

    componentDidUpdate() {
        if (this.props.cntFetch && !this.state.cntFetch) {
            this.setState({cntFetch: true})
        }
    }

    removeActiveHandler = (curTab) => {
        if (this.state.curTab !== curTab) {
            this.setState({curTab})
        }
    }

    inputSearchHandler = () => {
        this.props.onShowSearch();
    }

    render() {
        let loaderCnt = null;

        if (this.props.showLoader) {
            loaderCnt = (
                <div className="site-main__content--loader">
                    <Loader />
                </div>
            )
        }

        return (
            <div className="site-main__content">
                <div className="site-main__content--wrapper">
                    <div className="site-main__conv">
                        <div className="site-main__conv--header site-main__conv--header__sticky">
                        <div className="site-main__conv--header__wrapper">
                            <div>
                                <FontAwesomeIcon 
                                    icon={['far', 'comment-dots']} className="icon icon__site-main--conv__header--comment" />
                            </div>   
                                All Conversations
                            </div>
                            <div 
                                className="site-main__conv--header__search"
                                onClick={this.inputSearchHandler}>
                                <FontAwesomeIcon 
                                    icon={['fas', 'search']} className="icon icon__site-main--conv__header--search" />
                            </div>
                        </div>
                        <ul className="site-main__content--tab">
                            <MainNavigations 
                            content={this.state.private}
                            removeActive={this.removeActiveHandler.bind(this, 'private')}
                            active={this.state.curTab !== 'private' ? this.props.privateActive : null}/>
                            <MainNavigations 
                            content={this.state.group}
                            removeActive={this.removeActiveHandler.bind(this, 'group')}
                            active={this.state.curTab !== 'group' ? this.props.groupActive : null}/>
                        </ul>
                    </div>
                    <MainCnt /> 
                    { loaderCnt }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       userID: state.auth.userID,
       privateActive: state.main.privateActive,
       groupActive: state.main.groupActive,
       cntFetch: state.cnt.cnts !== null,
       showLoader: state.cnt.showLoader
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowSearch: () => dispatch(actions.startSearch()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));