module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["last 2 versions", "> 1%"],
    }),
    require("cssnano"),
  ],
};
// 配置在使用postcss-loader时 css的相关辅助功能
//集成postcss:
//自动补⻬浏览器前缀: autoprefixer 
//css压缩等 cssnano
