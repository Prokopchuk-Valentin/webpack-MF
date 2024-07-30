/** @format */

import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import resolver from './webpackUtils/resolver';
import { Enviroment } from './webpackUtils/types';
import devServer from './webpackUtils/webpack.devServer';

export default (env: Enviroment) => {
  const isDev = env.mode === 'development';

  const config: Configuration = {
    mode: env.mode ?? 'production',
    entry: resolver('src', 'index.ts'),

    module: {
      rules: [
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
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: resolver('public', 'index.html'),
      }),
    ],
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? devServer : undefined,
  };
  return config;
};
