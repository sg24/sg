import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Question from '../../../../components/Main/QueHelp/Question/Question';
import QueHelp from '../../../../components/Main/QueHelp/QueHelp';
import { updateObject } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';


class HelpMe extends Component {
    constructor() {
        super();
        this.state = {
            queOpt: null,
            filterTag: null
        };
    }

    componentDidMount() {
        this.props.onFetchHelpMeQue(this.props.userID);
        this.props.onChangeTag('/helpme');
        this.props.onDefaultMainActive(this.props.mainProps, this.props.userID, 'helpme');
    }

    componentDidUpdate() {
        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id) {
            this.props.onFilterHelpmeQue(this.props.questions, this.props.match.params.id);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }
    }

    componentWillUnmount() {
        this.props.onFetchMainActive(this.props.mainProps, this.props.userID)
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
        this.props.onChangeFav(this.props.questions, this.props.filterQue, queID); 
    }

    showShareHandler = (shareID) => {
        this.props.onChangeShareID(shareID);
        this.props.history.push('/index/share')
    };

    render() {
        let helpMeQue = (
            <QueHelp
                isAuth={this.props.userID !== null} />
        );

        if (this.props.userID) {
            helpMeQue = "loading";
        }
       
        if (this.props.userID && this.props.questions && this.props.isQue) {
            helpMeQue = (
                <Question
                content={this.props.questions}
                userOpt={this.showUserOptHandler}
                showQueOpt={this.state.queOpt}
                fav={this.changeFavoriteHandler}
                queType="helpme-que"
                share={this.showShareHandler}/> 
            );
        }

        if (this.props.userID && this.props.questions && this.props.isQue && this.props.filterQue && this.props.filterQue.length > 0 && this.props.match.url !== '/index/helpme') {
            helpMeQue = (
                <Question
                content={this.props.filterQue}
                userOpt={this.showUserOptHandler}
                showQueOpt={this.state.queOpt}
                fav={this.changeFavoriteHandler}
                queType="helpme-que"
                share={this.showShareHandler}/> 
            );
        }

        if (this.props.userID && this.props.questions && this.props.isQue && this.props.filterQue && this.props.filterQue.length < 1 && this.props.match.url !== '/index/helpme') {
            helpMeQue = "no category found";
        }


        return helpMeQue
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        questions: state.helpme.questions,
        isQue: state.helpme.isQue,
        filterQue: state.helpme.filterQue,
        mainProps: state.main.mainProps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchHelpMeQue: (userID) => dispatch(actions.fetchHelpMeQueInit(userID)),
        onChangeFav: (questions, filterQue, queID) => dispatch(actions.changeFavHelpMeQueInit(questions, filterQue, queID)),
        onChangeShareID: (shareID) => dispatch(actions.shareID(shareID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFilterHelpmeQue: (que, tag) => dispatch(actions.filterHelpmeQueInit(que, tag))
    };
}; 


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HelpMe));