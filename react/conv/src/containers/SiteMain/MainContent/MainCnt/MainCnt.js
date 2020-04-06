import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MainCnt.css';
import Search from './Search/Search';
import Convs from './Convs/Convs';
import Aux from '../../../../hoc/Auxs/Aux';

class MainCnt extends Component {
    render() {
        return (
            <Aux>
                <Search />
                { this.props.chatSelected > 0 ?
                    <div className="reuse-conv-filter">
                    <div className="reuse-conv-filter__wrapper">
                        <div 
                            className="reuse-conv-filter__del"
                            onClick={this.deleteCntHandler}>
                               <FontAwesomeIcon 
                                icon={['far', 'trash-alt']} 
                                className="icon icon__reuse-conv-filter--srch" />
                        </div>
                    </div>
                </div> : null }
                <Convs />
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
     chatSelected: state.cnt.chatSelected
    };
 };

export default withRouter(connect(mapStateToProps,  null)(MainCnt));