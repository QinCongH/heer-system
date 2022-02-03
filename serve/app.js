// 入口文件

// 引入
const express=require('express')    //express
// require('./db/Connect')  //数据库连接测试
const app=express()     //创建app实例
const commodityRouter=require('./route/Commodity')  //引入路由文件

// 配置项
// 路由
app.use(commodityRouter)
// 启动监听
app.listen(2022,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('localhost:2022/api');
})