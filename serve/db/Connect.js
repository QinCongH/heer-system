//连接数据库
var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/heer-system").then(()=>{
    console.log('连接成功');
}).catch(()=>{
    console.log('连接失败');
})

module.exports=mongoose //暴露mongoose