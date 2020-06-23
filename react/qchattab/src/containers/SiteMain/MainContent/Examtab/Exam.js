import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition,TransitionGroup  } from 'react-transition-group';
import draftToHtml from 'draftjs-to-html'
import Carousel from '../../../../components/UI/Media/Media';

import Submit from './Submit/Submit';

class Exam extends Component {
    constructor(props) {
        super(props);
        let duration = Number.parseInt(this.props.duration);
        let cnt = this.setDuration(duration);
        this.state = {
            items: this.props.question, 
            checkDuration: null,
            duration,
            currentIndex: 0, 
            correct: 0,
            hour: cnt.hour,
            minute: cnt.minute,
            second: cnt.second,
            answer: [],
            mark: [],
            totalScore: 0, 
            submitted: false,
            video: null,
            isNext: true
        }
    }

    setDuration = (duration) => {
        let hour  = duration / 3600000 > 0 ? Math.floor(duration/3600000) : null; 
        let minute = hour ? (duration - (hour * 3600000))/60000 > 0 ?  Math.floor((duration - (hour * 3600000))/60000) : null : 
        (duration / 60000) > 0 ?  Math.floor(duration / 60000) : null;
        let second = hour && !minute ?  (duration - (hour * 3600000))/1000 > 0 ?  Math.floor((duration - (hour * 3600000))/1000) : null :
        (minute && !hour) ? (duration - (minute * 60000) / 6000) > 0 ?  Math.floor((duration - (minute * 60000)) / 1000) : null :
        hour && minute ? (duration - ((hour * 3600000) + (minute * 60000)))/1000 > 0  ? (duration - ((hour * 3600000) + (minute * 60000)))/1000 : null :
        !hour && !minute ? duration / 1000 > 0 ? Math.floor(duration / 1000) : null : null;
        return {hour: hour ? hour : 0, minute: minute ? minute : 0, second: second ? second : 0}
    }

    componentDidMount() {
        let checkDuration = setInterval(() => {
            let duration = this.state.duration - 1000;
            let cnt = this.setDuration(duration);
            if (duration === 0) {
                this.submitMediaHandler();
            } else {
                this.setState({duration, hour: cnt.hour, minute: cnt.minute, second: cnt.second});
            }
            
        }, 1000)
        this.setState({checkDuration})
    }

    componentWillUnmount() {
        clearInterval(this.state.checkDuration)
    }

    prevMediaHandler = () => {
        let index = this.state.currentIndex,
            length = this.state.items.length;
        
        if( index < 1 ) {
          index = length;
        }
        
        index = index - 1;
      
        this.setState({
          currentIndex: index,
          isNext: false
        });
      }
      
      nextMediaHandler = () => {
        let index = this.state.currentIndex,
            length = this.state.items.length - 1;
        
        if( index === length ) {
          index = -1;
        }
        
        index = index + 1;
        
        this.setState({
          currentIndex: index,
          isNext: true
        });
      }
      

    selectAnsHandler = (ans) => {
        let validAns = ans === 'A' ? 'q1' : ans === 'B' ? 'q2': ans === 'C' ? 'q3': 'q4';
        let index = this.state.currentIndex + 1;
        let answer = [...this.state.answer];
        let cnt = this.state.items.filter(cnt => cnt.position === index)[0];
        let correctAns = JSON.parse(cnt.answer);
        let selectAns = [];
        let mark = [...this.state.mark]
        let fndAns = answer.filter(cnt => cnt.index === index)[0];
        if (fndAns) {
            let checkAns = fndAns.ans.filter(ansSelc => ansSelc === validAns)[0];
            if (checkAns) {
                let removeAns = fndAns.ans.filter(ansSelc => ansSelc !== validAns);
                fndAns.ans = removeAns;
                selectAns = removeAns;
                answer = answer.filter(cnt => cnt.index !== index);
                answer.push({...fndAns})
            } else {
                fndAns.ans.push(validAns);
                selectAns = fndAns.ans
                answer = answer.filter(cnt => cnt.index !== index);
                answer.push({...fndAns})
            }
        } else {
            answer.push({index, ans: [validAns]});
            selectAns = [validAns]
        }
        let isCorrect  = false;
        if (selectAns.length > 0) {
            isCorrect = selectAns.every(function(val) {
            return correctAns.indexOf(val) >= 0;
          });
        }
        let isMarked = mark.filter(cnt => cnt.index === index)[0];
        if (isMarked) {
            mark=  mark.filter(cnt => cnt.index !== index);
            mark.push({index, correct: isCorrect})
        } else {
            mark.push({index, correct: isCorrect})
        }
        this.setState({answer, mark})
    }

    submitMediaHandler = () => {
        clearInterval(this.state.checkDuration)
        let perScore = 100 / (this.state.items.length);
        let totalScore = 0;
        for (let cnt of this.state.mark) {
            if (cnt.correct) {
                totalScore += perScore
            }
        }
        this.setState({totalScore, submitted: true})
    }

