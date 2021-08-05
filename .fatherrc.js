import { readdirSync } from 'fs';
import { join } from 'path';

// utils must build before core
// runtime must build before renderer-react
// components dependencies order: form -> table -> list
const headPkgs = [
  'provider',
  'utils',
  'field',
  'skeleton',
  'form',
  'table',
  'card',
  'list',
];
const tailPkgs = readdirSync(join(__dirname, 'src/components'))

const type = process.env.BUILD_TYPE;

const config = {
  cjs: false,
  esm: {
    type: 'babel',
  },
  // pkgs: tailPkgs,
  extraBabelPlugins: [
    ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    // [require('./scripts/replaceLib')],
  ],
  entry:'./src/components'
};

export default config;
