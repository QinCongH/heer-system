const express = require('express')
const router = express.Router() //创建router
const multer = require('multer') // 上传图片依赖
const fs = require('fs') //安装文件模块
const path = require('path') //安装路径模块
/*
上传图片Api
说明：
1.后台安装 multer模块，同时引入fs模块
2.router.js入口文件导入模块
const fs=require('fs')
const multer=require('multer')
3.上传图片
*/



// /1.配置项
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 调用 cb 即可实现上传位置的配置:注意直接从二级目录开始写
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        // 指定文件名
        //文件名重复覆盖
        // 后缀名发生改变,如何解决？👇
        // console.log('----', file)
        let exts = file.originalname.split('.') //拿到源文件的后缀名
        let ext = exts[exts.length - 1]

        let tmpname = (new Date()).getTime() + parseInt(Math.random() * 9999) //为了避免重复，用时间戳表示
        cb(null, `${tmpname}.${ext}`);
    }
});

// 创建文件夹

var createFolder = function(folder){

    try{

        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在

        // 如果文件路径不存在将会抛出错误"no such file or directory"

        fs.accessSync(folder); 

    }catch(e){

        // 文件夹不存在，以同步的方式创建文件目录。

        fs.mkdirSync(folder);

    }  

};


var uploadFolder = './public/uploads';

createFolder(uploadFolder);


//2.将配置保存到multer
var upload = multer({
    storage: storage
});

//3.路由 。上传图片必须用post方法
router.post('/api/uploadImg', upload.single('file'), (req, res,next) => { ////hehe就是上传图片数据的key值，前端必须保持统一。可以用postman模拟，数据类型是表单对象。
    // console.log(req.file)
    let {
        size,
        mimetype,
        path
    } = req.file
    let types = ['jpg', 'jpeg', 'png', 'gif'] //允许上传的数据类型
    let tmpType = mimetype.split('/')[1]
    if (size > 5000000) {
        return res.send({
            err: -1,
            msg: '尺寸过大'
        })
    } else if (types.indexOf(tmpType) == -1) {
        return res.send({
            err: -2,
            msg: '媒体类型错误'
        })
    } else {
        let url = `/public/uploads/${req.file.filename}`
        res.send({
            err: 0,
            msg: 'ok',
            img: url,
            name: req.file.originalname
        })
    }
    next()

})
module.exports = router