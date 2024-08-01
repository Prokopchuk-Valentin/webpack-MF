/** @format */

import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import resolver from './webpackUtils/resolver';
import { Enviroment } from './webpackUtils/types';
import devServer from './webpackUtils/webpack.devServer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (env: Enviroment) => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const config: Configuration = {
    mode: env.mode ?? 'production',
    entry: resolver('src', 'index.tsx'),

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      path: resolver('dist'),
      filename: '[name].[contenthash].bundle.js',
      clean: true,
    },
    plugins: [
      isDev && new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: resolver('public', 'index.html'),
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
    ].filter(Boolean),
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? devServer : undefined,
  };
  return config;
};
