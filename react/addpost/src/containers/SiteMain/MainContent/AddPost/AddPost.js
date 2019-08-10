import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AddPost.css';
import * as actions from '../../../../store/actions/index';
import AddImage from './AddImage/AddImage';
import AddVideo from './AddVideo/AddVideo';
import AddUsers from './AddUsers/AddUsers';
import PtCategs from '../../../../components/Main/PostCategs/PostCategs';
import Categs from '../../../../components/Main/PostCategs/Categs/Categs';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import Aux from '../../../../hoc/Auxs/Aux';

class AddPost extends  Component {
    state = {
        showPtCateg: false,
        categs: [],
        addCateg: null,
        disable: true,
        addNewCateg: true,
        addCategInput: '',
        categActiveProps: {
            active: false,
            index: null
        },
        showAddItm: false,
        showVidOpt: false,
        showImgOpt: false,
        showUserOpt: false,
        showAddItmOpt: true
    }

    componentDidUpdate() {
        if (this.state.addNewCateg && this.props.newPtCateg) {
            let categs = [...this.state.categs]
            categs.push(this.props.newPtCateg);
            this.setState({categs,addNewCateg: false})
        }
        if (this.state.showAddItmOpt && this.props.hideMediaBox) {
            this.props.onShowAddItm();
            this.setState({showVidOpt: false,showImgOpt: false,showUserOpt: false, showAddItmOpt: false});
        }
    }

    showPostCategHandler = () => {
        if (!this.state.showPtCateg) {
            this.props.onFetchPtCateg();
            this.setState({
                showPtCateg: true
            });
            return
        }
        this.setState({
            showPtCateg: false});
    }

    selectCategHandler = (categ) => {
        let categs = [...this.state.categs]
        categs.push(categ);
        this.setState({categs})
    }

    addCategHandler = (event) => {
        let value =  event.target.value;
        this.setState({addCateg: value, addCategInput: value, disable: value.length < 4})
    }

    addNewCategHandler = () => {
        this.props.onAddCateg(this.state.addCateg);
        this.setState({addNewCateg: true, addCategInput: '', disable: true })
    }

    categActiveHandler = (index) => {
        this.setState({categActiveProps: {active: true, index}})
    }

    categDefaultHandler = () => {
        this.setState({categActiveProps: {active: false, index: null}})
    }

    removeCategSelectHandler = (index) => {
        let category = [...this.state.categs]
            .filter((categ, categIndex) => categIndex !== index);
            this.setState({categs: category})
    }

    addItemHandler = () => {
        this.setState((prevState, props) => {
            return {
                showAddItm: !prevState.showAddItm
            };
        });
    }

    showOptHandler = (opt) => {
        if (opt === 'image') {
            this.setState({showImgOpt: true,showVidOpt: false, showUserOpt: false, showAddItmOpt: true});
            return 
        }

        if (opt === 'video') {
            this.setState({showVidOpt: true,showImgOpt: false,showUserOpt: false, showAddItmOpt: true});
            return 
        }
        this.setState({showUserOpt: true,showImgOpt: false,showVidOpt: false, showAddItmOpt: true});
    }

    submitHandler = (props) => {
        props.preventDefault()
        console.log(props.data)
    }

