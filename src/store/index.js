// 创建vuex的store

//引入依赖文件
import Vue from 'vue'
import Vuex from 'vuex'
//使用vuex
Vue.use(Vuex)
import sideAbout from './modules/sideAbout' //引入store模块
import frontAbout from './modules/frontAbout' //引入首页模块
import loginAbout from './modules/loginAbout' //引入登录模块
export default new Vuex.Store({
    modules:{
        sideAbout,
        frontAbout,
        loginAbout
    }
})