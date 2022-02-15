
/*
首页状态

*/

const frontAbout = {
    namespaced: true, //开启命名空间
    actions: {

    },
    mutations: {

    },
    state: {
        fhData: [ //顶部数据
            {
                title: '访问量',
                data: 23423432,
                fontIco: "fa-adn",
                backGroundColor: "rgb(255, 255, 255)"
            },
            {
                title: '商品总数',
                data: 21421,
                fontIco: "fa-plus-square-o",
                backGroundColor: "rgb(255, 255, 255)"
            },
            {
                title: '总营收额',
                data: 423432,
                fontIco: "fa-bar-chart",
                backGroundColor: "rgb(255, 255, 255)"
            },
            {
                title: '商品与广告百分比',
                data: "99.9%",
                fontIco: "fa-pie-chart",
                backGroundColor: "rgb(255, 255, 255)"
            },

        ],
        fcData: //底部内容数据
        {
            newCtnList: ["增加了商品", '查询了商品', '删除了商品'],   
            addPctList: ['篮球', '羽毛球', '乒乓球'],
            FastList: ['商品管理', '广告中心', '个人中心', '订单信息']
        }

    }
}

export default frontAbout