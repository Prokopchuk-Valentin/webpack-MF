/** @format */

import { Configuration } from 'webpack';
import { buildPlugins } from './buildPlugins';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { BuildOptions } from '../types/types';
import { buildResolvers } from './buildResolvers';

export function buildWebpack(options: BuildOptions): Configuration {
  const {
    mode,
    paths: { entry, output },
  } = options;

  const isDev = mode === 'development';

  return {
    mode: mode ?? 'production',
    entry,
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    output: {
      path: output,
      filename: '[name].[contenthash].bundle.js',
      clean: true,
    },
    plugins: buildPlugins(options),
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
