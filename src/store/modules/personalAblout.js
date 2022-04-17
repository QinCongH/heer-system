/*
登录/注册状态
*/
import api from '../../api/index'
const personalAbout = {
    namespaced: true, //开启命名空间
    actions: {
        // 1.获取用户数据
        getTableData(context, value) { //此处进行axios获取后台数据
            api.personalQuery({
                page: value,
                pageSize: context.state.data.pageSize
            }).then(res => {
                // 传给mutations去操作数据
                context.commit("GITTABLEDATA", res)
            })
        },
        // 2.获取全部数据
        searchPersoner(context, value) {
            api.personalQueryAll().then(res => {
                context.commit("SEARCHPERSONAL", res)
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mutations: {
        CHANGE_KEYWORD(state, value) { // 搜索的数据
            state.searchKeyword = value
        },
        GITTABLEDATA(state, value) { //改变数据的值
            state.tableData = value.data.data
            state.total = value.data.count
        },
        SEARCHPERSONAL(state, value) { //处理搜索
            state.tableData = value.data.data.filter(v => {
                return (v.username.indexOf(state.searchKeyword) !== -1) || (v._id.indexOf(state.searchKeyword) !== -1) || (v.email.indexOf(state.searchKeyword) !== -1)
            })
        }
    },
    state: {
        searchKeyword: '',
        data: {
            page: 1, //初始化页码
            pageSize: 7 //每页显示多少数据    
        },
        tableData: [],
        total: 0
    }
}

export default personalAbout