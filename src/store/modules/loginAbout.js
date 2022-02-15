/*
登录状态

*/

const loginAbout = {
    namespaced: true, //开启命名空间
    actions: {


    },
    mutations: {
        CHANGELOGIN(state) { //改变登录
            state.isani = true
            setTimeout(() => {
                state.isLogin = false
            }, 201);

        },
        CHANGERST(state) { //改变注册
            state.isani = false
            setTimeout(() => {
                state.isLogin = true
            }, 201);
        }
    },
    state: {
        loginForm: { //1.登录的数据
            email: '',
            password: '',
            checked: true
        },
        loginRules: { //2.登录表单校验规则
            email: [{
                    required: true,
                    message: '请输入邮箱地址',
                    trigger: 'blur'
                },
                {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: ['blur', 'change']
                }
            ],
            password: [{
                required: true,
                message: "请输入密码",
                trigger: "blur"
            }]
        },
        isLogin: true, //3.true为登录,false为注册
        registerForm: { //1.注册的数据
            email: '',
            username: '',
            password: '',
            isPwd: '',
            checked: true
        },
        registerRules: { //2.注册表单校验规则
            email: [{
                    required: true,
                    message: '请输入邮箱地址',
                    trigger: 'blur'
                },
                {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: ['blur', 'change']
                }
            ],
            username: [{
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur"
                },
                {
                    min: 3,
                    max: 15,
                    message: "长度在 1 到 15 个字符",
                    trigger: "blur"
                },
            ],
            password: [{
                required: true,
                message: "请输入密码",
                trigger: "blur"
            }],
            isPwd: [{
                required: true,
                message: "请输入密码",
                trigger: "blur"
            }]
        },
        isani: false //动画是否显示

    }
}

export default loginAbout