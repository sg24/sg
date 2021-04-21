import * as React from "react";
export default function withComponent( componentList) {
  return (Component) => {
    const WithComponents = (props, ref) => {
        let cmpList = {}
        for (let cmp of componentList) {
            cmpList[cmp.name] = cmp.defaultParams ?  cmp.component(cmp.defaultParams) : cmp.component();
        }
      return React.createElement(
        Component,
        Object.assign({}, props, { ref: ref, ...cmpList })
      );
    };
    return React.forwardRef(WithComponents);
  };
}
