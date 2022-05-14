//请求的方法
import base from './base' //引入配置文件
import axios from 'axios' //引入axios
/*
    以下封装的函数一定要有return值！！

*/
const api = {
    // ----------商品------------
    /*
        1.商品分页查询的列表
    */
    getCommodityList(params) { //{传page} 
        return axios.get(base.commodityList, {
            params
        })
    },
    /*
    2.商品 全部列表
*/
    getCoyAllList() {
        return axios.get(base.coyAllList)
    },

    /*
        3.商品添加
    */
    postCommodityAdd(data) { //data传数据给后端
        return axios.post(base.coyAdd, {
            data
        })
    },
    /*
        4.商品删除
    */
    postCommodityDel(data) {
        return axios.post(base.coyDel, {
            data
        })
    },
    /*
        5.查询单个商品
    */
    getCoyOneList(params) {
        return axios.get(base.coyOneList, {
            params
        })
    },
    /*
     6.更新单个商品
    */
    getCoyUpdata(data) {
        return axios.post(base.coyUpdata, {
            data
        })
    },
    // -------------注册-----------------
    /*
    7.注册
    */
    postRegister(data) {
        return axios.post(base.register, {
            data
        })
    },
    /*
    8.注册时邮箱查询
    */
    getRstEmail(params) {
        return axios.get(base.registerTest, {
            params
        })
    },
    /*
    9.登录时查询
    */
    postLoginQuery(data) {
        return axios.post(base.loginTest, {
            data
        })
    },
    // ----------个人中心------------
    /*
    10.个人中心数据查询
    */
    personalQuery(params) {
        return axios.get(base.psrList, {
            params
        })
    },
    /* 
    11.查询所有
    */
    personalQueryAll() {
        return axios.get(base.prtAll);
    },
    /* 
        12.删除
    */
   personalDel(data){
        return axios.post(base.prtDel,{
            data
        })
   }
}

export default api