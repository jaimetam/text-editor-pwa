const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // For CSS extraction
const BabelLoader = require('babel-loader'); // For Babel transpilation

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
            src: path.resolve(__dirname, './src/images/logo.png'), 
            sizes: [96, 128, 192, 256, 384, 512],
            type: 'image/png',
          },
        ],
        start_url: '/', // Adjust if your index file has a different name
        display: 'standalone',
        orientation: 'portrait',
        inject: true,
        fingerprints: false, // Prevent automatic injection by Workbox (handled by InjectManifest)
      }),
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
				swDest: 'src-sw.js',
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