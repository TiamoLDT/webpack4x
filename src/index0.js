console.log("hello");

//查看webpack执行机制钩子  过程
// const webpack = require("webpack");
// const options = require("../webpack.config.js");

// const compiler = webpack(options); //compiler.hooks
// Object.keys(compiler.hooks).forEach((hookName) => {
//   if (compiler.hooks[hookName].tap) {
//     compiler.hooks[hookName].tap("anyString", () => {
//       console.log(`run -> ${hookName}`);
//     });
//   }
// });

// compiler.run();

// babel工具
// babel编译js的
// 对js的语法支持非常好，默认就支持js，json模块
// 目标浏览器环境
// flow - js
// jsx - js
// ts - js
// es6+ - es5
// polyfill 垫片（包含ecma新特性的库）
// 按需加载


//.babelrc配置react支持使用

// import React, { Component } from "react";
// import ReactDom from "react-dom";

// class App extends Component {
//   render() {
//     return <div>hello world</div>;
//   }
// }

// ReactDom.render(<App />, document.getElementById("app"));


//.babelrc配置es6+支持使用
// const arr = [new Promise(() => {}), new Promise(() => {})];

// arr.map((item) => {
//   console.log(item);
// });








