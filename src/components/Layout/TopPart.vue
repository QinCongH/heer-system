<template>
  <div>
    <div class="header">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
        <span @click="openSide" v-show="isCollapse">
          <i class="fa fa-hand-o-right" aria-hidden="true"></i>
        </span>
        <span @click="closeSide" v-show="!isCollapse">
          <i class="fa fa-hand-o-left" aria-hidden="true"></i>
        </span>
      </div>

      <div class="language">
        <span>多语言</span>
        <select name="" id="">
          <option value="1">中文</option>
          <option value="">英文</option>
        </select>
      </div>
      <div class="loginButton">
        <span>
          欢迎：{{ myUsername }}
          &nbsp;
          <i class="fa fa-user-circle" aria-hidden="true"></i>
        </span>
        <div class="exitLogin" @click="exitLogin">
          <p>退出登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "TopPart",
  computed: {
    ...mapState("sideAbout", {
      isCollapse: "isCollapse",
    }), //获取vuex的sideAbout模块数据isCollapse
    ...mapGetters("sideAbout", {
      myUsername: "myUsername",
    }),
  },
  methods: {
    ...mapMutations("sideAbout", {
      closeSide: "CLOSESIDE",
      openSide: "OPENSIDE",
    }), //提交vuex的sideAbout模块方法
    exitLogin() {
      this.$confirm("您是否退出登录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then((res) => {
          // 清除token和username
          localStorage.removeItem("token");
          localStorage.removeItem("username");

          this.$message({
            showClose: true,
            message: "您已退出登录！",
            type: "success",
          });
          // 回到登录页
          setTimeout(() => {
            this.$router.replace({
              name: "DengLu",
            });
          }, 300);
        })
        .catch((err) => {
            return false
        });
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 40px;
  background: rgb(255, 255, 255);
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2;
  box-shadow: 0px 0px 12px #ececec;
  border-bottom: 0.5px solid #d5d5d5;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.logo {
  width: 15%;
  transition: 0.33s ease;
  position: relative;
  img {
    width: 38px;
    height: 38px;
    margin-left: 60px;
  }

  span {
    cursor: pointer;
    position: absolute;
    right: 0px;
    i {
      font-size: 22px;
      color: #009c7f;
      line-height: 40px;
    }
  }
}
.language,
.loginButton {
  font-size: 11px;
  line-height: 40px;
  color: #585252;
  cursor: pointer;
}
.language {
  flex: 1;
  transition: 0.33s ease;
  text-align: right;
}
.loginButton {
  width: 13%;
  text-align: center;
  transition: 0.33s ease;
  position: relative;
  i {
    font-size: 12px;
    color: #1a3ea6;
  }
  &:hover {
    .exitLogin {
      opacity: 1;
      z-index: -1;
    }
    box-shadow: 2px 3px 26px #dbd9d9;
  }
  .exitLogin {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #009c7f7a;
    color: #fff;
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    opacity: 0;
    transition: 0.33s ease;
  }
}
</style>
