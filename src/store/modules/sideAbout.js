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
        }
    },
    state: {
        isCollapse: false, //导航未闭合
        sideWidth: '15%'
    }
}

export default sideAbout