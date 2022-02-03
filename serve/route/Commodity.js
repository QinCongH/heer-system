//对Commodity数据表的文件操作

const express = require('express')
const Commodity = require('../db/Commodity')
const router = express.Router() //创建router
//分页查询
router.get('/api/commodity', async (req, res) => {
        //获取分页
        let page = req.query.page || 1 //接受用户端传递过来的当前页参数(页码)
        let pageSize = 8 //每页显示的数据条数
        let count = await Commodity.countDocuments({}); //查询用户数据的总数
        let total = Math.ceil(count / pageSize) //总页数=总数/每页显示的条数
        let start = (page - 1) * pageSize //页码对应的数据查询开始位置
         //获取数据库商品列表
         const commldityList = await Commodity.find().limit(pageSize).skip(start) //根据查询的开始位置查询
         //如果查询到了
        if (commldityList) {
                res.statusCode = 200;
                res.send({
                        status: 200,
                        data: commldityList,   //数据
                        pageSize,  //每页显示数
                        total,  //总页数
                        count,  //数据总数
                })
        } else {
                res.send({
                        status: 404,
                        msg: "查询失败"
                })
        }
})

module.exports = router