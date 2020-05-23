import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';
import { withRouter} from 'react-router-dom'

import './Chat.css';
import './Main.css';
import { socket } from './shared/utility';
import Loader from './Loader/Loader';
import axios from './axios';
import ChatBox from './ChatBox/ChatBox';
import Footer from './Footer/Footer';
import Snapshot from './Footer/Snapshot/Snapshot'
import VideoRec from './Footer/VideoRec/VideoRec'
import Auth from './Auth/Auth';

class Chat extends Component {
    constructor(props) {
        super(props);
        let expiresIn =  document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        let auth = false;
        if (expiresIn && (new Date(new Date(expiresIn*1000).getTime()) >= new Date().getTime())) {
            auth = true;
        } else {
            auth= false
        }
        this.state = {
            userDet: null,
            id: this.props.match.params.id,
            userID: document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            showBackdrop: false,
            closeContent: false,
            createChat: null,
            addChat: null,
            uploadMedia: null,
            chatSelected: null,
            editChat: null,
            defaultTemp: false,
            snapshot: false,
            removeSelected: false,
            removeChat: null,
            disable: false,
            connect: false,
            auth,
            err: null
        }
    }

    componentDidMount() {
        let these = this;
        axios.post('/aroundme', {id: this.state.id}, {headers: {
            'data-categ': 'userDet'}}).then(res => {
                this.setState({userDet: res.data})
        }).catch(err => {
            this.setState({err})
        })
        socket.on('connect', function(msg) {
            socket.emit('join',{room: these.state.id, host: these.state.userID, public: true}, function(err) {
                these.setState({err})
            });
            these.setState({connect: true})
        });
        socket.on('disconnect', function(){
            these.setState({connect: false})
        })
        if (!socket.disconnected) {
            these.setState({connect: true})
        }
    }

    userAuthHandler = () => {
        this.setState({auth: true})
    }

    closeAroundmeHandler = () => {
        this.props.history.push('/index/aroundme')
    }

    showBackdropHandler = (isShow) => {
        this.setState({showBackdrop: isShow, closeContent: false})
    }

    closeBackdropHandler = () => {
        this.setState({closeContent: true, showBackdrop: false})
    }

    createChatStartHandler = (cnt) => {
        this.setState({createChat: cnt})
    }

    addNewChatHandler = (cnt) => {
        this.setState({addChat: cnt, editChat: null})
    }

    uploadMediaStartHandler = (cnt) => {
        this.setState({uploadMedia: cnt, defaultTemp: false})
    }

    mediaUploadedHandler = () => {
        this.setState({defaultTemp: true, editChat: null})
    }

    snapshotHandler = () =>  {
        this.setState({snapshot: true})
    }

    videoRecHandler = () => {
        this.setState({videoRec: true})
    }

    holdChatHandler = (cnt) => {
        this.setState({chatSelected: cnt, removeSelected: false, editChat: null})
    }

    editChatHandler = () => {
        this.setState({editChat: this.state.chatSelected[0], chatSelected: []});
    }

    deleteChatHandler= () => {
        let these = this;
        this.setState({disable: true})
        axios.post('/aroundme', 
            {cnt: this.state.chatSelected, id: this.state.id}, {headers: {
                'data-categ': 'pvtDeleteChat'}}).then(cnt=> {
            socket.emit('pvtDeleteChat', cnt.data, function(err) {
                these.setState({err})
            })
            these.setState({removeChat: cnt.data, chatSelected: null, editChat: null, disable: false})
        }).catch(err =>{
            these.setState({err})
        })
    }

    closeSelectedHandler = () => {
        this.setState({removeSelected: true, chatSelected: null})
    }

    closeMediaHandler = () => {
        this.setState({snapshot: false, videoRec: false, closeContent: true, showBackdrop: false})
    }

