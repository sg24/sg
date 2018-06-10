var path = require('path');

module.exports = {
  
    entry: "./assets/scripts/appScript.js",
    output: {
      path: path.resolve(__dirname + '/public/js/app'),
      publicPath: "/js/app/",
      filename: 'appScript.js',
      chunkFilename: '[id].chunk.js'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    }
    
}