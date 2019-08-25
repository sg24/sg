let env = process.env.NODE_ENV || "development";

if (env === "development") {
    let config = require('./config.json');
    let devConfig = config[env];

    for (let key in devConfig) {
        process.env[key] = devConfig[key];
    }
}