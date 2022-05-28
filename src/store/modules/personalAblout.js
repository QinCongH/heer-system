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
        },
        // 3.删除
        deletePersonal(context, value) {
            // 判断是删除单个还是多个
            if (value.sogleDel) {
                context.state.pslDelList.push(value.sendIdList) //插入数据   
            } else {
                context.state.pslDelList = value.sendIdList
            }
            // 弹窗
            this._vm.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.personalDel(
                    context.state.pslDelList
                ).then(res => {
                    this._vm.$message({
                        type: 'success',
                        message: res.data.msg
                    });
                    context.commit('DELETEPERSONAL', value.sendpage)

                })
            }).catch(() => {
                this._vm.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                context.commit('ONDELETE')
            });
            // 在此处获取后端数据
        }
        //4.删除选择
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
            state.searchKeyword = ''
        },
        DELETEPERSONAL(state, value) {
            // 删除成功调用action的方法
            this.dispatch('personalAbout/getTableData', value)
            state.pslDelList = []
        },
        ONDELETE(state) {
            state.pslDelList = []
        }
    },
    state: {
        searchKeyword: '',
        data: {
            page: 1, //初始化页码
            pageSize: 6 //每页显示多少数据    
        },
        tableData: [],
        total: 0,
        pslDelList: [],
    }
}

export default personalAbout