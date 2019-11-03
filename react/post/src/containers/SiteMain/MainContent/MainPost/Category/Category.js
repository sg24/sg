import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Category.css';
import * as actions from '../../../../../store/actions/index';
import PtCategory from '../../../../../components/Main/PtCategory/PtCategory';

class Category extends Component {
    state = {
        categ: null,
        showCateg: false
    };

    showCategHandler = () => {
        if(!this.state.showCateg) {
            this.setState({showCateg: true});
            this.props.onFetchCateg(this.props.tags);
            return;
        }
        this.setState({showCateg: false});
    }

    render() {
        let category = 'loading ...';
        let categOpt = null;
        let categOptClass = ['reuse-categ'];

        if (this.props.categ && this.props.categ.length > 0) {
            category = <PtCategory 
                category={this.props.categ}/>
        }
    
        if (this.state.showCateg) {
            categOptClass.push('icon--rotate');
            categOpt = (
                <ul className="reuse-categ__opt">
                    { category }
                </ul>
            )
        }

        return (
            <div 
                className={categOptClass.join(' ')}
                onClick={this.showCategHandler}>
                <div>
                    Category 
                    <FontAwesomeIcon 
                        icon={['fas', 'angle-down']} 
                        className="icon icon__reuse-categ--angle"/>
                </div>
                { categOpt }
            </div>    
        );
    }
}

const mapStateToProps = state => {
    return {
        categ: state.filter.ptCateg,
        tags: state.tags.tags
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCateg: (categ) => dispatch(actions.fetchPtCategInit(categ))
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(Category);