import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Group from '../../../../components/Main/Group/Group';
import NoAcc from '../../../../components/Main/NoAcc/NoAcc';
import { updateObject } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';

class Groups extends Component {
    state = {
        grpOpt: null,
        filterTag: null
    };

    componentDidMount() {
        this.props.onFetchGroup(this.props.userID);
        this.props.onChangeTag('/group');
        this.props.onDefaultMainActive(this.props.mainProps, this.props.userID, 'group');
    }

    componentDidUpdate() {
        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id) {
            this.props.onFilterGrp(this.props.groups, this.props.match.params.id);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }
    }

    componentWillUnmount() {
        this.props.onFetchMainActive(this.props.mainProps, this.props.userID)
    }

    showUserOptHandler = (index) => {
        if (this.state.grpOpt && this.state.grpOpt.index === index) {
            this.setState((prevState, props) => {
                return {
                    grpOpt: updateObject(prevState.grpOpt, {visible: !prevState.grpOpt.visible})
                }
            });
            return
        }

        const newGrpOpt = {visible: true, index}
        this.setState({grpOpt: newGrpOpt})
    }

    render() {
        let groups = (
            <NoAcc
                isAuth={this.props.userID !== null}
                icnClass="icon icon__reuse-no-acc"
                det="Group" />
        ); 

        if (this.props.userID) {
            groups = "loading"
        }

        if (this.props.userID && this.props.groups) {
            groups =  (
                <Group
                    content={this.props.groups}
                    userOpt={this.showUserOptHandler}
                    showUserOpt={this.state.grpOpt}/>
            ); 
        }

        if (this.props.userID && this.props.filteredGrp && this.props.filteredGrp.length > 0 && this.props.match.url !== '/index/group') {
            groups =  (
                <Group
                    content={this.props.filteredGrp}
                    userOpt={this.showUserOptHandler}
                    showUserOpt={this.state.grpOpt}/>
            ); 
        }

        if (this.props.userID && this.props.filteredGrp && this.props.filteredGrp.length < 1 && this.props.match.url !== '/index/group') {
            groups = "no category found";
        }


        return (
            groups
        );
    }   
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        groups: state.grp.groups,
        filteredGrp: state.grp.filteredGrp,
        mainProps: state.main.mainProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchGroup: (userID) => dispatch(actions.fetchGroupInit(userID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFilterGrp: (grp, tag) => dispatch(actions.filterGrpInit(grp, tag)),
        onDefaultMainActive: (mainProps, userID, categ) => dispatch(actions.defaultMainActiveInit(mainProps, userID, categ)),
        onFetchMainActive: (mainProps, userID) => dispatch(actions.fetchMainActiveInit(mainProps, userID))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Groups)); 