import React, { Component} from "react";
export default function withclass(Cmp) {
    return class extends Component {
        render() {
            return <Cmp {...this.props}/>
        }
    };
}
