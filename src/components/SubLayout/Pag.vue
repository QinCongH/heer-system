<template>
  <div class="coyPag">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="block">
          <el-pagination
            background
            layout="prev, pager, next,total,jumper"
            :total="total"
            :page-size="pageSize"
            @current-change="getPage"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 分页组件
export default {
  name: "Pag",
  props: {
    total: {
      type: Number,
      default: 100,
    },
    pageSize: {
      type: Number,
      default: 6,
    },
    page:{
      type:Number
    }
  },
  data() {
    return {
    };
  },
  methods: {
    getPage(page) {//得到子组件传递的页数
      this.$emit("current-change", page); 
    },
  },

};
</script>

<style scoped lang="less">
.coyPag {
  .block {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>