<template>
  <div class="loginBox">
    <div class="loginFloor"></div>
    <!-- 登录/注册 -->

    <div class="logOrRst">
      <!--1. 注册 -->
      <register v-if="!isLogin"></register>
      <!--2. 登录 -->
      <div v-if="isLogin" class="login box2" :class="{ ani: isani }">
        <div class="loginTop">
          <p>登录</p>
          <span>SIGN IN </span>
        </div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginruleForm">
          <div class="loginCtn">
            <div class="One">
              <span><i class="fa fa-mobile" aria-hidden="true"></i> </span>
              <el-form-item prop="email">
                <el-input
                  type="text"
                  placeholder="请输入您的邮箱"
                  autocomplete="off"
                  v-model="loginForm.email"
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
                  v-model="loginForm.password"
                  show-password
                >
                </el-input>
              </el-form-item>
            </div>
            <div class="Three">
              <div>
                <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
              </div>
              <div @click="toRegister">
                <p>没有账户?</p>
              </div>
            </div>
          </div>
        </el-form>
        <div class="loginFoot">
          <input type="button" @click="loginSubmit" value="登录" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import Register from "./Register.vue";
export default {
  name: "Login",
  computed: {
    ...mapState("loginAbout", {
      loginForm: "loginForm",
      loginRules: "loginRules",
      isLogin: "isLogin",
      isani: "isani",
    }),
  },
  methods: {
    //vuex 1--commit提交值
    ...mapMutations("loginAbout", {
      toRegister: "CHANGELOGIN",
    }),
    //登陆的操作
    loginSubmit() {
      this.$refs.loginruleForm.validate((valid) => {
        if (valid) {
          // 1.字段发送给后端校验
          let data = {
            email: this.loginForm.email,
            password: this.loginForm.password,
          };
          // 登录接口
          this.$api
            .postLoginQuery(data)
            .then((res) => {
              // 发送username
              // console.log(res.data.data.username);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("username", res.data.data.username); //将用户名存入localStorage
              // 如果校验成功
              this.$message({
                showClose: true,
                message: "恭喜你，登录成功",
                type: "success",
              });
              //登录成功跳转到首页
              setTimeout(() => {
                this.$router.replace({
                  name: "ZhuYeNeiRong",
                });
              }, 300);
            })
            .catch((err) => {
              // console.log("什么都没有");
              //如果校验失败
              this.$message({
                showClose: true,
                message: "邮箱或密码错误！！！",
                type: "error",
              });
              return false;
            });
        } else {
          //如果校验失败
          this.$message({
            showClose: true,
            message: "请检查您输入的字段是否正确",
            type: "error",
          });
          return false;
        }
      });
    },

    //注册的操作
  },
  mounted() {},
  components: { Register },
};
</script>

<style lang="less" scoped>
.loginBox {
  position: relative;
  width: 100%;
  height: 87.8vh;
  padding-top: 70px;
  .loginFloor {
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    z-index: -1;
    // background-color: #f3e8cb38;
    background: url("../../assets/images/login.jpg") no-repeat;
    background-size: cover;
  }
  .logOrRst {
    width: 30%;
    margin: auto;
    position: relative;
    .login {
      width: 34%;
      background: transparent;
      box-shadow: 1px -1px 1px -1px #ffffff;
      border-radius: 10px;
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
    .box2 {
      position: absolute;
      top: 0px;
      bottom: 0px;
      width: 100%;
      background: #2d2e2e36;
      z-index: 0;
      // opacity: 0;
    }
  }
  .ani {
    transition: 0.2s ease;
    transform: scale(0.3);
  }
}
</style>