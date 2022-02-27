// 注册路由
const express = require('express') //引入express
const router = express.Router() //创建路由实例
const Register = require('../db/Register') //引入数据表
const bcrypt = require('bcrypt') //引入加密
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
                msg: 'success'
            })
        }else{
            res.send({
                msg: 'error'
            })
        }
    })
module.exports = router //common.js导出模块