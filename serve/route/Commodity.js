//对Commodity数据表的文件操作

const express = require('express')
const Commodity = require('../db/Commodity')
const bodyParser = require('body-parser'); //引入bodyParser模块
const router = express.Router() //创建router
//解析 application/json
router.use(bodyParser.json());
//解析 application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
        extended: false
}))
//1.分页查询
router.get('/api/commodity', async (req, res, next) => {
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
                                data: commldityList, //数据
                                pageSize, //每页显示数
                                total, //总页数
                                count, //数据总数
                        })
                } else {
                        res.send({
                                status: 404,
                                msg: "查询失败"
                        })
                }
        })
        //2.查询全部
        .get('/api/commodityAll', async (req, res, next) => {
                let coyAllList = await Commodity.find() //查询所有数据
                if (coyAllList) { //        查询成功
                        req.status == 200,
                                res.send({
                                        status: 200,
                                        data: coyAllList,
                                })
                } else { //        查询失败
                        req.status == 500,
                                res.send({
                                        status: 500,
                                        msg: "error"
                                })
                }

        })
        // 3.增加商品列表
        .post("/api/commodityAdd", async (req, res) => {
                let commodityAddList = await req.body.data      //存储前端数据
                if (commodityAddList.coyName.trim().length > 0) {       //如果查询到了coyName则存储
                        new Commodity(commodityAddList).save((err) => {
                                if (err) {
                                        console.log('存储失败');
                                }
                                res.send({
                                        msg: 'success'
                                });
                                // console.log('存储成功');
                        });
                }


        })
module.exports = router