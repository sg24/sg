import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FilterUser from './FilterUser/FilterUser'; 

class Input extends Component {
    render() {
        let input = <FilterUser />;

        return (
            <div className="reuse-form__itm--tab__srch--input-wrapper">
                <div>
                    <FontAwesomeIcon 
                        icon={['far', 'calendar-alt']}/>
                </div>
                { input }
            </div>
        );
    }
};

export default Input;