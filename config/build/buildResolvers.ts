/** @format */

import { ResolveOptions } from 'webpack';
import { BuildOptions } from '../types';

export function buildResolvers({
  paths: { src },
}: BuildOptions): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: { '@': src },
  };
}
