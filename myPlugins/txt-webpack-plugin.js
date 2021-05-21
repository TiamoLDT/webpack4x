// 插件的结构

module.exports = class txtwebpackplugin {
  // apply 通过该方法将里面的内容添加到webpack不同阶段的执行hook钩子内 进行相关操作
  apply(compiler) {
    //钩入hook   tapAsync 异步钩子
    compiler.hooks.emit.tapAsync("txtwebpackplugin", (compilation, cb) => {
      // console.log(compilation.assets);

      compilation.assets["plugin.txt"] = {
        source: function () {
          // 插件最终需要输出内容
          return "hello txt";
        },
        size: function () {
          return 1;
        },
      };
      cb();
    });
    //tap 同步钩子
    compiler.hooks.compile.tap("txtwebpackplugin", (compilation) => {
      console.log(compilation.assets);
    });
  }
};
