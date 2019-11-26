import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Category.css';
import PtCategory from '../../../../../components/Main/PtCategory/PtCategory';

class Category extends Component {
    state = {
        categ: ['post','question','poet'],
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
                <ul className="reuse-categ__opt">
                    <PtCategory 
                        category={this.state.categ}/>
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

export default Category;