// loader 本质上是一个函数
//! 不可以是箭头函数
// loader 必须有返回值，需要返回一个str buffer
// loader 支持配置
// loader 如何返回多个信息
// loader 如何处理异步
// 如何处理多个loader

module.exports = function (source) {
  //   console.log(this.query);   //通过 this.query 获取loader配置项里的option参数
  //   this.callback(null, msg);  //通过 this.callback 返回loader最后输出结果 也可以直接return字符串或buffer 同步
  const callback = this.async();//通过this.async 进行异步返回 *** 异步必须 *** 返回callback进行最后输出 异步
  setTimeout(() => {
    const msg = source.replace("world", this.query.info);
    callback(null, msg);
  }, 2000);
};
