import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Input.css';
import FilterUser from './FilterUser/FilterUser'; 
import FilterUserSelect from './FilterUserSelect/FilterUserSelect'; 

class Input extends Component {
    render() {
        let input = <FilterUser />;

        if (!this.props.viewAllUsers) {
            input = <FilterUserSelect />;
        }

        return (
            <div className="reuse-share__search">
                { input }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        viewAllUsers: state.share.viewAllUsers
    };
};
  
export default connect(mapStateToProps, null)(Input);