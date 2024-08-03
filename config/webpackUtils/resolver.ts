/** @format */

import path from 'path';

export function resolver(...paths: string[]) {
  return path.resolve(process.cwd(), ...paths);
}
