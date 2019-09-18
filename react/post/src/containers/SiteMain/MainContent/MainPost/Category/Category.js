import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Category.css';
import * as actions from '../../../../../store/actions/index';

class Category extends Component {
    state = {
        categ: null,
        showCateg: false
    };

    showCategHandler = () => {
        if(!this.state.showCateg) {
            this.setState({showCateg: true});
            return;
        }
        this.setState({showCateg: false});
    }

    render() {
        let categOpt = null;
        let categOptClass = ['reuse-categ'];

        if (this.state.showCateg) {
            categOptClass.push('icon--rotate');
            categOpt = (
                <ul className="reuse-categ__opt reuse-categ__opt--visible">
                    <li><a href="/">Scholarships</a></li>
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


const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(null , mapDispatchToProps)(Category);