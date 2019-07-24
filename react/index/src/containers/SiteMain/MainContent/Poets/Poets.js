import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Poet from '../../../../components/Main/Poet/Poet';
import { updateObject } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';

class Poets extends Component {
    state = {
        pwtOpt: null,
        filterTag: null
    }

    componentDidMount() {
        this.props.onFetchPoets(this.props.userID);
        this.props.onChangeTag('/poet');
    }

    componentDidUpdate() {
        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id) {
            this.props.onFilterPoets(this.props.poets, this.props.match.params.id);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }
    }

    showUserOptHandler = (index) => {
        if (this.state.pwtOpt && this.state.pwtOpt.index === index) {
            this.setState((prevState, props) => {
                return {
                    pwtOpt: updateObject(prevState.pwtOpt, {visible: !prevState.pwtOpt.visible})
                }
            });
            return
        }

        const newPwtOpt = {visible: true, index}
        this.setState({pwtOpt: newPwtOpt})
    }

    changeFavoriteHandler = (pwtID) => {
        this.props.onChangeFav(this.props.poets, this.props.filterPoet, pwtID);
    }

    showShareHandler = (shareID) => {
        this.props.onChangeShareID(shareID);
        this.props.history.push('/index/share')
    };

    render() {
        let poet = "loading";

        if (this.props.poets) {
            poet = <Poet 
                content={this.props.poets}
                userOpt={this.showUserOptHandler}
                showPwtOpt={this.state.pwtOpt}
                fav={this.changeFavoriteHandler}
                share={this.showShareHandler}/>
        }

        if (this.props.filterPoet && this.props.filterPoet.length > 0 && this.props.match.url !== '/index/poet') {
            poet = <Poet 
                content={this.props.filterPoet}
                userOpt={this.showUserOptHandler}
                showPwtOpt={this.state.pwtOpt}
                fav={this.changeFavoriteHandler}
                share={this.showShareHandler}/>
        }

        if (this.props.filterPoet && this.props.filterPoet.length < 1 && this.props.match.url !== '/index/poet') {
            poet = "no category found";
        }

        return poet
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        poets: state.pwt.poets,
        filterPoet: state.pwt.filterPoet
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPoets: (userID) => dispatch(actions.fetchPoetInit(userID)),
        onChangeFav: (poets, filterPoet, pwtID) => dispatch(actions.changeFavPoetInit(poets, filterPoet, pwtID)),
        onChangeShareID: (shareID) => dispatch(actions.shareID(shareID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFilterPoets: (poets, tag) => dispatch(actions.filterPoetInit(poets, tag))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Poets));