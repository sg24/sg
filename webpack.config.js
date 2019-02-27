var path = require('path');

module.exports = {
  
    entry: {
      view: "./assets/viewscript/viewScript.js",
      globalScript: "./assets/globalscript/GlobalScript.js",
      MiniglobalScript: "./assets/miniglobalscript/MiniGlobalScript.js",
      chat: "./assets/chatscript/chat.js",
      postform: "./assets/postformscript/postform.js",
      queform: "./assets/queformscript/queform.js",
      groupform: "./assets/groupformscript/groupform.js",
      onlinequeform: "./assets/onlinequeformscript/onlinequeform.js",
      pwtform: "./assets/ptwritformscript/pwtform.js",
      signupPrf: "./assets/signprfformscript/signupPrf.js",
      filter: "./assets/filterscript/filter.js",
      reuseSort: "./assets/reusesortscript/reuseSort.js", 
      share: "./assets/reusesharescript/reuseShare.js", 
      reuseSrch: "./assets/reusesrchscript/reuseSrch.js", 
      reuseQue: "./assets/reusequescript/reuseQue.js", 
      reusePwt: "./assets/reusepwtscript/reusePtwrit.js",  
      reusePt: "./assets/reuseptscript/reusePost.js",  
      reuseOnlineque: "./assets/reuseonlinequescript/reuseOnlineque.js",
      reuseAcc: "./assets/reuseaccscript/reuseAcc.js",
      accShared: "./assets/accsharedscript/accShared.js",
      accPrf: "./assets/accprfscript/accPrf.js"   
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