const path = require('path');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const { override, fixBabelImports, addLessLoader, useEslintRc } = require('customize-cra')


const options = {
  stylesDir: path.join(__dirname, './src/styles'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/variables.less'),
  mainLessFile: path.join(__dirname, './src/styles/wieldy.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@heading-color',
    '@nav-dark-bg',
    '@header-text-color',
    '@layout-header-background',
    '@layout-footer-background',
    '@nav-dark-text-color',
    '@hor-nav-text-color',
    '@nav-header-selected-text-color'
  ],
  indexFileName: 'index.html',
  generateOnce: false // generate color.less on each compilation
};


const overrideProcessEnv = value => config => {
  config.resolve.modules = [
    path.join(__dirname, 'src')
  ].concat(config.resolve.modules);

  config.resolve = {
    alias: {
      appRedux: path.resolve(__dirname, './src/appRedux'),
      apis: path.resolve(__dirname, './src/apis'),
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      constants: path.resolve(__dirname, './src/constants'),
      containers: path.resolve(__dirname, './src/containers'),
      util: path.resolve(__dirname, './src/util'),
      lngProvider: path.resolve(__dirname, './src/lngProvider'),
      routes: path.resolve(__dirname, './src/routes'),
      styles: path.resolve(__dirname, './src/styles'),
    }
  };

  config.plugins.push(new AntDesignThemePlugin(options));
  return config;
};
module.exports = override(
  useEslintRc(path.resolve(__dirname, '.eslintrc.json')),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#038fde',
      '@secondary-color': '#fa8c16',
      '@text-color': '#545454',
      '@heading-color': '#535353',
      '@nav-dark-bg': '#003366',
      '@header-text-color': '#262626',
      '@layout-header-background': '#fefefe',
      '@layout-footer-background': '#fffffd',
      '@nav-dark-text-color': '#038fdd',
      '@hor-nav-text-color': '#fffffd',
      '@nav-header-selected-text-color': '#fdbe33'
    }
  }),
  overrideProcessEnv({
    VERSION: JSON.stringify(require('./package.json').version),
  })
);
