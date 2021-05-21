/**
 * webpack默认的配置文件 webpack.config.js 
 * 当修改默认配置文件为其他文件时 参照package.json -> "multipage": "webpack --config ./webpack.config.multi-page.js" 需要重新指定下配置文件
 */
const path = require("path");
const minicssExtracePlugin = require("mini-css-extract-plugin");
const htmlwebpackplugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");

//处理多页面 入口文件 + html -> htmlwebpackplugin 两个配置处理
const setMPA = () => {
  const entry = {};
  const htmlwebpackplugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  entryFiles.map((item, index) => {
    const entryFile = entryFiles[index];

    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match[1];
    entry[pageName] = entryFile;
    htmlwebpackplugins.push(
      new htmlwebpackplugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`), //模版路径
        filename: `${pageName}/${pageName}.html`,  //构建后输出路径及文件名
        chunks: [pageName],
      })
    );
  });

  //
  return {
    entry,
    htmlwebpackplugins,
  };
};
const { entry, htmlwebpackplugins } = setMPA();
module.exports = {
  //
  entry,  //多文件方式入口
  output: {
    path: path.resolve(__dirname, "./multi-page-dist"),
    filename: "[name]-[chunkhash:8].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],//注意loader执行顺序 先执行的放后面
      },
      {
        test: /\.less$/,
        use: [
          minicssExtracePlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../images",
            outputPath: "images",
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
    ],
  },
  plugins: [
    ...htmlwebpackplugins,     //多页面方式配置 配置方法
    new CleanWebpackPlugin(),
    new minicssExtracePlugin({
      filename: "css/[name]-[contenthash:6].css",
    }),
  ],
};
