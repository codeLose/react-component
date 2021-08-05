#!/usr/bin/env node
const fs = require('fs')
const path = require('path');
const babel = require('@babel/core')
const getBabelConfig = require('../scripts/getBabelConfig')
const opts = getBabelConfig({ target: 'browser' }).opts
const vfs = require("vinyl-fs")
const gulpIf = require('gulp-if')
const gulpLess = require('gulp-less')
const through = require('through2')

const cwd = process.cwd()
const join = path.join
// const srcPath = join(cwd, "components");
const targetPath = join(cwd, 'es');
var srcPath = join(cwd,'src/components');
console.log(srcPath)

const babelTransformRegexp = /\.jsx?$/;

function isTransform(path) {
  return babelTransformRegexp.test(path);
}

const patterns = [
  join(srcPath, "**/*"),
  `!${join(srcPath, "**/fixtures{,/**}")}`,
  `!${join(srcPath, "**/demos{,/**}")}`,
  `!${join(srcPath, "**/__test__{,/**}")}`,
  `!${join(srcPath, "**/__tests__{,/**}")}`,
  `!${join(srcPath, "**/*.mdx")}`,
  `!${join(srcPath, "**/*.md")}`,
  `!${join(srcPath, "**/*.+(test|e2e|spec).+(js|jsx|ts|tsx)")}`,
  `!${join(srcPath, "**/tsconfig{,.*}.json")}`,
  `!${join(srcPath, "**/**stories.js")}`,
];

let lessInBabelMode = false

vfs.src(patterns, {
  allowEmpty: true,
  base: srcPath
})
// .pipe(
//   gulpIf(
//     f => lessInBabelMode && /\.less$/.test(f.path),
//     gulpLess(lessInBabelMode || {})
//   )
// )
.pipe(
  gulpIf(
    f => isTransform(f.path), 
    through.obj((file, env, cb) => {
      try {
        file.contents = Buffer.from(
          babel.transform(file.contents, {
            ...opts,
            // filename: file.path,
            // 不读取外部的babel.config.js配置文件，全采用babelOpts中的babel配置来构建
            configFile: false,
          }).code
        );
        // .jsx -> .js
        file.path = file.path.replace(path.extname(file.path), ".js");
        console.log(path, 'path')
        cb(null, file);
        // console.log(file.contents, 'file.contents')
      } catch (e) {
        // signale.error(`Compiled faild: ${file.path}`);
        console.error(`Compiled faild: ${file.path}`);
        cb(null);
      }
    })
  )
)
.pipe(vfs.dest(targetPath)); //写入文件
