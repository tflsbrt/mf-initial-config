const path = require('path');
const deps = require('./package.json').dependencies;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV !== 'production';

  return {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
      path: path.resolve('./build'),
      filename: '[name].[contenthash].js',
      publicPath: '/',
      globalObject: 'this',
      chunkLoadingGlobal: `webpackJsonp_sspahtmlwithjs`,
    },
    resolve: {
      extensions: ['.jsx', '.js'],
    },
    devServer: {
      static: path.resolve(__dirname, 'public'),
      hot: true,
      host: '0.0.0.0',
      port: 5001,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      allowedHosts: 'auto',
    },
    plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const chunks = ['main'];
          const entrypointFiles = entrypoints[chunks];
          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/manifest.json', to: 'manifest.json' },
          { from: 'public/robots.txt', to: 'robots.txt' },
        ],
      }),
      new ModuleFederationPlugin({
        // name: 'container',
        // filename: 'remoteEntry.js',
        remotes: {
          client: 'client@http://172.24.3.141:5003/remoteEntry.js',
        },
        shared: [
          {
            ...deps,
            react: {
              requiredVersion: deps['react'],
            },
            'react-dom': {
              requiredVersion: deps['react-dom'],
            },
          },
        ],
      }),
      new ExternalTemplateRemotesPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    externals: ['single-spa'],
  };
};
