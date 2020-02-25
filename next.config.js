const withCSS = require('@zeit/next-css');
const withReactSvg = require('next-react-svg');
const path = require('path');

module.exports = withCSS({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader']
    });
    return config
}
})

// withReactSvg({
//   include: path.resolve(__dirname, 'react/index/components/UI/Logo/'),
//   webpack(config, options) {
//     return config
//   }
// })

// const withCSS = require('@zeit/next-css')
// module.exports = withLess(withCSS(withSass({
//     webpack(config, options) {
//         config.module.rules.push({
//             test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//             use: {
//                 loader: 'url-loader',
//                 options: {
//                     limit: 100000
//                 }
//             }
//         });
//         return config
//     }
// })));