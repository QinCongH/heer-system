//路由入口
import Vue from "vue";
import VueRouter from "vue-router";
//引入组件
import Home from '../pages/Home/Home' //Home
import Login from '../pages/Login/Login' //Login
import Front from '../pages/Front/Front' //首页内容
import Commodity from '../pages/Commodity/Commodity' //商品管理
import Specification from '../pages/Specification/Specification' //规格参数
import Advertise from '../pages/Advertise/Advertise' //广告管理
import Personal from '../pages/Personal/Personal' //个人管理
import Order from '../pages/Order' //订单入口
import OrderList from '../pages/Order/OrderList' //订单管理
import Goods from '../pages/Goods/Goods' //货物管理
//安装路由
Vue.use(VueRouter)
//引入插件


const router = new VueRouter({
    mode: 'hash', //路由模式
    routes: [{ //Home
            name: 'ZhuYe',
            path: '',
            component: Home,
            meta: {
                title: '主页'
            },
            redirect:{name:'ZhuYeNeiRong'},//   重定向到主页内容
            children: [ //一级子路由
                {
                    path:'Front', //主页内容
                    name:'ZhuYeNeiRong',
                    component:Front,
                    meta: {
                        title: '主页'
                    },
                },
                {
                    path:'Commodity', //商品
                    name:'Shangping',
                    component:Commodity,
                    meta: {
                        title: '商品管理'
                    },
                },
                {
                    path:'Specification', //规格
                    name:'GuiGe',
                    component:Specification,
                    meta: {
                        title: '规格参数'
                    },
                },
                {
                    path:'Advertise', //广告
                    name:'GuangGao',
                    component:Advertise,
                    meta: {
                        title: '广告管理'
                    },
                },
                {
                    path:'Personal', //个人管理
                    name:'GeRen',
                    component:Personal,
                    meta: {
                        title: '个人管理'
                    },
                },
                {
                    path:'Order', //订单入口
                    name:'DinDan',
                    component:Order,
                    meta: {
                        title: '订单列表'
                    },
                    children:[//二级子路由
                        {
                            path:'Goods',
                            name:'HuoWu',
                            component:Goods,
                            meta:{
                                title:'货物管理'
                            }
                        },
                        {
                            path:'OrderList',
                            name:'DinDanLieBiao',
                            component:OrderList,
                            meta:{
                                title:'订单页面'
                            }
                        }
                    ]
                },
        ]
        },
        { //Login
            name: 'DengLu',
            path: '/login',
            component: Login,
            meta: {
                title: '登录'
            }
        }
    ]
})


//全局后置守卫---设置页面title
router.afterEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = "heerSystem"
    }
})
export default router