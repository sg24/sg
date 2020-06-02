import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import TrendItems from '../../../../components/Main/Nav/TrendItems/TrendItems';
import Loader from '../../../../components/UI/Loader/Loader';

class TopTrending extends Component {

    componentDidMount() {
        if (this.props.match.params.id !== 'add') {
            this.props.onFetchTrends(this.props.match.params.categ,  this.props.match.params.id);
        }
    }

    componentDidUpdate() {
        if ( this.props.show) {
            this.props.onFetchTrends(this.props.match.params.categ,  this.props.match.params.id);
        }
    }

    changeFavoriteHandler = (id, isLiked, favAdd, cntGrp) => {
        this.props.onChangeFav(id, isLiked, favAdd, this.props.changedFav, this.props.userID, cntGrp)
    };

    showTrendHandler = () => {
        this.props.onShowTrend()
    }

    render() {
        let trends = <Loader />;

        if (this.props.trd) {
            trends = <TrendItems 
            content={this.props.trd}
            fav={this.changeFavoriteHandler}
            changedFav={this.props.changedFav}
            favChange={this.props.favChange}
            show={this.showTrendHandler}/>
        }

        return (
            <div className="reuse-trd reuse-trd__nav">
                <h3> Related Topics </h3>
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
        show: state.trd.show
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTrends: (cntGrp, id) => dispatch(actions.fetchTrdInit(cntGrp, id)),
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onShowTrend: () => dispatch(actions.showTrd())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopTrending));