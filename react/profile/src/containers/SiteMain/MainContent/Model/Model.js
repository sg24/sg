import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../../../components/UI/Loader/Loader';
import Users from '../../../../components/Main/Users/Users';
import * as actions from '../../../../store/actions/index';

class Model extends Component {
    state = {
        editEnable: false,
        inputValue: '',
        updateDet: false,
        userDet: null,
        active: null
    }

    componentDidMount() {
        this.props.onFetchCnt(this.props.match.params.id);
        let active = setInterval(() => {
            this.props.onFetchShareActive();
            this.props.onFetchNotifyActive();
        }, 5000);
        this.setState({active})
    }

    componentWillUnmount() {
        if (this.state.active) {
            clearInterval(this.state.active)
        }
    }

    componentDidUpdate() {
        if (this.props.det !== this.state.userDet && this.state.updateDet && this.state.editEnable) {
            this.setState({userDet: this.props.det, editEnable:false})
        }

        if (this.props.cnts && this.props.det !== this.state.inputValue && !this.state.updateDet) {
            this.setState({userDet: this.props.det, inputValue: this.props.det, updateDet: true})
        }
    }

    changeCntHandler = (id, title, det, confirm, modelType) => {
        this.props.onChangeCnt(id, title, det, confirm, modelType);
    };

    editProfileHandler = () => {
        this.setState((prevState, props) =>  {
            return {
                editEnable: !prevState.editEnable
            }
        })
    }

    inputChangedHandler = (event) => {
        this.setState({inputValue: event.target.value})
    }

    saveProfileHandler = () => {
         if (this.state.inputValue !== this.state.userDet) {
            this.props.onSaveAbout(this.state.inputValue,this.props.match.params.id)
        }
    }

    changeImageHandler = () => {
        this.props.onChangeImage(this.props.match.params.id)
    }

    render() {
        let cnt = <Loader 
            view/>;
        
        if (this.props.cntErr) {
            cnt = null
        }
       
        if (this.props.cnts) {
            cnt = <Users 
                cnt={this.props.cnts}
                changeCnt={this.changeCntHandler}
                editProfile={this.editProfileHandler}
                editEnable={this.state.editEnable}
                inputChanged={this.inputChangedHandler}
                inputValue={this.state.inputValue}
                saveProfile={this.saveProfileHandler}
                start={this.props.start}
                saveEnable={this.state.inputValue !== this.props.det}
                updateDet={this.props.det}
                changeImage={this.changeImageHandler}/>
        }

        return cnt
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        cnts: state.cnt.cnts,
        cntErr: state.cnt.cntErr,
        addUser: state.cnt.addUser,
        pending: state.cnt.pending,
        request: state.cnt.request,
        blocked: state.cnt.blocked,
        accept: state.cnt.accept,
        start: state.cnt.start,
        det: state.cnt.det
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShareActive: () => dispatch(actions.fetchShareactiveInit()),
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onFetchCnt: (userID) => dispatch(actions.fetchCntInit(userID)),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm, modelType)),
        onSaveAbout: (about,userID) => dispatch(actions.saveAboutInit(about, userID)),
        onChangeImage: (userID) => dispatch(actions.changeImage(userID))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Model));