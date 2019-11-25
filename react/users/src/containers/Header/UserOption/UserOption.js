import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';

import * as actions from '../../../store/actions/index';

class UserOption extends Component {
    state ={
        show: false,
        default: false
    };

    componentDidUpdate() {
        if (this.state.show && !this.state.default && this.props.hidUserOption) {
            this.setState({
                default: true,
                show: false
            });
        }
    }

    showUserOptionHandler = () => {
        this.props.onShowUserOption();
        this.setState((prevState, props) => {
            return {
                default: false,
                show: !prevState.show
            }
        }) 
    }

    render() {
        let userDetClass = ["site-header__user--det"];
        let userImg = <img className="site-header__user--img" src={this.props.img} alt={this.props.username}/>;

        if (this.state.show) {
            userDetClass.push("site-header__user--det__visible")
        };

        if (this.props.username && !this.props.img) {
            userImg = <Avatar  name={this.props.username} size='30' round />;
        }

        return ( 
            <div 
                className="site-header__user"
                onClick={this.showUserOptionHandler}>
                { userImg }
                <ul className={userDetClass.join(' ')}>
                    <li className="site-header__user--det__portal">
                    <a href="/acc">
                        <div className="site-header__user--det__portal--img">
                        { userImg }
                        </div>
                        My Portal 
                        </a>  
                    </li>
                    <li className="site-header__user--det__acc">
                        <a href="/acc/set">
                            <div>
                                <FontAwesomeIcon 
                                    icon={['fas', 'cogs']} 
                                    className="icon icon__site-header--user__set" />
                            </div>
                            Account Settings
                        </a>
                    </li>
                    <li className="site-header__user--det__logout">
                        <a href="/logout">
                            <div>
                                <FontAwesomeIcon 
                                    icon={['fas', 'angle-double-right']} 
                                    className="icon icon__site-header--user__log" /> 
                            </div>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return({
        hidUserOption: state.header.hidUserOption,
        img: state.auth.img,
        username: state.auth.username
    })
};

const mapDispatchToProps = dispatch => {
    return({
        onShowUserOption: () => dispatch(actions.showUserOption())
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOption);