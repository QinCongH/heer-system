<template>
  <div class="coyAdd">
    <!-- 1.面包屑 -->
    <el-breadcrumb class="breadCrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/front' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/Commodity">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.表单 -->
    <el-row class="coyForm">
      <el-col :span="24">
        <el-form
          ref="coyform"
          :rules="rules"
          :model="coyForm"
          label-width="80px"
        >
          <el-form-item label="商品名称" prop="coyName">
            <el-input
              v-model="coyForm.coyName"
              placeholder="请输入商品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="coyPrice">
            <el-input
              placeholder="请输入商品价格"
              v-model.number="coyForm.coyPrice"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="coyCount">
            <el-input
              placeholder="请输入商品数量"
              v-model.number="coyForm.coyCount"
            ></el-input>
          </el-form-item>
          <div class="coyflex">
            <el-form-item label="商品类目" class="cf1" prop="coyKind">
              <!-- 按钮 -->
              <el-button type="info" @click="dialogVisible = true"
                >选择</el-button
              >
              <span>
                {{ coyForm.coyKind }}
              </span>

              <coy-dialog :dialogVisible="dialogVisible" />
              <el-input v-model="coyForm.coyKind" type="hidden"> </el-input>
            </el-form-item>
            <!-- 图片上传 -->
            <el-form-item label="上传图片">
              <el-button
                type="primary"
                @click="dialogVisibleImg = !dialogVisibleImg"
              >
                上传
              </el-button>
              <!-- 
              显示上传成功的图片
             -->
              <div class="coyImg" v-if="coyForm.coyPicture!=''">
                <img :src="coyForm.coyPicture" alt="" />
              </div>
              <coy-dialog :dialogVisibleImg="dialogVisibleImg" />
            </el-form-item>
          </div>
          <el-form-item label="商品卖点" prop="coySell">
            <el-input
              v-model="coyForm.coySell"
              placeholder="请输入商品卖点"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="coyDescribe">
            <el-input
              type="textarea"
              class="destribe"
              v-model="coyForm.coyDescribe"
              :autosize="{ minRows: 4, maxRows: 10 }"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('coyform')"
              >确定</el-button
            >
            <el-button>清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CoyDialog from "../../components/SubLayout/CoyDialog.vue";
import base from "../../api/base";
export default {
  name: "CoyAdd",
  data() {
    return {
      // 表单内容 (时间与图片未绑定)
      coyForm: {
        coyName: "",
        coyPrice: "",
        coyCount: "",
        coyKind: "",
        coySell: "",
        coyDescribe: "",
        coyPicture: "", //商品图片上传成功的地址
      },
      //表单验证
      rules: {
        coyName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        coyPrice: [
          {
            required: true,
            message: "请输入价格！ovo只能是数字",
            trigger: "change",
            type: "number",
          },
        ],
        coyCount: [
          {
            required: true,
            message: "请输入数字",
            trigger: "change",
            type: "number",
          },
        ],
        coySell: [
          {
            required: true,
            message: "请输入商品卖点",
            trigger: "change",
          },
        ],
        coyDescribe: [
          {
            required: true,
            message: "请输入商品描述",
            trigger: "change",
          },
        ],
        coyKind: [
          {
            required: true,
            message: "请输入商品分类",
            trigger: "change",
          },
        ],
      },
      dialogVisible: false, //商品选择内弹窗\
      dialogVisibleImg: false, //商品上传图片内弹窗\
    };
  },
  methods: {
    // 前端表单验证
    submitForm(formName) {
      //验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "恭喜你,添加成功！",
            type: "success",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      //发送请求
       //当添加成功\
          this.$api.postCommodityAdd(this.coyForm).then((res)=>{
            console.log(res);
          },(err)=>{
            console.log(err);
          })
    },
  },
  components: {
    CoyDialog,
  },
  mounted() {
    this.$bus.$on("sendTree", (v) => {
      //接收Tree的数据

      this.coyForm.coyKind = v.label; //将选择的数据存储在表格
    });

    this.$bus.$on("closeDia", (v) => {
      //接收商品选择弹窗的关闭按钮
      this.dialogVisible = v;
      // console.log(v);
    });
    this.$bus.$on("closeDiaImg", (v) => {
      //接收图片上传弹窗的关闭按钮
      this.dialogVisibleImg = v;
      // console.log(v);
    });
    this.$bus.$on("getImgUrl", (v) => {
      //接收上传的图片url地址
      this.coyForm.coyPicture = base.host + v.slice(15);
    });
  },
};
</script>

<style lang="less" scoped>
.coyAdd {
  padding: 10px;
  .coyForm {
    margin-top: 30px;
  }
  .breadCrumb {
    margin-left: 11px;
  }
}

.destribe textarea {
  max-width: 90%;
}
.line {
  text-align: center;
}
.coyKindInput {
  height: 0px;
}
.coyflex {
  display: flex;
  // height: 67px;
  justify-content: stretch;
}
.el-form-item {
  margin-bottom: 36px;
}
.cf1 {
  width: 40%;
}
.coyImg {
  display: block;
    width: 250px;
    height: 170px;
  margin-left: 20px;
  float: right;
  text-align:center;
  img {
    max-width: 100%;
    height: 100%;
  }
}
</style>