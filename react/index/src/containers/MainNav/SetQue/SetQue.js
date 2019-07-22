import React, { Component } from 'react';
import { connect } from 'react-redux';

import SetQueCateg from '../../../components/Main/Nav/SetQueCateg/SetQueCateg'
import * as actions from '../../../store/actions/index';

class SetQue extends Component {
    state = {
        showCateg: false,
        queCateg: 'Category'
    };

    fetchCategoryHandler = () => {
        this.setState((prevState, props) => {
            return {
                showCateg: !prevState.showCateg
            };
        });
    }

    changeQueCategHandler = (queCateg) => {
        this.setState({
            queCateg
        })
    }

    render() {
        let categ = null;
        let categClass = ['reuse-set__categ'];
        let categOptClass = ['reuse-set__categ--opt'];

        if (!this.props.categ && this.state.showCateg) {
            this.props.onFetchCateg();
        }
    
        if (this.state.showCateg) {
            categClass.push('icon--rotate')
            categOptClass.push('reuse-set__categ--opt__visible');
        }

        if (this.props.categ && this.state.showCateg) {
            categ = <SetQueCateg 
            category={this.props.categ}
            queCateg={this.changeQueCategHandler}/>
        }

        return (
            <div className="reuse-set">
                <div className="reuse-set__header">
                    <i className="far fa-clock icon icon__reuse-set--tm"></i>
                    <span>Set Timed Question</span>
                    <span className="reuse-set__header--startQues">
                        <a href="/">start</a>
                    </span>
                </div>
                <div className={categClass.join(' ')} onClick={this.fetchCategoryHandler}>
                    { this.state.queCateg } <i className="fas fa-angle-down icon icon__reuse-set--angle"></i>
                    <ul className={categOptClass.join(' ')}>
                        { categ }
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToPros = state => {
    return {
        categ: state.setQue.categ
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCateg: () => dispatch(actions.fetchCategInit())
    };
}
    
export default connect(mapStateToPros, mapDispatchToProps)(SetQue);