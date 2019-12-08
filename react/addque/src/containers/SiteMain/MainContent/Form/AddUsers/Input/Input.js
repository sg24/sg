import React, { Component } from 'react';
import FilterUser from './FilterUser/FilterUser'; 

class Input extends Component {
    render() {
        let input = <FilterUser />;

        return (
            <div className="reuse-form__itm--tab__srch--input-wrapper">
                { input }
            </div>
        );
    }
};

export default Input;