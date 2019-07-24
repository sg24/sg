import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Question from '../../../../components/Main/Question/Question';
import { updateObject } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';

class Questions extends Component {
    state = {
        queOpt: null,
        filterTag: null
    }

    componentDidMount() {
        this.props.onFetchQue(this.props.userID);
        this.props.onChangeTag('/question');
    }

    componentDidUpdate() {
        if (this.props.questions && this.props.match.params.id && this.state.filterTag !== this.props.match.params.id) {
            this.props.onFilterQue(this.props.questions, this.props.match.params.id);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }
    }

    showUserOptHandler = (index) => {
        if (this.state.queOpt && this.state.queOpt.index === index) {
            this.setState((prevState, props) => {
                return {
                    queOpt: updateObject(prevState.queOpt, {visible: !prevState.queOpt.visible})
                }
            });
            return
        }

        const newQueOpt = {visible: true, index}
        this.setState({queOpt: newQueOpt})
    }

    changeFavoriteHandler = (queID) => {
        this.props.onChangeFav(this.props.questions, this.props.filteredQue, queID);
    }

    showShareHandler = (shareID) => {
        this.props.onChangeShareID(shareID);
        this.props.history.push('/index/share')
    }

    render() {
        let questions = "loading";

        if (this.props.questions) {
            questions = (
                <Question
                   content={this.props.questions}
                   userOpt={this.showUserOptHandler}
                   showQueOpt={this.state.queOpt}
                   fav={this.changeFavoriteHandler}
                   share={this.showShareHandler}/> 
            );
        };

        if (this.props.filteredQue && this.props.filteredQue.length > 0 && this.props.match.url !== '/index/question') {
            questions = (
                <Question
                   content={this.props.filteredQue}
                   userOpt={this.showUserOptHandler}
                   showQueOpt={this.state.queOpt}
                   fav={this.changeFavoriteHandler}
                   share={this.showShareHandler}/> 
            );
        }

        if (this.props.filteredQue && this.props.filteredQue.length < 1 && this.props.match.url !== '/index/question') {
            questions = "no category found";
        }

        return (
            questions  
        );  
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        questions: state.que.questions,
        filteredQue: state.que.filteredQue
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchQue: (userID) => dispatch(actions.fetchQueInit(userID)),
        onChangeFav: (questions, filteredQue, queID) => dispatch(actions.changeFavQueInit(questions, filteredQue, queID)),
        onChangeShareID: (shareID) => dispatch(actions.shareID(shareID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFilterQue: (que, tag) => dispatch(actions.filterQueInit(que, tag))
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions)); 