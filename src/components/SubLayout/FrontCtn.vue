<template>
  <div class="FrontCtn">
    <div class="fcTop">
      <h1>{{ title }}</h1>
    </div>
    <div class="fcFoot">
      <ul>
          <!-- 列表插槽 -->
        <slot name="newCtnList"></slot> 
        <slot name="addPctList"></slot>
      </ul>
      <!-- 快捷跳转插槽 -->
      <slot name="FastList"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FrontCtn",
  props: ["title"],
};
</script>

<style lang="less" scoped>
.FrontCtn {
  width: auto;
  margin-top: 30px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 25px #eee;
  height: 350px;
  .fcTop {
    height: 60px;
    padding-left: 10px;
    font-size: 19px;
    border-bottom: 1px solid #ddd;
    line-height: 60px;
  }
  .fcFoot {
    padding: 10px 0px 0px 10px;
    ul {
      li {
        p {
          font-size: 16px;
          line-height: 30px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>