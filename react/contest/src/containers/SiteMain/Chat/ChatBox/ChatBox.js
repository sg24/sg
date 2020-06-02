import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { saveAs } from 'file-saver';

import Chats from './Chats/Chats';
import './ChatBox.css';
import { fetchChat, createChatStart, addNewChat, uploadMediaStart, holdChat, chatRemoved } from './utility';
import { socket } from '../shared/utility';
import Loader from '../Loader/Loader';
import axios from '../axios'

class ChatBox extends Component {
    state = {
        searchTotal: 0,
        hold: null,
        scrollEnable: false,
        id: this.props.match.params.id,
        userID: document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
        chatLimit: 50,
        height: 0,
        err: null,
        chat: [],
        tempchat: [],
        chatSelected: [],
        removeSelected: false,
        typing: [],
        editChat: null,
        chatStart: null,
        addChat: null,
        chatTotal: 0,
        skipChat: 0,
        chatLoaded: false,
        uploadMedia: null,
        removeChat: null,
        defaultTemp: false,
        scrolled: false
    }

    componentDidMount() {
        let these = this;
        axios.post('/contest', {id: this.state.id, skipChat: this.state.skipChat, chatLimit: this.state.chatLimit}, {headers: {
            'data-categ': 'chat'}}).then(res => {
                let chat = [...this.state.chat];
                chat.push(...res.data.chat)
                this.setState({chat: fetchChat(chat), skipChat: this.state.chatLimit, chatTotal: res.data.chatTotal, chatLoaded: true})
        }).catch(err => {
            this.setState({err})
        })

        socket.on('newChat', function(chats){
            these.setState({chat: addNewChat(these.state.chat, chats)})
        })

        socket.on('chatRemoved', function(cnt){
          if (JSON.stringify(these.state.removeChat) !== JSON.stringify(cnt)) {
                these.setState({removeChat: cnt, chat: chatRemoved(these.state.chat, cnt), chatSelected: [], editChat: null})
            }
        })

        socket.on('typing', function(users){
             these.setState({typing: users})
        })
    }

    componentDidUpdate() {
        let chatHold = document.querySelector('.site-main__chat--box');
        let chatBoxWrapper = document.querySelector('.site-main__chat--box__wrapper'); 
        if (this.state.chat && this.state.chat.length > 0 && !this.state.scrollEnable) {
            chatHold.addEventListener('scroll', this.onScroll, false);
            this.setState({scrollEnable: true})
        }

         if (chatBoxWrapper && document.querySelector('.site-main__chat--box__wrapper > div') && !this.state.scrolled) { 
            chatHold.scrollTop = chatHold.scrollHeight;
            this.setState({scrolled: true})
        }

        if (this.state.chatSelected.length < 1 
                && chatBoxWrapper 
                && document.querySelector('.site-main__chat--box__wrapper > div') 
                && document.querySelectorAll('.site-main__chat--srch__highlight').length < 1
                && (chatHold.clientHeight + chatHold.scrollTop  > (chatHold.scrollHeight/2) + (chatHold.scrollHeight/4))
                && this.state.scrolled) { 
            chatHold.scrollTop = chatHold.scrollHeight;
        }

        if (JSON.stringify(this.state.chatStart) !== JSON.stringify(this.props.createChat)) {
            this.setState({chatStart: this.props.createChat, chat: createChatStart(this.state.chat, 
            this.state.userID, this.props.createChat.msgType, this.props.createChat.msg, this.props.createChat.msgID)})
        }

        if (JSON.stringify(this.state.addChat) !== JSON.stringify(this.props.addChat)) {
            this.setState({chat: addNewChat(this.state.chat, this.props.addChat), addChat: this.props.addChat})
        }
        
        if (JSON.stringify(this.state.uploadMedia) !== JSON.stringify(this.props.uploadMedia)) {
            this.setState({tempchat: uploadMediaStart(this.state.chat, this.state.tempchat, this.state.userID, this.props.uploadMedia.chatID, this.props.uploadMedia.percentage, this.props.uploadMedia.type), uploadMedia: this.props.uploadMedia, defaultTemp: false})
        }

        if (!this.state.defaultTemp && this.props.defaultTemp) {
            this.setState({tempchat: [], defaultTemp: this.props.defaultTemp})
        }

        if (!this.state.removeSelected && this.props.removeSelected) {
            this.setState({chatSelected: [], removeSelected: this.props.removeSelected})
        }

        if (JSON.stringify(this.state.editChat) !== JSON.stringify(this.props.editChat)) {
            this.setState({editChat: this.props.editChat, chatSelected: []})
        }

        if (JSON.stringify(this.state.removeChat) !== JSON.stringify(this.props.removeChat)) {
            this.setState({removeChat: this.props.removeChat, chat: chatRemoved(this.state.chat, this.props.removeChat), chatSelected: [], editChat: null})
        }
    }

    onScroll = () => {
        if (document.querySelector('.site-main__chat--box').scrollTop <= 0) {
            axios.post('/contest', {id: this.state.id, skipChat: this.state.skipChat, chatLimit: this.state.chatLimit}, {headers: {
            'data-categ': 'chat'}}).then(res => {
                let chat = [...this.state.chat];
                if (res.data.chat.length > 0) {
                    chat.push(...res.data.chat)
                    this.setState({chat: fetchChat(chat), skipChat: this.state.chatLimit + this.state.skipChat, chatTotal: res.data.chatTotal})
                }
            }).catch(err => {
                this.setState({err})
            })
        }
    }

    chatHoldHandler = (mainID, chatID, ID) => {
        if (this.state.tempchat < 1) {
            let chatSelected = holdChat(this.state.chatSelected, this.state.userID, chatID, mainID, ID)
            this.setState({chatSelected, removeSelected: false, editChat: null})
            this.props.holdChat(chatSelected)
        }
    }

    chatReleasedHandler = (id) => {
        clearTimeout(this.state.hold);
    }

    downloadHandler = (url, name) => {
        saveAs(url, name)
    }

    render() {
        let typing = null;
        let chat = <Loader 
            cnt="loading chat ..."/>
        
        if (this.state.typing && this.state.typing.length > 0) {
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

        if (this.state.chatLoaded) {
            chat = (
                <Chats 
                    cnts={this.state.tempchat.length > 0 ? this.state.tempchat : this.state.chat}
                    users={this.state.users}
                    userImage={this.state.userImage}
                    filterChat={this.state.filterChat}
                    hold={this.chatHoldHandler}
                    released={this.chatReleasedHandler}
                    selected={this.state.chatSelected}
                    editChat={this.state.editChat}
                    userID={this.state.userID}
                    download={this.downloadHandler}/>
            )
        }
      
        return (
            <>
                {this.state.err ? <div className="site-main__chat--err">{this.state.err.message ? this.state.err.message : this.state.err.toString()}</div> : null }
                <div className="site-main__chat--box">
                    <div 
                        className="site-main__chat--box__wrapper">  
                        { chat }
                        { typing }
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(ChatBox); 