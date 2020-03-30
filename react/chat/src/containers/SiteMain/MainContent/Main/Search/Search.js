import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Search.css';
import * as actions from '../../../../../store/actions/index';

class Search extends Component {
    state =  {
        search: '',
        searchTotal: 0,
        searchSeek: 0,
        id: this.props.match.params.id,
        categ: this.props.match.params.categ
    }

    searchChatHandler = (event) => {
        this.setState({search: event.target.value});
        this.props.onSearchChat(event.target.value)
    }

    componentDidUpdate() {
        let elem =  document.querySelectorAll('.site-main__chat--srch__highlight')
        if (this.state.search && elem.length !== this.state.searchTotal) {
            this.setState({searchTotal: elem.length, searchSeek: 0})
            if (elem.length > 0) {
                document.querySelectorAll('.site-main__chat--srch__highlight')[0].scrollIntoView()
                document.querySelectorAll('.site-main__chat--srch__highlight')[0].setAttribute('style', 'background: #fffb00; color:#333')
                this.setState({searchSeek: 1})
            }
        }
    }

    scrollUpHandler = () => {
        let seek = this.state.searchSeek - 1; 
        if (seek > 0) {
            for (let i = 0; i < this.state.searchTotal; i++) {
                if (i === seek - 1) {
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].scrollIntoView()
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].setAttribute('style', 'background: #fffb00; color:#333')
                    this.setState({searchSeek: seek})
                } else {
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].setAttribute('style', 'background: #d3e18a; color:#333')
                }
            }
        } else {
            for (let i = 0; i < this.state.searchTotal; i++) {
                if (i === this.state.searchTotal -1) {
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].scrollIntoView()
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].setAttribute('style', 'background: #fffb00; color:#333')
                    this.setState({searchSeek: this.state.searchTotal})
                } else {
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].setAttribute('style', 'background: #d3e18a; color:#333')
                }
            }
        }
    }

    scrollDownHandler = () => {
        let seek = this.state.searchSeek + 1; 
        if (seek <= this.state.searchTotal) {
            for (let i = 0; i < this.state.searchTotal; i++) {
                if (i === seek - 1) {
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].scrollIntoView()
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].setAttribute('style', 'background: #fffb00; color:#333')
                    this.setState({searchSeek: seek})
                } else {
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].setAttribute('style', 'background: #d3e18a; color:#333')
                }
            }
        } else {
            for (let i = 0; i < this.state.searchTotal; i++) {
                if (i === 0) {
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].scrollIntoView()
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].setAttribute('style', 'background: #fffb00; color:#333')
                    // document.querySelectorAll('.site-main__chat--srch__highlight')[i].parentElement.parentElement.setAttribute('style', 'background-color: #fffb00 !important; color:#333')
                     this.setState({searchSeek: 1})
                } else {
                    document.querySelectorAll('.site-main__chat--srch__highlight')[i].setAttribute('style', 'background: #d3e18a; color:#333')
                }
            }
        }
    }

    closeSearchHandler = () => {
        this.props.onCloseBackdrop();
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}`)
    };

    render() {
        let searchTotal = null;

        if (this.state.search) {
            searchTotal = (
                <div className="site-main__chat--srch__cnt--total">{this.state.searchSeek} / {this.state.searchTotal}</div>
            )
        }

        return (
            <div className="site-main__chat--srch">
                <div className="site-main__chat--srch__wrapper">
                    <div 
                        className="site-main__chat--srch__close"
                        onClick={this.closeSearchHandler}>
                        <FontAwesomeIcon  icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                    </div>
                    <div className="site-main__chat--srch__cnt">
                        <div className="site-main__chat--srch__cnt--button">
                            <button 
                                className="site-main__chat--srch__cnt--next"
                                disabled={!this.state.searchTotal > 0}
                                onClick={this.scrollUpHandler}><FontAwesomeIcon  icon={['fas', 'angle-up']} /></button>
                            <button 
                                className="site-main__chat--srch__cnt--prev"
                                disabled={!this.state.searchTotal > 0}
                                onClick={this.scrollDownHandler}><FontAwesomeIcon  icon={['fas', 'angle-down']}/></button>
                        </div>
                        <input 
                            type="text" 
                            placeholder="search chat" 
                            className="site-main__chat--srch__cnt--input"
                            onChange={this.searchChatHandler}
                            value={this.state.search} />
                        { searchTotal }
                    </div>
                </div>
            </div> 
        )
    }
};

const mapStateToProps = state => {
    return {
        cnt: state.cnt.cnts,
        userBackdrop: state.cnt.userBackdrop
    };
 }

 const mapDispatchToProps = dispatch => {
    return {
        onCloseBackdrop: () => dispatch(actions.closeBackdrop()),
        onSearchChat: (cnt) => dispatch(actions.searchChat(cnt))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search)); 