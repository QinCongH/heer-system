<template>
  <div class="container">
    <!-- 头部 -->
    <header>
      <TopPart />
    </header>

    <section class="section">
      <!-- 侧边栏 -->
      <aside>
        <Sidebar />
      </aside>
      <!-- 内容 -->
      <article>
        <Content />
      </article>
    </section>
  </div>
</template>

<script>
import TopPart from "../../components/Layout/TopPart";
import Sidebar from "../../components/Layout/Sidebar";
import Content from "../../components/Layout/Content";
export default {
  name: "Home",
  components: {
    TopPart,
    Sidebar,
    Content,
  },
};
</script>

<style lang="less" scoped>
.container {
  margin: auto;
  position: relative;
}
.Standard {
  width: 1140px;
}

.section {
  position: relative;
  top: 40px;
  background: aliceblue;
}

</style>