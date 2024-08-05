/** @format */

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { ModuleOptions } from 'webpack';
import { BuildOptions } from '../types/types';

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

  const sccsLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssModuleLoader,
      'sass-loader',
    ],
  };

  const ccsLoader = {
    test: /\.css$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssModuleLoader,
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [sccsLoader, ccsLoader, tsLoader];
}
