import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import draftToHtml from 'draftjs-to-html'

import Carousel from '../../../../../components/UI/Media/Media';
import './Submit.css';

class Submit extends Component {
    state = {
        show: false
    }

    showCommentHandler = () => {
        window.location.assign(`/view/qchat/${this.props.id}`)
    }

    closeExamHandler = () => {
        window.location.assign(`/view/qchat/${this.props.id}`)
    }

    showCorrectHandler = () => {
        this.setState({show: !this.state.show})
    }

    render() {
        let scoreClass = ['exam-cnt__submit--score__wrapper'];
        let correction = null;
        if (this.props.totalScore < 50) {
            scoreClass.push('exam-cnt__submit--score__wrapper--below')
        }
        let cnt = (
            <div className="exam-cnt__submit--wrapper" >
                <div className="exam-cnt__submit--score">
                    <div className={scoreClass.join(' ')}>
                        {Math.round(this.props.totalScore)}%
                    </div>
                </div>
                {/* <h4 className="exam-cnt__submit--title">Share score</h4> */}
                <ul className="exam-cnt__submit--share">
                    <li
                        onClick={this.showCorrectHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'check']} 
                            className="icon icon__exam-cnt--cor" />
                        Correction
                    </li>
                    <li
                        onClick={this.showCommentHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'comment-dots']} 
                            className="icon icon__exam-cnt--comment" />
                    </li>
                </ul>
                <div 
                    className="exam-cnt__submit--close"
                    onClick={this.closeExamHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'times']} 
                        className="icon icon__exam-cnt--close" />
                </div>
            </div>
        )

        if (this.state.show) {
            cnt = null;
            correction = (
                <>
                    <div className="exam-cnt__submit--share__correct">
                        <div 
                            className="exam-cnt__submit--close exam-cnt__submit--share__correct-close"
                            onClick={this.showCorrectHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'times']} 
                                className="icon icon__exam-cnt--close" />
                        </div>
                        <div className="exam-cnt__submit--share__correct--wrapper">
                            { this.props.correction.map((que, index) => {
                                const htmlContent = draftToHtml(JSON.parse(que.question),{ trigger: '#',separator: ' '}, true);
                                let media = null;
                                let correctionDet = (
                                    <li>
                                        <FontAwesomeIcon 
                                            icon={['fas', 'check']} 
                                            className="icon icon__exam-cnt--cor" />
                                        { que.correctAns.join(' or ')}
                                    </li>
                                );

                                if (!que.correct) {
                                    correctionDet = (
                                        <>
                                            <li>
                                                <FontAwesomeIcon 
                                                    icon={['fas', 'times']} 
                                                    className="icon icon__exam-cnt--err" />
                                                { que.wrongAns.join(' or ')}
                                            </li>
                                            <li>
                                                <FontAwesomeIcon 
                                                    icon={['fas', 'check']} 
                                                    className="icon icon__exam-cnt--cor" />
                                                { que.correctAns.join(' or ')}
                                            </li>
                                        </>
                                    )
                                }

                                if (que.media.length > 0) {
                                    media = (
                                        <div className="exam-cnt__media">
                                            <div className="exam-cnt__media--main-wrapper">
                                                <Carousel
                                                    images={que.media}
                                                    wrapperClass="exam-cnt__media--wrapper"
                                                    prevClass="exam-cnt__media--cnt exam-cnt__media--cnt__prev"
                                                    prevIcnClass="icon icon__exam-cnt--media__prev"
                                                    nextClass="exam-cnt__media--cnt exam-cnt__media--cnt__nxt"
                                                    nextIcnClass="icon icon__exam-cnt--media__nxt"
                                                    playClass="exam-cnt__media--wrapper__icn"
                                                    playIcnClass="icon icon__exam-cnt--media__play"/>
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <div 
                                        className="exam-cnt__submit--share__correct--que"
                                        key={index}>
                                        { media }
                                        <div 
                                            className="exam-cnt__content--que__wrapper exam-cnt__submit--que__wrapper"
                                            dangerouslySetInnerHTML={{
                                                __html: htmlContent
                                            }}></div>
                                        <ul className="exam-cnt__submit--share__correct--que__opt">
                                            { correctionDet }
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            )
        }

        return (
            <div className="exam-cnt__submit">
                { cnt }
                { correction }
            </div>
        )
    }
}

export default Submit;