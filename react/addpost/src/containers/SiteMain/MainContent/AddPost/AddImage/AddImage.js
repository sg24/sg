import React, { Component } from 'react';

class AddImage extends Component {
    state = {

    };

    render() {
        return (
            <div className="reuse-form__itm reuse-form__itm--img">
                <h4 className="reuse-form__itm--title">Add Image</h4>
                <div className="reuse-form__itm--det">
                    <div className="reuse-form__cnt">
                        <label className="reuse-form__cnt--title">Image Link</label>
                        <div className="reuse-form__cnt--det">
                            <input type="text" name="" id="" className="reuse-form__cnt--det__input reuse-form__cnt--det__input--lg" placeholder="paste link" />
                        </div>
                    </div>
                    <div className="reuse-form__itm--det__view"></div>
                    <div className="reuse-form__itm--det__alt">
                        OR
                    </div>
                    <div className="reuse-form__cnt">
                        <div className="reuse-form__cnt--det">
                            <div className="reuse-form__cnt--det__fil">
                                Add files
                                <input type="file" name="" id="" className="reuse-form__cnt--det__fil--input" />
                            </div>
                        </div>
                    </div>
                    <div className="reuse-form__itm--det__view"></div>
                </div>
                <div className="reuse-form__itm--footer reuse-form__btn">
                    <button type="button" className="reuse-form__btn--close">Exit</button>
                    <button type="submit" className="reuse-form__btn--add">Add</button>
                </div>
            </div>
        );
    }
}

export default AddImage