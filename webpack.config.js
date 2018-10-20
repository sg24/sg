var path = require('path');

module.exports = {
  
    entry: {
      appScript: "./assets/scripts/appScript.js",
      view: "./assets/viewscript/viewScript.js",
      globalScript: "./assets/globalscript/GlobalScript.js",
      post: "./assets/postscript/Post.js",
      question: "./assets/questionscript/Question.js",
      quote: "./assets/quotescript/quote.js",
      onlineque: "./assets/onlinequescript/onlineque.js",
      group: "./assets/groupscript/group.js",
      groupchat: "./assets/chatscript/groupchat.js",
      privatechat: "./assets/privatechatscript/privatechat.js",
      formque: "./assets/formquescript/formque.js"
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