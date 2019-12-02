module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{ico,json,js,css,svg}",

  ],
  "swSrc": "public/sw-base.js",
  "swDest": "public/service-worker.js",
  "globIgnores": [
    "**/node_modules/**/*",
    "sw.js",
    "sw-base.js",
    "**/icons/**/*",
    "**/static/js/**/*",
    "**/favicon/**/*",
    "**/asset-manifest.json"
  ]
};