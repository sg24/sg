module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
         'module-resolver',
         {
           alias: {
             "Ionicons": "./lib/icons/icons",
             "react-native-simple-shadow-view" : "./lib/BoxShadow/BoxShadow",
             "tailwind": "./lib/tailwind/tailwind"
           }
        }
       ]
   ]
  };
};
