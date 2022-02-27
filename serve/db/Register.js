
// 连接数据库
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/heersystem")
const Schema = mongoose.Schema //创建文档结构变量
var registerSchema = new Schema({ //设计表结构
    email: { //邮箱
        type: String,
        require: true
    },
    password: { //密码
        type: String,
        require: true
    },
    username: { //账号
        type: String,
        require: true
    }
})


//创建实例模型 导出模型构造函数 module.exports=mongoose.model('导入的模块命名',导出对象名)
module.exports = mongoose.model('Register',registerSchema)