import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import TrendItems from '../../../../components/Main/Nav/TrendItems/TrendItems';
import Loader from '../../../../components/UI/Loader/Loader';

class TopTrending extends Component {
    changeFavoriteHandler = (id, isLiked, favAdd, cntGrp) => {
        this.props.onChangeFav(id, isLiked, favAdd, this.props.changedFav, this.props.userID, cntGrp)
    };

    render() {
        let trends = <Loader />;

        if (this.props.trd) {
            trends = <TrendItems 
            content={this.props.trd}
            fav={this.changeFavoriteHandler}
            changedFav={this.props.changedFav}
            favChange={this.props.favChange}/>
        }

        return (
            <div className="reuse-trd reuse-trd__nav">
                <h3> Top Trendings</h3>
                <div className="reuse-trd__cnt reuse-trd__cnt--nav">
                    { trends }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        trd: state.trd.trends,
        changedFav: state.cnt.changedFav,
        favChange: state.cnt.favChange,
        userID: state.auth.userID,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopTrending);