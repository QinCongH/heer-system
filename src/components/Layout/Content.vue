<template>
  <div
    class="article"
    :class="isCollapse === true ? 'artWidth' : ''"
    :style="{ left: sideWidth }"
  >
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Content",
  data() {
    return {
      artWidth: "artWidth",
    };
  },
  computed: {
    ...mapState("sideAbout", {
      isCollapse: "isCollapse",
      sideWidth: "sideWidth",
    }), //从state中获取数据并简写
  },
};
</script>

<style>
.article {
  position: absolute;
  width: 85%;
  background: #f1f1f1;
    height: 93vh;
  transition: 0.33s ease-in-out;
  top: 0px;
  overflow: scroll;
}
.artWidth {
  width: 95%;
}
</style>