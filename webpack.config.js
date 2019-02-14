var path = require('path');

module.exports = {
  
    entry: {
      appScript: "./assets/scripts/appScript.js",
      view: "./assets/viewscript/viewScript.js",
      globalScript: "./assets/globalscript/GlobalScript.js",
      MiniglobalScript: "./assets/miniglobalscript/MiniGlobalScript.js",
      post: "./assets/postscript/Post.js",
      question: "./assets/questionscript/Question.js",
      ptwrit: "./assets/ptwritscript/ptwrit.js",
      onlineque: "./assets/onlinequescript/onlineque.js",
      group: "./assets/groupscript/group.js",
      chat: "./assets/chatscript/chat.js",
      conv: "./assets/convscript/conv.js",
      formque: "./assets/formquescript/formque.js",
      user: "./assets/userscript/users.js",
      favorite: "./assets/favoritescript/favorite.js"
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