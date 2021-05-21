console.log('hello world')

//测试引入css
// require('./css/main.css')


//测试引入less 三种方式测试 less-loader 自定义loader minicssExtracePlugin.loader
//注意minicssExtracePlugin.loader抽离了css 和 js
// require('./css/main.less')


//测试引入图片资源
require('./css/main2.less')


//测试引入第三方字体
require('./css/main3.less')


//测试node接口mock数据
import axios from 'axios';
axios.get('/api/info').then((res)=>{
    console.log(res)
})

