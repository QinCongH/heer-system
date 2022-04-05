/*
登录/注册状态

*/
const personalAbout = {
    namespaced: true, //开启命名空间
    actions: {
    },
    mutations: {
        CHANGE_KEYWORD(state,value){
            state.searchKeyword=value
        }
    },
    state: {
        searchKeyword:''
    }
}

export default personalAbout