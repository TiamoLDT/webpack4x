const path = require("path");
const minicssExtracePlugin = require("mini-css-extract-plugin");//抽离css÷
const htmlwebpackplugin = require("html-webpack-plugin"); //自动生成一个html文件，并把打包生成的js模块引入到该html 中
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //每次构建时 清空输出文件夹
const txtwebpackplugin = require("./myPlugins/txt-webpack-plugin.js"); //自定义插件 plugin
module.exports = {
  //单文件入口js
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),  //打包后输出文件路径 所有文件输出
    // filename: "[name]-[chunkhash:8].js",  //输出文件名 
    filename: "js/[name].js",  //可以设置 打包后js文件名 + 对应路径（在哪个文件夹下 相对上行path设置）
  },
  mode: "development",
  // resolveLoader用于配置 依赖引用loader时 查找的文件夹 从modules配置的文件里查找对应loader
  resolveLoader: {
    modules: ["node_modules", "./myLoaders"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        // use: ["style-loader", "css-loader", "postcss-loader"]  //postcss-loader 使用在最开始
      },
      // less实现1:未使用抽离css插件时 less的loader配置
      // {
      //   test: /.less$/,
      //   use: ["style-loader", "css-loader","less-loader"],
      // },
      // less实现2:使用自定义loader 注意自定义loader的使用 上面resolveLoader需要注意配置
      // {
      //   test: /\.less$/,
      //   use: ["test-style-loader", "test-css-loader", "test-less-loader"],
      // },
      // less实现3:使用minicssExtracePlugin抽离css  通过minicssExtracePlugin.loader代替
      {
        test: /\.less$/,
        use: [
          minicssExtracePlugin.loader,
          "css-loader",
          "postcss-loader", //postcss-loader在postcss.config.js进行相关配置
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            // *** 特别注意路径问题 ***
            publicPath: "../images",    //设置打包后css引用图片时的路径 在哪找对应图片 结合下行outputPath进行设置
            outputPath: "images", //设置图片单独的输出文件名 相对于 output设置的打包出口文件夹设置路径
            // publicPath: "./",   
            // outputPath: "css", //设置资源输出的目录  不配置该项 默认打包在在输出文件夹外层 
            limit: 1024 * 3, //图片大于阈值 不会转base64,小于会转base64
          },
        },
      },
      {
        test: /\.(woff|woff2|svg|eot)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../",
          },
        },
      },
      //使用babel-loader时js文件支持es6+使用 在.babelrc文件里配置
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      // 自定义loader使用时 配置参数 该loader替换了main.js里的log打印
      //use 3种配置方式 ['']、{}、['',{}] 
      {
        test: /\.js$/,
        use: [
          'replace-loader',
          {
            loader: "replace-async-loader",
            options: {
              info:'世界'
            },
          },
        ]
      },
    ],
  },
  devtool: "sourcemap",//sourcemap:源代码与打包后代码的关系映射
  //webpack-dev-server 热更新 本地数据mock
  devServer: {
    //devServer 启动一个本地服务  使用该选项时 在package.json中配置启动命令 "server": "webpack-dev-server"
    contentBase: "./dist",  //指定服务运行时 资源地址 默认就是dist
    port: 9000,   //服务端口
    open: true,   //服务启动是 是否自动在打开在浏览器展示
    proxy: {
      //代理 服务端没有跨域一说  访问到/api开头的接口时 转发到另一个服务地址(后台服务地址 || 前端自己启动的另个服务）
      //前端自己本身启动的另一个服务 通过node或者node框架启动，可以进行开发阶段的数据mock 这里在server.js 通过express启动
      "/api": {
        target: "http://localhost:9092/",
      },
    },
  },
  plugins: [
    new htmlwebpackplugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new txtwebpackplugin(),
    new CleanWebpackPlugin(),
    new minicssExtracePlugin({
      // filename: "css/[name]-[contenthash:6].css",
      filename: "css/[name].css",
    }),
  ],
};



// webpack文件指纹策略:hash chunkhash contenthash
// hash策略 是以项目为单位的，项目内容改变，则会生成新的hash,内容不变则hash不变 chunkhash 以chunk为单位，当一个文件内容改变，则整个chunk组的模块hash都会改变 contenthash 以自身内容为单位
