/** @format */

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from '../types';

export function buildLoaders({ mode }: BuildOptions): ModuleOptions['rules'] {
  const isDev = mode === 'development';

  const cssModuleLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev
          ? '[path][name]__[local]__[hash:base64:8]'
          : '[hash:base64:8]',
      },
    },
  };

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: false,
    },
  };

  const scssModuleLoader = {
    test: /\.module\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssModuleLoader,
      'sass-loader',
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    exclude: /\.module\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoader,
      'sass-loader',
    ],
  };

  const cssModuleFileLoader = {
    test: /\.module\.css$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssModuleLoader,
    ],
  };

  const cssFileLoader = {
    test: /\.css$/i,
    exclude: /\.module\.css$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoader,
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [scssModuleLoader, scssLoader, cssModuleFileLoader, cssFileLoader, tsLoader];
}