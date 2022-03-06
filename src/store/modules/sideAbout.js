/*
侧边栏状态

*/
const sideAbout = {
    namespaced: true, //开启命名空间
    actions: {

    },
    mutations: {
        // 1，导航伸缩
        CLOSESIDE(state) {
            state.isCollapse = true //设置导航为关闭\
            if (state.isCollapse) {
                state.sideWidth = "64px";
            }
        },
        OPENSIDE(state) {
            state.isCollapse = false //设置导航为打开
            if (!state.isCollapse) {
                state.sideWidth = "15%";
            }
        },
 
    },
    state: {
        isCollapse: false, //导航未闭合
        sideWidth: '15%',
        username: ''
    },
    getters: { //对username加工
        myUsername(state) {
            let username = localStorage.getItem("username");
            console.log(username);
            if (username) { //如果存在username
                state.username = username;
            } else {
                state.username = "未登录"
            }
            return state.username
        }
    }
}

export default sideAbout