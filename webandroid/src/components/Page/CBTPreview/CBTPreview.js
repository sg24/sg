import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import CBTPreviewItem from './CBTPreviewItem';
import * as actions from '../../../store/actions/index';

class CbtPreview extends Component {
    state = {
        pageReaction: []
    }

    cbtRequestHandler = (pageID) => {
        this.props.onPageReaction('cbtRequest', 'post', 'cbt', pageID, 'setRequest');
    }

    cancelRequestHandler = (pageID) => {
        this.props.onPageReaction('cbtRequest', 'post', 'cbt', pageID, 'cancelRequest');
    }

    render() {
        let cnt = this.props.cnt.map((cnt, index) => (
            <CBTPreviewItem 
                key={index}
                cnt={cnt}
                userID={this.props.userID}
                pending={this.props.pending}
                page={this.props.page}
                openURI={this.props.openURI}
                request={() => this.cbtRequestHandler(cnt._id)}
                cancelRequest={() => this.cancelRequestHandler(cnt._id)}
                preview={this.props.preview} />
        ))
        return  (
            <ScrollView
                horizontal
                style={styles.wrapper}>
                { cnt }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#dcdbdc',
        width: '100%',
        padding: 10,
        marginBottom: 20
    }
});


const mapStateToProps = state => {
    return {
        pending: state.externalPage.pending,
        page: state.externalPage.page,
        error: state.externalPage.error
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onPageReaction: (pageType, uriMethod, page, pageID, cntType, cnt) => dispatch(actions.externalPageInit(pageType, uriMethod, page, pageID, cntType, cnt))
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(CbtPreview);