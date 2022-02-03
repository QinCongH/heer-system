module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
        }
    },
    lintOnSave: false, //关闭语法检查
    // 开启代理
    //方式2.前端访问时 http://localhost:8080/myApi/student
    devServer: {
        proxy: {
            '/myApi':{ //创建字符用来辨别端口，主要用于创建多个代理
                target:'http://localhost:2022',
                pathRewrite:{'^/myApi':''},//找到myAPi字段并清空
                ws:true,//用于支持websocket
                changeOrigin:true//是否访问时将自身端口更改为访问的端口（控制请求头的host值）
            }
        }
    },

}