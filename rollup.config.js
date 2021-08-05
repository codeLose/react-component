import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import ascii from "rollup-plugin-ascii";
import resolve from "@rollup/plugin-node-resolve";
import includePaths from "rollup-plugin-includepaths";
import { terser } from "rollup-plugin-terser";

// import React from 'react';
// import ReactIs from 'react-is';
// import ReactDOM from 'react-dom';

// http://www.geekschool.org/2020/07/09/6309.html
const externalAry = [
  "antd",
  "antd/es/locale/zh_CN",
  "antd/dist/antd.css",
  "@ant-design/icons",
  "moment",
  "moment/locale/zh-cn",
  "echarts",
  "prop-types",
  "snowflake-id",
  "win-trade-base",
  "@lugia/lugiax",
  "@ant-design/icons",
  "react",
  "react-transition-group",
  "react-dnd",
  "react-dnd-html5-backend",
  "react-loadable",
  "react-resizable",
];

export default {
  input: "./src/components/index.js",
  output: {
    file: "es/index.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(
      {
        include: /node_modules/,
        // namedExports: {
        //   'react-is': Object.keys(ReactIs),
        //   'react': Object.keys(React),
        //   'react-dom': Object.keys(ReactDOM),
        //   // 'node_modules/_react-is@16.13.1@react-is': ['isFragment']
        // }
        // 'namedExports': {
        //   'node_modules/react-is/index.js': ['isFragment'],
        //   'node_modules/react/index.js': ['Fragment', 'cloneElement', 'isValidElement', 'Children', 'createContext', 'Component', 'useRef', 'useImperativeHandle', 'forwardRef', 'useState', 'useEffect', 'useMemo'],
        //   'node_modules/react-dom/index.js': ['render', 'unmountComponentAtNode', 'findDOMNode'],
        //   'node_modules/gojs/release/go.js': ['Diagram', 'GraphLinksModel', 'Overview', 'Spot']
        // }
      }
    ),
    babel({ exclude: "**/node_modules/**", babelHelpers: 'runtime' }),
    //ascii(),
    postcss({
      javascriptEnabled:true,
      // Extract CSS to the same location where JS file is generated but with .css extension.
      extract: true,
      // Use named exports alongside default export.
      namedExports: true,
      // Minimize CSS, boolean or options for cssnano.
      minimize: true,
      // Enable sourceMap.
      sourceMap: true,
      // This plugin will process files ending with these extensions and the extensions supported by custom loaders.
      extensions: [".less", ".css"],
      use: {
        less: {
          javascriptEnabled: true,
        },
        stylus: false,
      },
    }),
    terser(),
  ],
  //不能使用正则匹配，有定制化组件也是以echarts命名
  external: externalAry,
};
