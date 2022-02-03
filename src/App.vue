<template>
  <div id="app">
    <!-- 路由视图 -->
    <router-view>
    </router-view>
  </div>
</template>

<script>
//引入组件
import Home from './pages/Home/Home.vue'
import Login from './pages/Login/Login.vue'
export default {
  name: 'App',
  component:{
    Home,
    Login
  }
}
</script>

<style>

</style>
