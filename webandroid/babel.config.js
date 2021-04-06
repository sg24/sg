module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
         'module-resolver',
         {
           alias: {
             "ionicons": "./lib/icons/ionicons",
             "react-native-simple-shadow-view" : "./lib/BoxShadow/BoxShadow",
             "tailwind": "./lib/tailwind/tailwind",
             "permission": "./lib/permission/permission",
             "picker": "./lib/picker/picker",
             "react-native-emoji-selector": "./lib/emoji/emoji",
             "file-icons": "./lib/icons/fileicons/fileicons",
             "urischeme": "./lib/urischeme/urischeme",
             "uridetect": "./lib/uridetect/uridetect",
             "withcomponent": "./lib/withcomponent/withcomponent",
             "withclass": "./lib/withclass/withclass"
           }
        }
       ]
   ]
  };
};
