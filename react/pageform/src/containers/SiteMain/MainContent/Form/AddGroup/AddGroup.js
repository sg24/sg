import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { updateObject } from '../../../../../shared/utility';
import * as actions from '../../../../../store/actions/index';
import Loader from '../../../../../components/UI/Loader/Loader';
import Groups from '../../../../../components/Main/Groups/Groups';
import Backdrop from '../../../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../../../components/UI/Modal/Modal';
import Aux from '../../../../../hoc/Auxs/Aux';

class AddUsers extends Component {
    state = {
        curTab: 'online',
        showNewTab: false,
        groups: null,
        showInput: false,
        groupSelected: this.props.media.group ? [...this.props.media.group] : [],
        showUserSelect: false
    };

    componentDidMount() {
        this.props.onFetchGroup();
    }

    selectedGroupHandler = (group) => {
        let groupSelectedArray = [...this.state.groupSelected];
        let groupSelected = groupSelectedArray.filter(groupID => groupID === group.id );
        if (groupSelected.length > 0) {
            let updateUserSelectArray = [...groupSelectedArray.filter(groupID => groupID !== group.id )];
            this.setState({groupSelected: updateUserSelectArray});
            if (this.props.media.group && this.props.media.group.length > 0) {
                this.props.onAddGroupSelect(updateObject(this.props.media, {group: updateUserSelectArray}));
            }
            return
        }

        groupSelectedArray.push(group.id)
        this.setState({groupSelected: groupSelectedArray});
        if (this.props.media.group && this.props.media.group.length > 0) {
            this.props.onAddGroupSelect(updateObject(this.props.media, {group: groupSelectedArray}));
        }
    }

    submitMediaHandler = () => {
        let groupSelected = [...this.state.groupSelected];
        let media = {...this.props.media};
        this.props.onSubmitMedia(updateObject(media, {group: groupSelected}));
    }

    closeMediaBoxHandler = () => {
        this.props.onhideMediaBox();
    }

    render() {
        let groups = null;

        if (!this.props.group) {
            groups = <Loader />
        }

        if (this.props.groups) {
            groups = <Groups 
                content={this.props.groups}
                selected={this.selectedGroupHandler}
                selectedGroup={this.state.groupSelected}/>
        }

        return (
            <div className="reuse-form__itm reuse-form__itm--user">
                <div className="reuse-form__itm--wrapper">
                    <div className="reuse-form__itm--tab">
                        <ul className="reuse-form__itm--tab__cnt">
                            <li className="active-content-tab"> Chat Room </li>
                        </ul>
                    </div>
                    
                    <div className="reuse-form__itm--det">
                    { groups }
                    </div>
                    { this.props.cntErr ?
                        <Aux>
                            <Backdrop close={this.closeBackdropHandler}><Modal uploadErr={this.props.cntErr} type='categ' /></Backdrop>
                        </Aux> : null
                    }
                </div>
                <div className="reuse-form__itm--footer reuse-form__btn">
                    <button 
                        type="button" 
                        className="reuse-form__btn--close"
                        onClick={this.closeMediaBoxHandler}>Exit</button>
                    <button 
                        type="button" 
                        className="reuse-form__btn--add"
                        onClick={this.submitMediaHandler}
                        disabled={this.state.groupSelected.length < 1}>Add</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>  {
    return {
        groups: state.form.groups,
        filteredGroup: state.form.filteredGroup,
        media: state.form.media,
        cntErr: state.form.cntErr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchGroup: () => dispatch(actions.fetchGroupInit()),
        onAddGroupSelect: (groups) => dispatch(actions.groupSelect(groups)),
        onSubmitMedia: (media) => dispatch(actions.submitMedia(media)),
        onhideMediaBox: () => dispatch(actions.hideMediaBox())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);