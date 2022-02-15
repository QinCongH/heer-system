<template>
  <div>
    <!-- **弹窗** -->
    <!-- 
        :before-close弹窗关闭回调
       -->
    <!--商品选择---内弹窗 -->
    <el-dialog
      title="类目选择"
      :visible.sync="dialogVisible"
      width="70%"
      append-to-body
      load
      :before-close="Diaclose"
    >
      <!-- 内容s -->
      <tree />
      <!-- 内容e -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="Diaclose">取 消</el-button>
        <el-button type="primary" @click="Diaclose">确 定</el-button>
      </span>
    </el-dialog>
    <!--图片上传---内弹窗 -->
    <el-dialog
      title="图片上传"
      :visible.sync="dialogVisibleImg"
      width="70%"
      append-to-body
      load
      :before-close="ImgDiaclose"
    >
      <!-- 内容s -->
      <coy-upload-img />
      <!-- 内容e -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="ImgDiaclose">取 消</el-button>
        <el-button type="primary" @click="ImgDiaclose">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import Tree from "./CoyTree.vue";
import CoyUploadImg from "./CoyUploadImg.vue";

export default {
  name: "CoyDialog",
  components: {
    Tree,
    CoyUploadImg,
  },
  props: ["dialogVisible", "dialogVisibleImg"], //接收值  dialogVisible为true则弹窗开启
  methods: {
    Diaclose() {
      //商品选择弹窗----将false传递给父组件=>父组件将false传递给dialogVisible
      this.$bus.$emit("closeDia", false);
      // console.log(done);
    },
    ImgDiaclose() {
      //图片上传弹窗---将false传递给父组件=>父组件将false传递给dialogVisible
      this.$bus.$emit("closeDiaImg", false);
      // console.log(done);
    },
  },

};
</script>

<style>
</style>