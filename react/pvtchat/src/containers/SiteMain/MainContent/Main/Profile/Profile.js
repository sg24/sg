import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Profile.css';
import Loader from '../../../../../components/UI/Loader/Loader';
import Users from '../../../../../components/Main/PrfUsers/PrfUsers';
import * as actions from '../../../../../store/actions/index';
import Backdrop from '../../../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../../../components/UI/Modal/Modal';

class Model extends Component {
    state = {
        editEnable: false,
        inputValue: '',
        updateDet: false,
        userDet: null,
        id: this.props.match.params.id,
        categ: this.props.match.params.categ,
    }

    componentDidMount() {
        this.props.onFetchCnt(this.props.match.params.id);
    }

    componentDidUpdate() {
        if (this.props.det !== this.state.userDet && this.state.updateDet && this.state.editEnable) {
            this.setState({userDet: this.props.det, editEnable:false})
        }

        if (this.props.cnts && this.props.det !== this.state.inputValue && !this.state.updateDet) {
            this.setState({userDet: this.props.det, inputValue: this.props.det, updateDet: true})
        }
    }

    closeModelBackdropHandler = () => {
        this.props.onCloseChangeCnt()
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}`)
    }

    changeCntHandler = (id, title, det, confirm, modelType) => {
        this.props.onChangeCnt(id, title, det, confirm, modelType);
    };

    closeChangeCntHandler = () => {
        this.props.onCloseChangeCnt()
    }

    startChangeHandler = () => {
        this.props.onChangeCnt(this.props.changeCntStart.id, null, this.props.changeCntStart.det, true, this.props.changeCntStart.modelType)
    }

    chatHandler = () => {
        this.props.history.push(`/chat/user/${this.state.id}`)
    }

    render() {
        let prfCnt = <Loader 
            view/>;

        let cnt = null;
       
        if (this.props.cnts) {
            prfCnt = <Users 
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
                chat={this.chatHandler}/>
        }

        cnt = (
            <div className="site-main__chat--prf__wrapper">
                <div className="site-main__chat--prf__close">
                    <h4>Profile</h4>
                    <div 
                        className="site-main__chat--prf__close--wrapper"
                        onClick={this.closeModelBackdropHandler}>
                        <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                    </div>
                </div>
                <div className="site-main__chat--prf__cnt">
                    { prfCnt }
                </div>
            </div>
        )

        if (this.props.cntErr || this.state.err || this.props.changeCntErr){
            cnt = (
                <Backdrop 
                    component={ Modal }
                    close={this.closeModelBackdropHandler}
                    err={ this.props.cntErr || this.state.err || this.props.changeCntErr} />
            )
        }

        if (this.props.changeCnt) {
           window.location.assign('/users')
        }

        return (
            <div className="site-main__chat--prf">
                { cnt }
                { this.props.changeCntStart !== null ? 
                    <Backdrop   
                        show={ this.props.showBackdrop }
                        component={ Modal }
                        err={ this.props.changeCntErr }
                        warn={{
                            msg: 'Are you sure you want to remove this user',
                            cnt: this.props.changeCntStart.title,
                            det: this.props.changeCntStart.det
                        }}
                        exit={{
                            msg: 'user removed Successfully', 
                            close: this.props.changeCnt}}
                            changeCnt={this.startChangeHandler}
                            closeChangeCnt={this.closeChangeCntHandler}/> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        cnts: state.prf.cnts,
        cntErr: state.prf.cntErr,
        det: state.prf.det,
        changeCntStart: state.prf.changeCntStart,
        changeCntErr: state.prf.changeCntErr,
        changeCnt: state.prf.changeCnt
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCnt: (userID) => dispatch(actions.fetchPrfInit(userID)),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changePrfInit(id, title, det, confirm, modelType)),
        onCloseChangeCnt: () => dispatch(actions.changePrfCancel())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Model));