    render() {
        let addPtCateg = null;
        let categListClass = ['reuse-form__cnt--det__selec reuse-form__cnt--det__selec--categ'];
        let categItems = null;
        let addItemClass = ['reuse-form__cnt--det__selec reuse-form__cnt--det__selec--add'];
        let addItemOptClass = ['reuse-form__cnt--det__selec--opt'];

        if (this.state.showAddItm) {
            addItemClass.push('reuse-form__cnt--det__selec--add__visible icon--rotate');
            addItemOptClass.push('reuse-form__cnt--det__selec--opt__visible')
        }

        if (this.state.showPtCateg) {
            categListClass.push('icon--rotate');
            addPtCateg =  (
                <ul className="reuse-form__cnt--det__selec--opt reuse-form__cnt--det__selec--opt__visible">
                    <PtCategs 
                        categs={this.props.ptCateg}
                        selecCateg={this.selectCategHandler}/>
                </ul>
            );
        }

        if (this.state.categs.length > 0) {
            categItems = (
                <div className="reuse-form__cnt--tag">
                    <h3>
                        <FontAwesomeIcon 
                            icon={['fas', 'bars']} 
                            className="icon icon__reuse-form__cnt--categ" />
                        Category 
                    </h3>
                    <ul className="reuse-form__cnt--tag__itm">
                        <Categs 
                            categs={this.state.categs}
                            categActive={this.categActiveHandler}
                            categActiveProps={this.state.categActiveProps}
                            categDefault={this.categDefaultHandler}
                            removeCategSelect={this.removeCategSelectHandler}/> 
                    </ul>
                </div>
            )
        }

        return (
            <form action="" className="reuse-form" onSubmit={this.submitHandler}>
                <div className="reuse-form__wrapper">
                    <h3 className="reuse-form__title">
                        <div>
                            <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'pencil-alt']} />
                            </div> 
                            Add Post
                        </div>
                    </h3>
                    <div className="reuse-form__cnt">
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">
                                <FontAwesomeIcon 
                                    icon={['fas', 'tags']} 
                                    className="icon icon__reuse-form--cnt__tag" />
                                Post Tags
                            </label>
                            <div className="reuse-form__cnt--det">
                                <div className="reuse-form__cnt--det__wrapper">
                                    <div 
                                        className={categListClass.join(' ')}
                                        onClick={this.showPostCategHandler}>
                                        Category 
                                        <FontAwesomeIcon 
                                            icon={['fas', 'angle-down']} 
                                            className="icon icon__reuse-form--angle" />
                                       { addPtCateg }
                                    </div>
                                    <div className="reuse-form__cnt--det__alt">
                                        <div className="reuse-form__cnt--det__alt--title">
                                            <div>OR</div>
                                        </div>
                                        <div className="reuse-form__cnt--det__alt--cnt">
                                            <input 
                                                type="text" name="" id="" 
                                                className="reuse-form__cnt--det__input" 
                                                placeholder="Add Category" 
                                                value={this.state.addCategInput}
                                                onChange={this.addCategHandler}/>
                                            <button
                                                type="button"
                                                onClick={this.addNewCategHandler}
                                                disabled={this.state.disable}>
                                                <FontAwesomeIcon 
                                                icon={['fas', 'plus']} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { categItems }
                            {/* {{!-- <div class="reuse-form__err">Pls, select category</div> --}} */}
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">Post Title</label>
                            <div className="reuse-form__cnt--det">
                                <input type="text" name="" id="" className="reuse-form__cnt--det__input reuse-form__cnt--det__input--lg" />
                            </div>
                            {/* {{!-- <div class="reuse-form__err">Pls, Enter a title</div> --}} */}
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">Content </label>
                            <div className="reuse-form__cnt--det">
                                <textarea name="" id="" className="reuse-form__cnt--det__info"></textarea>
                            </div>
                            {/* {{!-- <div class="reuse-form__err">Pls, content must not be empty</div> --}} */}
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <div className="reuse-form__cnt--det">
                                <div className="reuse-form__cnt--det__wrapper">
                                    <div 
                                        className={addItemClass.join(' ')}
                                        onClick={this.addItemHandler}>
                                        Add  Items 
                                        <FontAwesomeIcon 
                                            icon={['fas', 'angle-down']} 
                                            className="icon icon__reuse-form--angle" />
                                        <ul className={addItemOptClass.join(' ')}>
                                            <li 
                                                className="reuse-form__cnt--det__selec--opt__img"
                                                onClick={this.showOptHandler.bind(this, 'image')}>Image</li>
                                            <li 
                                                className="reuse-form__cnt--det__selec--opt__vid"
                                                onClick={this.showOptHandler.bind(this, 'video')}>Video</li>
                                        </ul>
                                    </div>
                                    <div 
                                        className="reuse-form__cnt--det__selec reuse-form__cnt--det__selec--user"
                                        onClick={this.showOptHandler.bind(this, 'user')}>
                                        <FontAwesomeIcon 
                                            icon={['fas', 'chalkboard-teacher']} 
                                            className="icon icon__reuse-form--cnt__user" />
                                        Share Users 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    { this.state.showImgOpt ? <Aux><Backdrop></Backdrop><AddImage /></Aux> : null }
                    { this.state.showVidOpt ? <Aux><Backdrop></Backdrop><AddVideo /></Aux> : null }
                    { this.state.showUserOpt ? <Aux><Backdrop></Backdrop><AddUsers /></Aux> : null}
            
                    <div className="reuse-form__footer reuse-form__btn">
                        <button type="submit" className="reuse-form__btn--dft">
                            <FontAwesomeIcon 
                                icon={['fas', 'eye-slash']} 
                                className="icon icon__reuse-form--btn" />
                            Draft
                        </button>
                        <button type="submit" className="reuse-form__btn--add">
                            <FontAwesomeIcon 
                                icon={['fas', 'plus']} 
                                className="icon icon__reuse-form--btn" />
                            Add
                        </button>
                    </div>
                </div>
            </form>
        );
    }
};

const mapStateToProps = state => {
    return {
        ptCateg: state.addPost.ptCateg,
        newPtCateg: state.addPost.newPtCateg,
        hideMediaBox: state.addPost.hideMediaBox,
        image: state.addPost.image
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPtCateg: () => dispatch(actions.fetchPtCategInit()),
        onAddCateg: (categ) => dispatch(actions.addPtCategInit(categ)),
        onShowAddItm: () => dispatch(actions.showAddItm())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPost);