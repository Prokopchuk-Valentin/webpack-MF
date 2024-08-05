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
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, cssLoader],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
    exclude: /node_modules/,
  };

  const imagesLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoconfig: {
            plugins: [
              { name: 'convertColors', params: { currentColor: true } },
            ],
          },
        },
      },
    ],
  };

  return [
    imagesLoader,
    svgLoader,
    scssModuleLoader,
    scssLoader,
    cssModuleFileLoader,
    cssFileLoader,
    tsLoader,
  ];
}
