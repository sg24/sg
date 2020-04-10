import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Groups.css';
import * as actions from '../../../../../store/actions/index';
import Loader from '../../../../../components/UI/Loader/Loader';
import GroupContent from '../../../../../components/Main/GroupContents/GroupContents';
import Backdrop from '../../../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../../../components/UI/Modal/Modal';
import { createChat } from '../../../../../shared/utility';

class Groups extends Component {
    state = {
        err: null,
        inputValue: '',
        id: this.props.match.params.id,
        categ: this.props.match.params.categ,
        groups: null
    }

    componentDidMount() {
        let these = this;
        createChat(`/chat/${this.state.categ}/${this.state.id}`, 
            'allgroup', {}).then(res => {
                these.props.onFetchGroup(res)
        }).catch(err => {
            these.props.onTypingErr(err)
        })
    }


    componentDidUpdate(props, state) {
        if (!this.props.filterGrp && this.props.groups && (JSON.stringify(this.props.groups) !== JSON.stringify(this.state.groups))) {
            this.setState({groups: this.props.groups})
        }

        if (this.props.filterGrp && JSON.stringify(this.props.filterGrp) !== JSON.stringify(this.state.groups)) {
            this.setState({groups: this.props.filterGrp})
        }
    }

    closeModelBackdropHandler = () => {
        this.props.onCloseBackdrop()
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}`)
    }

    filterGroupHandler = (event) => {
        this.setState({inputValue: event.target.value})
        this.props.onFilterGroup(event.target.value)
    } 

    render() {
        let grpCnt =<Loader />
        let grp = null;
        if (this.props.groups){
            grpCnt = <GroupContent 
                cnts={this.state.groups}/>
        }

        grp = (
            <div className="site-main__chat--grp__wrapper">
                <div className="site-main__chat--grp__close">
                    <h4>My Groups</h4>
                    <div 
                        className="site-main__chat--grp__close--wrapper"
                        onClick={this.closeModelBackdropHandler}>
                        <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                    </div>
                </div>
                <input 
                    type="text" 
                    className="site-main__chat--grp__input" 
                    placeholder="Enter group name..."
                    onChange={this.filterGroupHandler}
                    value={this.state.inputValue}/>
                <div className="site-main__chat--grp__cnt">
                    { grpCnt }
                </div>
            </div>
        )

        if (this.props.grpErr || this.state.err){
            grp = (
                <Backdrop 
                    component={ Modal }
                    close={this.closeModelBackdropHandler}
                    err={ this.props.grpErr || this.state.err } />
            )
        }

        return (
            <div className="site-main__chat--grp">
                { grp }
            </div>
        )
    }
};


const mapStateToProps = state => {
    return {
        groups: state.cnt.groups,
        grpErr: state.cnt.grpErr,
        filterGrp: state.cnt.filterGrp
    };
 }

 const mapDispatchToProps = dispatch => {
    return {
        onCloseBackdrop: () => dispatch(actions.closeBackdrop()),
        onFilterGroup: (filterContent) => dispatch(actions.filterGroup(filterContent)),
        onFetchGroup: (grp) => dispatch(actions.fetchGroup(grp))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Groups)); 