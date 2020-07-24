import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import 'promise-polyfill/src/polyfill';

import './Examtab.css';
import * as actions from '../../../../store/actions/index';
import Exam from './Exam';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import Loader from '../../../../components/UI/Loader/Loader';
import Modal from '../../../../components/UI/Modal/Modal';
import Aux from '../../../../hoc/Auxs/Aux';
import Submit from './Submit/Submit';

class Examtab extends Component {
    state = {
        id: this.props.match.params.id
    }

    componentDidMount() {
       this.props.onFetchCnt(this.state.id);
    }

    componentWillUnmount() {
      
    }
    
    render() {
        let cnt =  (
            <Loader />
        )
        let submit = null;

        if (this.props.err) {
            cnt = (
                <Aux>
                    <Backdrop 
                        component={ Modal }
                        close={this.closeModelBackdropHandler}
                        err={ this.props.err } /> 
                </Aux>
            )
        }

        if (this.props.cnt) {
            cnt = (
                <>
                    <Exam 
                        question={this.props.cnt.question}
                        duration={this.props.cnt.duration}/>
                </>
            );
        }

        if (this.props.submit) {
            submit = (
                <Submit 
                    id={this.props.cnt.id}
                    title={this.props.cnt.title}
                    examID={this.state.id}
                    totalScore={this.props.totalScore}
                    correction={this.props.correction}/>
            )
        }
        return (
            <>
                <div className="exam-cnt">
                    <div className="exam-cnt__wrapper">
                        { cnt }
                    </div>
                </div>
                { submit }
            </>
        )
    }
};

const mapStateToProps = state => {
    return {
        cnt: state.examtab.cnt,
        err: state.examtab.err,
        submit: state.examtab.submit,
        totalScore: state.examtab.totalScore,
        correction: state.examtab.correction
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCnt: (id) => dispatch(actions.fetchCntInit(id))
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examtab));