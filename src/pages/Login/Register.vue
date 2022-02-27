<template>
  <div class="login box1" :class="{ ani: !isani }">
    <div class="loginTop">
      <p>注册</p>
      <span>REGISTER</span>
    </div>
    <el-form :model="registerForm" :rules="registerRules" ref="rstruleForm">
      <div class="loginCtn">
        <div class="One">
          <span><i class="fa fa-mobile" aria-hidden="true"></i> </span>
          <el-form-item prop="username">
            <el-input
              type="text"
              placeholder="请输入用户名"
              autocomplete="off"
              v-model="registerForm.username"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="One">
          <span><i class="fa fa-envelope-open" aria-hidden="true"></i> </span>
          <el-form-item prop="email">
            <el-input
              type="text"
              placeholder="请输入邮箱"
              autocomplete="off"
              v-model="registerForm.email"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="Two">
          <span><i class="fa fa-lock" aria-hidden="true"></i> </span>
          <el-form-item prop="password">
            <el-input
              type="text"
              placeholder="请输入密码"
              autocomplete="off"
              v-model="registerForm.password"
              show-password
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="Two">
          <span><i class="fa fa-lock" aria-hidden="true"></i> </span>
          <el-form-item prop="isPwd">
            <el-input
              type="text"
              placeholder="请再次确认密码"
              autocomplete="off"
              v-model="registerForm.isPwd"
              show-password
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="Three">
          <div>
            <el-checkbox v-model="registerForm.checked"
              >勾选即表示同意 协议条款 和 隐私政策</el-checkbox
            >
          </div>
          <div @click="toLogin">
            <p>返回登录</p>
          </div>
        </div>
      </div>
    </el-form>

    <div class="loginFoot">
      <input type="button" value="提交" @click="rstSubmit" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "Register",
  computed: {
    ...mapState("loginAbout", {
      registerForm: "registerForm",
      registerRules: "registerRules",
      isani: "isani",
      isLogin: "isLogin",
    }),
  },
  methods: {
    ...mapMutations("loginAbout", {
      toLogin: "CHANGERST",
    }), //vuex 1--commit提交值
    //注册的操作
    rstSubmit() {
      //1.验证邮箱是否未注册
      let params = { params: this.registerForm.email }; //设置传参体
      this.$api
        .getRstEmail(params)
        .then((res) => {
          if (res.data.msg == "success") {
            //1.邮箱已经注册
            //如果校验失败
            this.$message({
              showClose: true,
              message: "邮箱已经注册qwq",
              type: "error",
            });
            return false;
          } else if (res.data.msg == "error") {
            //2.邮箱未注册
            this.$refs.rstruleForm.validate((valid) => {
              if (
                valid &&
                this.registerForm.checked === true &&
                this.registerForm.password === this.registerForm.isPwd
              ) {
                //校验成功
                this.successRst();
              } else {
                //如果校验失败
                this.$message({
                  showClose: true,
                  message: "  请检查您输入的字段是否正确",
                  type: "error",
                });
                return false;
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    successRst() {
      //将registerForm传给后端,通过es6删除不需要传递给后端的数据
      let { isPwd, checked, ...rtsdata } = this.registerForm;
      this.$api.postRegister(rtsdata).then(
        (res) => {
          // console.log(res);
          // 如果校验成功
          // 1.注册成功
          this.$message({
            showClose: true,
            message: "注册成功，请登录！",
            type: "success",
          });
          // 2.跳转到登录
          this.$store.commit("loginAbout/CHANGERST");
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 34%;
  background: transparent;
  box-shadow: 1px -1px 1px -1px #ffffff;
  border-radius: 10px;
  position: absolute !important;
  top: 0px !important;
  bottom: 0px !important;
  width: 100% !important;
  background: #2d2e2e36;
  .loginTop {
    display: flex;
    justify-content: center;
    align-items: baseline;
    span {
      font-size: 18px;
      color: cadetblue;
      padding-left: 10px;
    }
    p {
      font-size: 26px;
      font-weight: 540;
      color: #fff;
    }
  }
  .loginCtn {
    width: 85%;
    margin: auto;
    .One,
    .Two {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-top: 15px;
      border-bottom: 1px solid #009c7f66;
      padding: 15px;
      span {
        width: 7%;
        i {
          color: #009c7f;
          font-size: 26px;
        }
      }
      input {
        border: none;
        outline: none;
        flex: 1;
        background: transparent;
        color: #fff;
        &::-webkit-input-placeholder {
          color: #fff;
        }
      }
    }
    .Three {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      color: #fff;
      p {
        cursor: pointer;
        outline: none;
      }
    }
  }

  .loginFoot {
    width: 85%;
    margin: auto;
    input {
      width: 100%;
      height: 43px;
      background: #009c7f;
      margin-top: 53px;
      color: #fff;
      cursor: pointer;
    }
  }
}
// .box1 {
//   position: absolute;
//   top: 0px;
//   bottom: 0px;
//   width: 100%;
//   background: #2d2e2e36;
//   // z-index: -1;\

// }
.ani {
  transition: 0.2s ease;
  transform: scale(0.3);
}
</style>