//请求的方法
import base from './base'   //引入配置文件
import axios from 'axios'   //引入axios
const api={
/*
    商品列表
*/
 getCommodityList(params){//{传page} 
    return axios.get(base.commodityList,{
        params
    })
 }     
}
export default api