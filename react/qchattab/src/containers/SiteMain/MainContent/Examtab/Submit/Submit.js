import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from '../../../../../axios';
import './Submit.css';

class Submit extends Component {
    state = {
        show: false,
        comment: '',
        err: null,
        msg: null,
    }

    facebookShareHandler = () => {
        var facebookWindow = window.open(`https://www.facebook.com/sharer/sharer.php?u=${document.location.origin}/view/${this.props.cntType}/${this.props.shareID}`, 'facebook-popup', 'height=350,width=600');
        if(facebookWindow.focus) { facebookWindow.focus(); }
          return false;
    }

    twitterShareHandler = () => {
        var twitterWindow = window.open(`https://twitter.com/share?url=${document.location.origin}/view/${this.props.cntType}/${this.props.shareID}`, 'twitter-popup', 'height=350,width=600');
          if(twitterWindow.focus) { twitterWindow.focus(); }
            return false;
    }    

    inputChangeHandler  = (event) => {
        this.setState({comment: event.target.value, err: null, msg: null})
    }

    submitCommentHandler = () => {
        if (this.state.comment) {
            this.setState({disable: true, err: null, msg: null})
            axios.post( `/view/qchat/${this.props.id}`,{ id: this.props.id, cntGrp: 'qchat', cnt: this.state.comment},{headers: {'data-categ': 'createComment'}}).then(res => {
                this.setState({comment: '', msg: 'Comment Added successfully', disable: false})
            }).catch(err => {
               this.setState({err: 'Network Error', disable: false})
            })
        }
    }

    showCommentHandler = () => {
        // this.setState((prevState, props) => {
        //     return {
        //         show: !prevState.show
        // }})
        window.location.assign(`/view/qchat/${this.props.id}`)
    }

    closeExamHandler = () => {
        window.location.assign(`/view/qchat/${this.props.id}`)
    }

    render() {
        let btnClass = ['exam-cnt__submit--share__btn'];
        let scoreClass = ['exam-cnt__submit--score__wrapper']
        if (this.state.disable || !this.state.comment) {
            btnClass.push('exam-cnt__submit--share__btn--disable')
        }
        if (this.props.totalScore < 50) {
            scoreClass.push('exam-cnt__submit--score__wrapper--below')
        }
        let cnt = (
            <>
            <div className="exam-cnt__submit--score">
                <div className={scoreClass.join(' ')}>
                    {Math.round(this.props.totalScore)}%
                </div>
            </div>
            <h4 className="exam-cnt__submit--title">Share score</h4>
            <ul className="exam-cnt__submit--share">
                {/* <li onClick={this.facebookShareHandler}>
                    <FontAwesomeIcon 
                        icon={['fab', 'facebook-square']} 
                        className="icon icon__exam-cnt--facebook" />
                </li>
                <li onClick={this.twitterShareHandler}>
                    <FontAwesomeIcon 
                        icon={['fab', 'twitter']} 
                        className="icon icon__exam-cnt--twitter" />
                </li> */}
                <li
                    onClick={this.showCommentHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'comment-dots']} 
                        className="icon icon__exam-cnt--twitter" />
                </li>
            </ul>
            <div 
                className="exam-cnt__submit--close"
                onClick={this.closeExamHandler}>
                <FontAwesomeIcon 
                    icon={['fas', 'times']} 
                    className="icon icon__exam-cnt--close" />
            </div>
        </>
        )

        if (this.state.show) {
            cnt = (
                <>
                    { this.state.err ? <div className="exam-cnt__submit--err">{this.state.err}</div> : null}
                    { this.state.msg ? <div className="exam-cnt__submit--msg">{this.state.msg}</div> : null}
                    <textarea 
                        className="exam-cnt__submit--share__textarea"
                        onChange={this.inputChangeHandler}
                        value={this.state.comment}></textarea>
                    <button 
                        className={btnClass.join(' ')}                        
                        onClick={this.submitCommentHandler}
                        disabled={this.state.disable || !this.state.comment }>Comment</button>
                    <div 
                        className="exam-cnt__submit--close"
                        onClick={this.showCommentHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'times']} 
                            className="icon icon__exam-cnt--close" />
                    </div>
                </>
            )
        }

        return (
            <div className="exam-cnt__submit">
                <div className="exam-cnt__submit--wrapper" >
                    { cnt }
                </div>
            </div>
        )
    }
}

export default Submit;