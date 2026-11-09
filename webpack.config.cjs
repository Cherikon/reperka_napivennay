const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/game.[contenthash].js',
    publicPath: './',
    clean: true,
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: {
    rules: [{ test: /\.tsx?$/, exclude: /node_modules/, use: 'ts-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    favicon: path.resolve(__dirname, 'src/favicon.ico'),
  })],
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    static: false,
    devMiddleware: { publicPath: '/' },
    client: { overlay: true },
  },
};
