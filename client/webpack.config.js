const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const {  InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // For CSS extraction


/// TODO: Add and configure workbox plugins for a service worker and manifest file.
module.exports = () => {
  return {
    mode: 'development', // Adjust to 'production' for optimized build
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'take notes with javascript',
        theme_color: '#01377D',
        background_color: '#97E7F5',
        start_url: '/',
				publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
        start_url: '/', // Adjust if your index file has a different name
        display: 'standalone',
        orientation: 'portrait',
        inject: true,
      }),
      new InjectManifest({
        swSrc:  './src-sw.js',
        swDest: 'service-worker.js',
      }),
      // Add CSS extraction and Babel transpilation plugins
      new MiniCssExtractPlugin({
        filename: 'style.css', // Adjust CSS output filename pattern
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/, // Handle CSS files
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.js$/, // Handle JavaScript files
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env'], // Adjust Babel presets as needed
            },
          },
        },
      ],
    },
  };
};



