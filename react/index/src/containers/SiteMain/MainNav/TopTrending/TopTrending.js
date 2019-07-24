import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import TrendItems from '../../../../components/Main/Nav/TrendItems/TrendItems';

class TopTrending extends Component {
    componentDidMount() {
        this.props.onFetchTrends();
    }

    changeFavoriteHandler = (trdID) => {
        this.props.onChangeFav(this.props.trd, trdID)
    };

    render() {
        let trends = null;

        if (this.props.trd) {
            trends = <TrendItems 
            content={this.props.trd}
            fav={this.changeFavoriteHandler}/>
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
        trd: state.trd.trends
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTrends: () => dispatch(actions.fetchTrdInit()),
        onChangeFav: (trd, trdID) => dispatch(actions.changeFavTrdInit(trd, trdID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopTrending);