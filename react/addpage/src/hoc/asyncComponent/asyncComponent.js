import  React, { Component } from 'react';

const asyncComponent = (importComponent) => (
    class extends Component {
        state = {
            cmp: null
        }

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({cmp: cmp.default})
                }) 
        }

        render() {
            const C = this.state.cmp;
            return C ? <C /> : null
        }
    }
);

export default asyncComponent;

