/*
    注册与登录
*/
// 注册路由
const express = require('express') //引入express
const router = express.Router() //创建路由实例
const Register = require('../db/Register') //引入数据表
const bcrypt = require('bcrypt') //引入加密
const jwt = require('jsonwebtoken')
//注册的账户添加
router.post('/api/register', async (req, res) => {
        let registerAddList = req.body.data //获取到前台发送的表单数据
        if (registerAddList.password) { //如果获取到了
            //----用 bcrypt加密---------
            //生成salt的迭代次数
            const saltRounds = 10;
            //随机生成salt
            const salt = bcrypt.genSaltSync(saltRounds);
            //获取hash值
            var hash = bcrypt.hashSync(registerAddList.password, salt);
            //把hash值赋值给password变量
            registerAddList.password = hash;
            new Register(registerAddList).save((function (err, thor) {
                if (err) return console.log(err);
                res.status = 200
                res.send({
                    msg: '注册成功'
                })
            })) //接收结果
            // }
        }
    })
    // 注册的用户查询
    .get('/api/rstquery', async (req, res) => {
        let myemail = req.query.params
        let myemailrst = await Register.findOne({
            email: myemail
        })
        if (myemailrst) { //如果查询到了
            res.status = 200
            res.send({
                params: myemailrst,
                msg: 'success'
            })
        } else {
            res.send({
                msg: 'error'
            })
        }
    })
    //登录字段查询
    /*
        1.获取前台数据
        2.通过前台数据查询
        3.密码比对
        4.发送token值
    */
    .post('/api/loginquery', async (req, res) => {
        // let isEqual = await bcrypt.compare('明文密码', '加密密码');//数据库密码与传过来的密码比对
        let myemail = req.body.data.email //获取前端数据
        let myemailrst = await Register.findOne({ //单个查询
            email: myemail
        })
        console.log(myemailrst);
        if (myemailrst!==null) { //如果查询到了or比对成功
            let isValid = await bcrypt.compare(req.body.data.password, myemailrst.password) //true为比对成功
            if (isValid) {
                // // 生成token
                let SECRET = "QCONETOKEN"
                const token = jwt.sign({
                    id: String(myemailrst._id)
                }, SECRET)
                // console.log(isValid);
                res.status = 200
                res.send({ //发送请求
                    data: myemailrst,
                    msg: 'success',
                    isValid: isValid, //判断是否登录
                    token: token
                })
            } else {
                res.send({
                    msg: 'error'
                })
            }
        } else {
            res.send({
                msg: 'error'
            })
            return false
        }
    })
module.exports = router //common.js导出模块