// 个人中心路由
const express = require('express'); //引入express
const Register = require('../db/Register'); //引入数据库
//引入bodyParser模块 --得到post数据
const bodyParser = require('body-parser');
const router = express.Router() //创建router
//解析 application/json
router.use(bodyParser.json());
//解析 application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
    extended: false
}))
router.get('/api/personer', async (req, res) => {
        // 1.获取分页数据
        // 测试
        // console.log(req.query);
        let page = JSON.parse(req.query.page) || 1;
        let pageSize = JSON.parse(req.query.pageSize);
        let count = await Register.countDocuments({}) //查询数据库中数据的总数
        let total = Math.ceil(count / pageSize) //总页数=数据总数/每页显示的数量 Math.ceil() 向上取整
        let start = (page - 1) * pageSize //页码对应的数据查询开始位置
        //2.分页查询
        const personerList = await Register.find().limit(pageSize).skip(start); //根据查询的位置查询
        if (personerList) { //如果查询到了
            //不显示的数据隐藏掉
            for (const key in personerList) {
                personerList[key].password = undefined
            }
            req.statusCode = 200
            res.send({ //3.发送数据
                data: personerList,
                state: "ok",
                total: total,
                count: count
            })
        } else {
            res.send({
                state: "error"
            })
        }
    })
    .get('/api/personer/queryAll', async (req, res) => {
        let queryResult = await Register.find();
        if (queryResult) { //如果查询到了
            //不显示的数据隐藏掉
            for (const key in queryResult) {
                queryResult[key].password = undefined
            }
            res.send({
                msg: 'ok',
                data: queryResult,
                status: "success"
            })
        } else {
            res.send({
                msg: 'err',
                status: "error"
            })
        }
    })
    .post('/api/personer/delpersonal', async (req, res) => {
        let getIdList = req.body.data
        if (getIdList.length > 0) {
            // 删除
            let personalDel = await Register.remove({
                "_id": { //$in字符选择查询_id字段带有61f91818353f2b794afef792，61f9190d6a50f6c0160e40a8的条件行
                    $in:
                        getIdList
                    
                }
            })
            if (personalDel) {
                res.status = 200
                res.send({
                    msg:'删除成功'
                })
            }
        }
    })

module.exports = router; //导出路由