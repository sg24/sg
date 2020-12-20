#!/bin/bash

echo 'Fixing PropTypes issues'

if grep -q "export const ViewPropTypes = { style: null };" node_modules/react-native-web/dist/index.js; then
    echo "ViewPropTypes fixed already!"
else
    echo "export const ViewPropTypes = { style: null };">> node_modules/react-native-web/dist/index.js
fi

if grep -q "Text.propTypes  = ()=> {};" node_modules/react-native-web/dist/exports/Text/index.js; then
    echo "TextPropTypes fixed already!"
else
    echo "Text.propTypes  = ()=> {};">> node_modules/react-native-web/dist/exports/Text/index.js
fi