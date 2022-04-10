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
                context.commit("GITTABLEDATA",res)
            })
        }
    },
    mutations: {
        CHANGE_KEYWORD(state, value) {   // 搜索的数据
            state.searchKeyword = value
        },
        GITTABLEDATA(state,value){  //改变数据的值
            state.tableData=value.data.data
            state.total=value.data.count
        }
    },
    state: {
        searchKeyword: '',
        data: {
            page: 1, //初始化页码
            pageSize: 7 //每页显示多少数据    
        },
        tableData:[],
        total:0
    }
}

export default personalAbout