import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import Aux from '../../../hoc/Auxs/Aux';
// import Tags from './Tags/Tags';
import TopTrending from './TopTrending/TopTrending';
import Conversation from './Conversation/Conversation';
import SetQue from './SetQue/SetQue';

class MainNav extends Component {
    state = {
        showConv: false
    }

    showConvHandler = () => {
        this.setState((prevState, props) => {
            return {
                showConv: !prevState.showConv
            };
        });
    }

    render() {
        let mainNavItm = (
            <Aux>
                {/* <Tags/> */}
                <TopTrending />
                <SetQue />
            </Aux>
        );

        let navExchangeClass = [];

        if (this.state.showConv) {
            mainNavItm = <Conversation />
            navExchangeClass.push('active-site-nav-exch ');
        }

        return (
            <div className="site-main__nav site-main__nav--sticky">
                <div className="site-main__nav--wrapper">
                    <ul className="site-main__nav--header">
                        {/* <li 
                            className={navExchangeClass.join(' ')}
                            onClick={this.showConvHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'exchange-alt']} />
                            {this.props.navActive && this.props.navActive > 0 ? 
                                <div className="active__main active__main--nav">
                                <div> {this.props.navActive } </div>
                            </div> : null}
                        </li> */}
                    </ul>
                    { mainNavItm }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        navActive: state.main.navActive
    };
 }


export default connect(mapStateToProps, null)(MainNav); 