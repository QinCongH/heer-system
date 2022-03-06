// 入口文件

// 引入
const express = require('express') //express
// require('./db/Connect')  //数据库连接测试
const app = express() //创建app实例
const fs = require('fs')
const cors = require('cors')
const commodityRouter = require('./route/Commodity') //引入路由文件
const uploadRouter = require('./route/Upload') //引入路由文件
const RegisterRouter = require('./route/Register') //引入路由文件

app.use(cors())
app.use(express.static('public/uploads')) //响应静态文件 测试：localhost:2022/图片地址

// 路由
app.use(commodityRouter)
app.use(uploadRouter) //使用图片上传路由
app.use(RegisterRouter) //使用注册路由

// 启动监听
app.listen(2022, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('localhost:2022/api');
})