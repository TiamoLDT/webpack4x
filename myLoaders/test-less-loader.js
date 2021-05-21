// 把less 语法 编译成css?

// Loader就是一个函数，声明式函数，不能用箭头函数 拿到源代码，
// 作进一步的修饰处理，再返回处理后的源码就可以了
const less = require("less");

module.exports = function (source) {
  less.render(source, (error, output) => {
    this.callback(error, output.css);
  });
};