    render() {
        let cnt = (
            <Loader />
        )
        let chatOpt = null;
        let deleteClass = ['site-main__chat--opt__del'];


        if (this.state.disable) {
            deleteClass.push('site-main__chat--opt__del--disable')
        }

        if (this.state.chatSelected && this.state.chatSelected.length > 0) {
            chatOpt = (
                <div className="site-main__chat--opt__wrapper">
                    <div 
                        className="site-main__chat--opt__close"
                        onClick={this.closeSelectedHandler}>
                        <FontAwesomeIcon  icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                    </div>
                    <ul className="site-main__chat--opt">
                        <li 
                            onClick={!this.state.disable ? this.deleteChatHandler: null}
                            className={deleteClass.join(' ')}><FontAwesomeIcon  icon={['far', 'trash-alt']} className="icon icon__site-main--chat__header--opt"/></li>
                        {this.state.chatSelected.length < 2 && this.state.chatSelected[0].edit ?
                            <li 
                                onClick={!this.state.disable && this.state.chatSelected[0].edit ? this.editChatHandler : null}
                                className="site-main__chat--opt__edit"><FontAwesomeIcon  icon={['far', 'edit']} className="icon icon__site-main--chat__header--opt"/></li> : null}
                    </ul>
                    <div className="site-main__chat--opt__total">
                        { this.state.chatSelected.length }
                    </div>
                </div>
            )
        }

        if (this.state.userDet) {
            let userImage = <Avatar  name={this.state.userDet.username} size='40' round />

            let status = <div className="site-main__chat--header__status"></div>
            if (this.state.userDet.image && this.state.userDet.image.length > 0) {
                userImage = <img src={this.state.userDet.image} alt="group" />
            }
            let userStatusIcn = null;

            if (this.state.userDet.status) {
                userStatusIcn = (
                    <div className="site-main__chat--header__img--status">
                    </div>
                )
            }

            if (this.state.connect) {
                status = (
                    <div className="site-main__chat--header__status site-main__chat--header__status-on"></div>
                )
            }

            let header = (
                <>
                <div className="site-main__chat--header__img">
                        { userImage }
                        { userStatusIcn }
                    </div>
                    <h3 className="site-main__chat--header__title">
                        { this.state.userDet.username }
                    </h3>
                    <div className="site-main__chat--header__det">
                        <div>
                            <FontAwesomeIcon  icon={['fas', 'map-marker-alt']} className="icon icon__site-main--chat__header--map"/>
                        </div>
                        {this.state.userDet.location}
                    </div> 
                </>
            )

            cnt = (
                <div className="site-main__chat">
                    { this.state.showBackdrop ? <div 
                        className="site-main__chat--overlay"
                        onClick={this.closeBackdropHandler}></div> : null}
                    <div className="site-main__chat--main">
                        <div className="site-main__chat--main__wrapper">
                            {this.state.err ? <div className="site-main__chat--err">{this.state.err.message ? this.state.err.message : this.state.err.toString()}</div> : null }
                            <div className="site-main__chat--header">
                                <div className="site-main__chat--header__wrapper">
                                    { header }  
                                </div>
                                { status }
                            </div>
                            { chatOpt }
                             <ChatBox 
                                createChat={this.state.createChat}
                                addChat={this.state.addChat}
                                uploadMedia={this.state.uploadMedia}
                                defaultTemp={this.state.defaultTemp}
                                holdChat={this.holdChatHandler}
                                removeSelected={this.state.removeSelected}
                                editChat={this.state.editChat}
                                removeChat={this.state.removeChat}/>
                            <Footer 
                                showBackdrop={this.showBackdropHandler}
                                closeContent={this.state.closeContent}
                                createChatStart={this.createChatStartHandler}
                                addNewChat={this.addNewChatHandler}
                                connect={this.state.connect}
                                uploadMediaStart={this.uploadMediaStartHandler}
                                mediaUploaded={this.mediaUploadedHandler}
                                snapshot={this.snapshotHandler}
                                videoRec={this.videoRecHandler}
                                editChat={this.state.editChat}/>
                            { this.state.snapshot ? <Snapshot 
                                closeMedia={this.closeMediaHandler}
                                uploadMediaStart={this.uploadMediaStartHandler}
                                mediaUploaded={this.mediaUploadedHandler}
                                editChat={this.state.editChat}/> : null}
                            { this.state.videoRec ? <VideoRec 
                                closeMedia={this.closeMediaHandler}
                                uploadMediaStart={this.uploadMediaStartHandler}
                                mediaUploaded={this.mediaUploadedHandler}
                                editChat={this.state.editChat}/> : null}
                        </div>
                    </div>
                </div>
            )
        }

        if (!this.state.auth) {
            cnt = (
                <Auth 
                    userAuth={this.userAuthHandler}/>
            )
        }

        return (
             <div
                className="reuse-mainchat">
                <div className="reuse-mainchat__main-wrapper">
                    <div className="reuse-mainchat__backdrop"  onClick={this.closeAroundmeHandler}>
                    </div>  
                    <div className="reuse-mainchat__wrapper">
                        { cnt }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Chat);