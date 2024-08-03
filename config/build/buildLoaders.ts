/** @format */

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { ModuleOptions } from 'webpack';
import { BuildOptions } from '../types/types';

export function buildLoaders({ mode }: BuildOptions): ModuleOptions['rules'] {
  const isDev = mode === 'development';
  const sccsLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader',
    ],
  };

  const ccsLoader = {
    test: /\.css$/i,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [sccsLoader, ccsLoader, tsLoader];
}
