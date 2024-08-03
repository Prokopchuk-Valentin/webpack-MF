/** @format */

import { Enviroment } from './config/types/types';
import { buildWebpack } from './config/build';
import path from 'path';

export default ({ port = 3000, mode = 'development' }: Enviroment) => {
  const paths = {
    html: path.resolve(__dirname, 'public', 'index.html'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'dist'),
  };

  return buildWebpack({ port, mode, paths });
};
