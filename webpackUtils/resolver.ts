/** @format */
const path = require('path');

function resolver(...paths: string[]) {
  return path.resolve(process.cwd(), ...paths);
}

export default resolver;
