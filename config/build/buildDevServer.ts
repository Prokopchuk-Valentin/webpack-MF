/** @format */

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from '../types';

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port: port ?? 5050,
    open: true,
    historyApiFallback: true,
  };
}
