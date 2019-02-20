var path = require('path');

module.exports = {
  
    entry: {
      view: "./assets/viewscript/viewScript.js",
      globalScript: "./assets/globalscript/GlobalScript.js",
      MiniglobalScript: "./assets/miniglobalscript/MiniGlobalScript.js",
      chat: "./assets/chatscript/chat.js",
      conv: "./assets/convscript/conv.js",
      postform: "./assets/postformscript/postform.js",
      queform: "./assets/queformscript/queform.js",
      groupform: "./assets/groupformscript/groupform.js",
      onlinequeform: "./assets/onlinequeformscript/onlinequeform.js",
      pwtform: "./assets/ptwritformscript/pwtform.js",
      user: "./assets/userscript/users.js",
      favorite: "./assets/favoritescript/favorite.js",
      filter: "./assets/filterscript/filter.js", 
      share: "./assets/reusesharescript/reuseShare.js", 
      reuseQue: "./assets/reusequescript/reuseQue.js", 
      reusePwt: "./assets/reusepwtscript/reusePtwrit.js",  
      reusePt: "./assets/reuseptscript/reusePost.js",  
      reuseOnlineque: "./assets/reuseonlinequescript/reuseOnlineque.js" 
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