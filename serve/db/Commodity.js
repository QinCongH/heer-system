/*
    注册
*/

//1.引入mongoose模块
const mongoose = require('mongoose')    
// 2.连接数据库
mongoose.connect("mongodb://localhost/heersystem")
// 3.创建文档结构变量
const Schema = mongoose.Schema 
// 4.设计表结构
var CommoditySchema = new Schema({ 
    coyName: { //商品名称
        type: String,
        require: true
    },
    coyPicture: { //商品图片
        type: String,
    },
    coyPrice: { //商品价格
        type: Number,
    },
    coyCount: { //商品数量
        type: Number,
    },
    coyKind: { //商品分类
        type: String,
        enum: ['家居百货', '休闲食品', '生鲜区', '水果区', '运动穿搭'],
        default: '家居百货',
        require: true
    },
    coySell: { //商品卖点
        type: String,
    },
    coyDescribe: { //商品描述
        type: String,
    }
})


//创建实例模型 导出模型构造函数 module.exports=mongoose.model('导入的模块命名',导出对象名)
module.exports=mongoose.model('Commodity', CommoditySchema)



