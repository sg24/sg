import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/editpoet/store/actions/index';
import App from '../../react/editpoet/App';
import { editpoetStore } from '../../react/hoc/withStore/withStore';

class Editpoet extends Component {
    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}

export default editpoetStore(Editpoet);