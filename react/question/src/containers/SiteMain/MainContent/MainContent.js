import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import MainQue from './MainQue/MainQue'; 

class MainContent extends Component {
    state = {
        cnt: {
            path: '/question',
            icnGrp: 'clone',
            icnClass: 'icon icon__site-main--content__tab',
            title: 'Question',
        },
        share: {
            path: '/question/shared',
            icnGrp: 'hand-paper',
            icnClass: 'icon icon__site-main--content__tab',
            title: 'Help Me',
        },
        curTab: 'question',
        showCntActive: false,
        showShareActive: true,
        updateTab: ''
    }

    componentDidUpdate() {
        if (this.state.curTab !== this.state.updateTab) {
            this.props.onResetActive(this.props.userID, 'question');
            this.setState({updateTab: this.state.curTab})
        }
    }

    removeActiveHandler = (curTab) => {
        this.props.onResetActive(this.props.userID, curTab);
        if (curTab === 'question') {
            this.setState((prevState, props) => {
                return {
                    showCntActive: false,
                    showShareActive: true,
                    curTab: 'question'  
                }
            });
            return
        }
        this.setState((prevState, props) => {
            return {
              showCntActive: true,
              showShareActive: false,
              curTab: 'share'
            }
        });
    }

    render() {
        return (
            <div className="site-main__content">
                <div className="site-main__content--wrapper">
                    <ul className="site-main__content--tab">
                    <MainNavigations 
                        content={this.state.cnt}
                        removeActive={this.removeActiveHandler.bind(this, 'question')}
                        active={this.state.showCntActive ? this.props.cntActive : null}/>
                    <MainNavigations 
                        content={this.state.share}
                        removeActive={this.removeActiveHandler.bind(this, 'share')}
                        active={this.state.showShareActive ? this.props.shareCntActive : null}/>
                    </ul>
                    <MainQue />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       userID: state.auth.userID,
       shareCntActive: state.main.shareCntActive,
       cntActive: state.main.cntActive
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetActive: (userID, curTab) => dispatch(actions.resetActiveInit(userID, curTab))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));