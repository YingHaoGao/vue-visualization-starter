const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
console.log(resolve('core'));
module.exports = {
  publicPath: '',
  devServer: {
    // proxy: 'http://202.127.114.131:8012/',
    proxy: 'http://221.2.140.133:8099/',
  },
  pages: {
    index: {
      entry: 'core/index.js',
    },
  },
  // configureWebpack: (config) => {
  //   config.resolve.alias.core = '/Users/lmx/www/insigma/vue-visualization-starter/core';
  //   console.log(config);
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('core', resolve('core'));
  },
};
