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
    <!-- 
    个人中心编辑
   -->
    <el-dialog
      title="编辑"
      :visible.sync="personalEdit.isDialog"
      width="70%"
      append-to-body
      load
      :before-close="personalEditClose"
    >
      <!-- 内容s -->
      <personal-edit ref="getEditData"></personal-edit>
      <!-- 内容e -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="personalEditClose">取 消</el-button>
        <el-button type="primary" @click="perEditConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; //state
import Tree from "./CoyTree.vue";
import CoyUploadImg from "./CoyUploadImg.vue";
import PersonalEdit from "./PersonalEdit.vue";
export default {
  name: "CoyDialog",
  components: {
    Tree,
    CoyUploadImg,
    PersonalEdit,
  },
  computed: {
    ...mapState("personalAbout", { isEdit: "isEdit" }),
  },
  props: ["dialogVisible", "dialogVisibleImg", "personalEdit"], //接收值  dialogVisible为true则弹窗开启
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
    personalEditClose() {
      this.$bus.$emit("closePersonalDia", false);
    },
    perEditConfirm() {
      let editForm = this.$refs.getEditData.dynamicValidateForm;
      let sendpage = this.personalEdit.sendPage;
      this.$store.dispatch("personalAbout/editPersonal", {
        editForm,
        sendpage,
      });
        this.$nextTick(() => {
          this.personalEditClose()
        });
    },
  },
  watch: {},
};
</script>

<style>
</style>