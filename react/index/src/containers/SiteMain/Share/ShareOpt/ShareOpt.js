import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShareUsers from '../../../../components/ShareContent/ShareUsers/ShareUsers';
import SocialMed from '../../../../components/ShareContent/SocialMed/SocialMed';
import SwitchOpt from '../../../../components/ShareContent/SwitchOpt/SwitchOpt';
import * as actions from '../../../../store/actions/index';
import Aux from '../../../../hoc/Auxs/Aux';

class ShareOpt extends Component {
    state = {
        showSocialMed: true,
        showShareUser: false,
        userSelect: null
    };

    componentDidUpdate(props, state) {
        if (this.state.userSelect !== this.props.userSelect) {
            this.setState((prevState, props) => {
                return {
                    showSocialMed: this.props.userSelect.length > 0 ? false : true,
                    showShareUser: this.props.userSelect.length > 0,
                    userSelect: this.props.userSelect
                };
            })
        };
    };

    switchShareOptHandler = () => {
        this.setState((prevState, props) => {
            return {
                showSocialMed: !prevState.showSocialMed,
                showShareUser: !prevState.showShareUser
            };
        })
    }

    viewUsersHandler = () => {
        this.props.onViewUsers()
    }

    shareUserHandler = () => {
        this.props.onShareUser(this.props.userSelect, this.props.shareID, this.props.cntType)
    };

    render() {
        let show = null;
        
            if (this.state.showSocialMed) {
                show = <SocialMed />;
            }
         
            if (this.state.userSelect && this.state.userSelect.length > 0 && this.state.showSocialMed ) {
                show = (
                    <Aux>
                        <SocialMed 
                            switchOpt/>
                        <SwitchOpt 
                            switchOpt={this.switchShareOptHandler}/>
                    </Aux>
                );
            }
        
            if (this.state.showShareUser) {  
            show = (
                <Aux>
                    <ShareUsers 
                        userSelect={this.state.userSelect}
                        viewUsers={this.viewUsersHandler}
                        viewAllUsers={this.props.viewAllUsers}
                        shareUser={this.shareUserHandler}/> 
                    <SwitchOpt 
                        switchOpt={this.switchShareOptHandler}/>
                </Aux>
            );
            }
            
        
            return show
    }
}

const mapStateToProps = state => {
    return {
        userSelect: state.share.userSelect,
        viewAllUsers: state.share.viewAllUsers,
        shareID: state.share.shareID,
        cntType: state.share.cntType
    };
};

const mapDispatchToProp = dispatch => {
    return {
        onViewUsers: () => dispatch(actions.viewUsers()),
        onShareUser: (userSelect, shareID, cntType) => dispatch(actions.shareUserInit(userSelect, shareID, cntType))
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(ShareOpt);
    
