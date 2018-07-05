var path = require('path');

module.exports = {
  
    entry: {
      appScript: "./assets/scripts/appScript.js",
      view: "./assets/viewscript/viewScript.js"
    },
    output: {
      path: path.resolve(__dirname + '/public/js/app'),
      publicPath: "/js/app/",
      filename: '[name].js'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    }
    
}