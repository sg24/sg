import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Chats from '../../../../../components/Main/Chats/Chats';
import './ChatBox.css';
import Loader from '../../../../../components/UI/Loader/Loader';
import * as actions from '../../../../../store/actions/index';

class ChatBox extends Component {
    state = {
        searchTotal: 0,
        hold: null,
        scrollEnable: false,
        id: this.props.match.params.id,
        categ: this.props.match.params.categ,
        chatLimit: 300,
        err: null
    }

    componentDidMount() {
        this.props.onFetchChat(this.state.id, this.state.categ, this.state.chatLimit, 0, 0)
    }

    componentDidUpdate() {
        if (this.props.chat && this.props.chat.length > 0 && !this.state.scrollEnable) {
           document.querySelector('.site-main__chat--box').addEventListener('scroll', this.onScroll, false);
            this.setState({scrollEnable: true})
        }
    }

    onScroll = () => {
        if (document.querySelector('.site-main__chat--box').scrollTop <= 0) {
            this.props.onFetchChat(this.state.id, this.state.categ,
                this.state.chatLimit, this.props.skipChat + this.state.chatLimit, this.props.chatTotal);
        }
    } 

    scrollToBottom = () => {
        if (this.props.chatSelected.length < 1 && document.querySelector('.site-main__chat--box__wrapper') && document.querySelector('.site-main__chat--box__wrapper > div') && document.querySelectorAll('.site-main__chat--srch__highlight').length < 1) { 
            // let chatBox = document.querySelector('.site-main__chat--box'); 
            // let scrollTop = chatBox.scrollTop;
            // let chatWrapper = document.querySelector('.site-main__chat--box__wrapper')
            // let scrollHeight = chatWrapper.scrollHeight;
            // if (scrollTop >= scrollHeight/4) {
            //     console.log(chatWrapper.lastChild)
            // }
            document.querySelector('.site-main__chat--box__wrapper') && document.querySelector('.site-main__chat--box__wrapper > div:last-child').scrollIntoView()
        }
    }

    chatHoldHandler = (id) => {
        let hold = setTimeout(() => {
            this.props.onHoldChat(id);
        },1000)
        this.setState({hold})
    }

    chatReleasedHandler = (id) => {
        clearTimeout(this.state.hold);
    }

    render() {
        let typing = null;
        let chat = <Loader />
        
        if (this.props.typing && this.props.typing.length > 0) {
            typing = (
                <div className="site-main__chat--box__usr-typing">
                    <div className="site-main__chat--box__usr-typing--cir-up"></div>
                    <div className="site-main__chat--box__usr-typing--cir-dwn"></div>
                    <div className="site-main__chat--box__usr-typing--cir-up"></div>
                    <div className="site-main__chat--box__usr-typing--cir-dwn"></div>
                    <div className="site-main__chat--box__usr-typing--cir-up"></div>
                    <div className="site-main__chat--box__usr-typing--cir-dwn"></div>
                </div>
            )
        }

        if (!this.props.chatLoader) {
            chat = (
                <Chats 
                    cnts={this.props.chat}
                    users={this.props.members && this.props.members.users  ? this.props.members.users.online : []}
                    filterChat={this.props.filterChat}
                    hold={this.chatHoldHandler}
                    released={this.chatReleasedHandler}
                    selected={this.props.chatSelected}/>
            )
            this.scrollToBottom()
        }
      
        return (
            <div className="site-main__chat--box">
                <div 
                    className="site-main__chat--box__wrapper">  
                    { chat }
                    { typing }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        typing: state.cnt.typing,
        chatLoader: state.cnt.chatLoader,
        chat: state.cnt.chat,
        members: state.cnt.members,
        filterChat: state.cnt.filterChat,
        chatSelected: state.cnt.chatSelected,
        skipChat: state.cnt.skipChat,
        chatTotal: state.cnt.chatTotal,
    };
 }


 const mapDispatchToProps = dispatch => {
    return {
        onHoldChat: (id) => dispatch(actions.holdChat(id)),
        onFetchChat: (id, categ, chatLimit, skipChat,chatTotal) => dispatch(actions.fetchChatInit(id, categ, chatLimit, skipChat,chatTotal)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatBox)); 