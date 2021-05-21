/**
 * 配合webpack.config.js里的devServer 启动一个node服务来进行 node数据mock 
 */
const express = require("express");

const app = express();

app.get("/api/info", (req, res) => {
  res.json({
    name: "webpack",
  });
});

app.listen("9092");
