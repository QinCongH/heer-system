<template>
  <div class="aside" :style="{ width: sideWidth }">
    <el-menu
      background-color="#4f5261"
      :default-active="$route.path"
      router
      class="el-menu-vertical-demo sideItem"
      text-color="#fff"
      active-text-color="”#fff“"
      :collapse="isCollapse"
      :class="dinline"
    >
      <el-menu-item index="/front" >
        <i class="fa fa-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/Commodity">
        <i class="fa fa-id-card-o" aria-hidden="true"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/Specification">
        <i class="fa fa-cog" aria-hidden="true"></i>
        <span slot="title">规格参数</span>
      </el-menu-item>
      <el-menu-item index="/Advertise">
        <i class="fa fa-plus-square-o" aria-hidden="true"></i>
        <span slot="title">广告中心</span>
      </el-menu-item>
      <el-menu-item index="/Personal">
        <i class="fa fa-male" aria-hidden="true"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-submenu index="6">
        <template slot="title">
          <i class="fa fa-sticky-note" aria-hidden="true"></i>
          <span slot="title">订单信息</span>
        </template>
        <el-menu-item index="/Order/OrderList">订单列表</el-menu-item>
        <el-menu-item index="/Order/Goods">货物管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex"; //简化获取state数据
export default {
  name: "Sidebar",
  computed: {
    //获取vuex的值
    ...mapState("sideAbout", {
      isCollapse: "isCollapse",
      sideWidth: "sideWidth",
    }),
    //缩小使导航栏图标居中
    dinline(){
      if(this.isCollapse===true){
        return 'dinline'
      }else{
        return null
      }
    }
  }
};
</script>

<style lang="less" scoped>
.sideItem {
  i {
    transform: translateX(-10px);
    color: #fff;
  }
  li {
    text-align: center;
  }
  .el-menu-item&:hover {
    background: #252c35 !important;
  }
}
.aside {
  position: fixed;
  width: 15%;
  top: 40px;
  bottom: 0px;
  background: #303445d9;
  transition: 0.33s ease-in-out;
}

.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
}

.el-menu-item.is-active {
  background: #303445d9 !important; //设置激活背景颜色
  color: #fff; //设置激活文字颜色
}
.el-submenu .el-menu-item {
  min-width: 15% !important;
}
.dinline i{
  display: inline;
}
</style>