    render() {
        let index = this.state.currentIndex;
        let isnext = this.state.isNext;
        let cnt = this.state.items.filter(cnt => cnt.position === index + 1)[0];
        const htmlContent = draftToHtml(JSON.parse(cnt.question),{ trigger: '#',separator: ' '}, true);
        let mediaCnt =  [...cnt.snapshot, ...cnt.image];
        let media = null;
        let option = null;
        let optionItm = JSON.parse(cnt.option);
        let optionArray = [];
        let durationClass = [];
        let submitted = null;

        if (this.state.duration < 60000) {
            durationClass.push('exam-cnt__det--tm__duration');
        }

        for (let itm in optionItm) {
            let key = itm === 'q1' ? 'A' : itm === 'q2' ? 'B' : itm === 'q3' ? 'C' : 'D'
            optionArray.push({cnt: optionItm[itm], key, opt: itm, select: false})
        }
        let select = this.state.answer.filter(cnt => cnt.index === index + 1)[0];
        if ( select) {
            for (let ans of select.ans) {
                let optFnd = optionArray.filter(cnt => cnt.opt === ans)[0];
                if (optFnd) {
                    optFnd.select = true;
                    let optIndex = optionArray.findIndex(cnt => cnt.opt === ans);
                    optionArray[optIndex] = {...optFnd}
                }
            }
        }

        option = optionArray.map((opt, curIndex) => {
            let ansClass = ['exam-cnt__content--opt__itm--ans'];
            let itmClass = ['exam-cnt__content--opt__itm'];
            if (opt.select) {
                ansClass.push('exam-cnt__content--opt__itm--select')
                itmClass.push('exam-cnt__content--opt__itm--select')
            }
            return (
                <li 
                className={itmClass.join(' ')} key={curIndex}
                onClick={() => this.selectAnsHandler(opt.key)}>
                <div className={ansClass.join(' ')}>{opt.key}</div> 
                { opt.cnt}
            </li>
            )      
        })

        if (cnt.image.length > 0 || cnt.video.length > 0) {
            media = (
                <div className="exam-cnt__media">
                    <div className="exam-cnt__media--main-wrapper">
                        <Carousel
                            images={mediaCnt}
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

        if (this.state.submitted) {
            submitted = (
                <Submit 
                    id={this.props.id}
                    title={this.props.title}
                    examID={this.props.examID}
                    totalScore={this.state.totalScore}/>
            )
        }
        
        return (
            <>
                <div className="exam-cnt__det"> 
                    <div className="exam-cnt__det--cur-que">
                        <div>{index + 1}</div>
                        <span>{this.state.items.length-(index + 1)} Rem</span>
                    </div>
                    <div className="exam-cnt__det--tm">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'clock']} 
                                className="icon icon__site-main--exam-cnt__tm" />
                        </div>
                        <span className={durationClass.join(' ')}>{`${this.state.hour}hr ${this.state.minute}min ${this.state.second}sec`}</span>
                    </div>
                </div>
                <div 
                    className="exam-cnt__content">
                    <TransitionGroup
                        component={null}>
                        <CSSTransition
                            key={index}
                            classNames={{
                            enter: isnext ? 'tabenter-next' : 'tabenter-prev',
                            enterActive: 'tabenter-active',
                            exit: 'tabexit',
                            exitActive: isnext ? 'tabexit-active-next' : 'tabexit-active-prev'
                            }}
                            timeout={500}>
                            <div className="exam-cnt__content--wrapper">
                                <div className="exam-cnt__content--que">
                                    { media }
                                    <div 
                                        className="exam-cnt__content--que__wrapper"
                                        dangerouslySetInnerHTML={{
                                            __html: htmlContent
                                        }}></div>
                                </div>
                                <ul className="exam-cnt__content--opt">
                                    { option }
                                 </ul>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </div> 
                <div className="exam-cnt__footer">
                    <div 
                        className="exam-cnt__footer--prev"
                        onClick={this.prevMediaHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'angle-double-left']} 
                            className="icon icon__site-main--exam-cnt__footer--prev" />
                        Prev
                    </div>
                    <div 
                        className="exam-cnt__footer--submit"
                        onClick={this.submitMediaHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'check']} 
                            className="icon icon__site-main--exam-cnt__footer--prev" />
                        Submit 
                    </div>
                    <div 
                        className="exam-cnt__footer--nxt"
                        onClick={this.nextMediaHandler}>
                        Next 
                        <FontAwesomeIcon 
                            icon={['fas', 'angle-double-right']} 
                            className="icon icon__site-main--exam-cnt__footer--nxt" />
                    </div>
                </div>
                { submitted }
            </>
        )
    }
}

export default Exam