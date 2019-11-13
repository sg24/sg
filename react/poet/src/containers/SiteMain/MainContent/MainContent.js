import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import MainModel from './MainModel/MainModel'; 

class MainContent extends Component {
    state = {
        cnt: {
            path: '/poet',
            icnGrp: 'book',
            icnClass: 'icon icon__site-main__ptwrit--tab',
            title: 'poet&writers',
        },
        share: {
            path: '/poet/shared',
            icnGrp: 'location-arrow',
            icnClass: 'icon icon__site-main__ptwrit--tab',
            title: 'Shared',
        },
        curTab: 'poet',
        showCntActive: false,
        showShareActive: true,
        updateTab: ''
    }

    componentDidUpdate() {
        if (this.state.curTab !== this.state.updateTab) {
            this.props.onResetActive(this.props.userID, 'poet');
            this.setState({updateTab: this.state.curTab})
        }
    }

    removeActiveHandler = (curTab) => {
        this.props.onResetActive(this.props.userID, curTab);
        if (curTab === 'poet') {
            this.setState((prevState, props) => {
                return {
                    showCntActive: false,
                    showShareActive: true,
                    curTab: 'poet'  
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
                        removeActive={this.removeActiveHandler.bind(this, 'poet')}
                        active={this.state.showCntActive ? this.props.cntActive : null}/>
                    <MainNavigations 
                        content={this.state.share}
                        removeActive={this.removeActiveHandler.bind(this, 'share')}
                        active={this.state.showShareActive ? this.props.shareCntActive : null}/>
                    </ul>
                    <MainModel />
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