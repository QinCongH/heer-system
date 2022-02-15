<template>
  <div class="loginBox">
    <div class="loginFloor"></div>
    <!-- 登录 -->

    <div class="logOrRst">
      <!--1. 注册 -->
      <div v-if="!isLogin" class="login box1" :class="{ ani: !isani }">
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
              <span><i class="fa fa-mobile" aria-hidden="true"></i> </span>
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
                <el-checkbox v-model="loginForm.checked"
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
export default {
  name: "Login",
  computed: {
    ...mapState("loginAbout", {
      loginForm: "loginForm",
      loginRules: "loginRules",
      isLogin: "isLogin",
      registerForm: "registerForm",
      registerRules: "registerRules",
      isani: "isani",
    }),
  },
  methods: {
    ...mapMutations("loginAbout", {
      toRegister: "CHANGELOGIN",
      toLogin: "CHANGERST",
    }), //vuex 1--commit提交值
    //登陆的操作
    loginSubmit() {
      this.$refs.loginruleForm.validate((valid) => {
        if (valid) {
          // 如果校验成功
          this.$message({
            showClose: true,
            message: "恭喜你，这是一条成功消息",
            type: "success",
          });
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
    },
    //注册的操作
    rstSubmit() {
      this.$refs.rstruleForm.validate((valid) => {
        if (valid) {
          // 如果校验成功
          this.$message({
            showClose: true,
            message: "恭喜你，这是一条成功消息",
            type: "success",
          });
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
    },
  },
  data() {
    return {};
  },
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

    .box1 {
      position: absolute;
      top: 0px;
      bottom: 0px;
      width: 100%;
      background: #2d2e2e36;
      // z-index: -1;
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