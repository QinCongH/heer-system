<template>
  <div class="coyAdd">
    <!-- 1.面包屑 -->
    <el-breadcrumb class="breadCrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/front' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/Commodity">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品{{ editOrAdd }}</el-breadcrumb-item>
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
              <div class="coyImg" v-if="coyForm.coyPicture != ''">
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
            <el-button type="primary" @click="submitForm('coyform')">{{
              editOrAddSubmit
            }}</el-button>
            <el-button @click="clearForm()">清空</el-button>
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
      //1-1制定表单验证规则
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
      getCoyEditId: false, //接收判断是否为编辑页面
    };
  },
  methods: {
    // 1-2.前端表单验证 增加提交/编辑提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$router.currentRoute.query.coyEditDoubt) {
            //如果为增加页面状态
            //2-1.发送请求 当添加成功时`---调用函数
            this.postCommodityAdd();
          } else {
            //进行更新提交
            this.getFormOneUpdata();
          }
        } else {
          //2-2添加失败   弹窗
          this.$message({
            message: "qwq格式错误！",
            type: "error",
          });
          console.log("error submit!!");
          return false;
        }
      });
      //
    },
    //2-1.发送请求 当添加成功时
    postCommodityAdd() {
      this.$api.postCommodityAdd(this.coyForm).then(
        (res) => {
          // /console.log(res);
          if (res) {
            //2-2添加成功   弹窗
            this.$message({
              message: "恭喜你,添加成功！",
              type: "success",
            });
            //2-3如果查询到了路由跳转到商品列表（编程式路由）,.5s跳转
            setTimeout(() => {
              this.$router.push({
                name: "Shangping", //后退到命名为Shangping的路由组件
              });
            }, 500);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    /*3.清空表字段。不等于空则清空。等于空则不清空 */
    clearForm() {
      //3-1 等于空则不清空
      for (let item in this.coyForm) {
        if (this.coyForm[item].toString().length > 0) {
          this.coyForm[item] = "";
        }
      }
      // 3-2.清空成功提示
      this.$message({
        message: "表单已清空ovo！",
        type: "success",
      });
    },
    /*  
      4-1.更新--- 将字段显示在表单
    */
    getFormOne() {
      if (this.$router.currentRoute.query.coyEditDoubt === false) {
        //如果为编辑
        let myid = this.$router.currentRoute.query.coyId;
        this.$api.getCoyOneList({ myid }).then((res) => {
          this.coyForm = res.data.data;
        });
      }
    },
    /*
    4-2.更新提交
    */
    getFormOneUpdata() {
        let myId=this.$router.currentRoute.query.coyId;
        const data={  //发送的数据
          myId:myId,
          myList:this.coyForm
        }
        this.$api.getCoyUpdata(data).then(res=>{
            if(res.status===200){
                          //2-2添加成功   弹窗
            this.$message({
              message: "恭喜你,更新成功！",
              type: "success",
            });
            //2-3如果查询到了路由跳转到商品列表（编程式路由）,.5s跳转
            setTimeout(() => {
              this.$router.push({
                name: "Shangping", //后退到命名为Shangping的路由组件
              });
            }, 500);
            }
        }).catch(err=>{
            console.log(err);
        })
        // console.log(this.coyForm,myId);
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
    this.getFormOne(); // 调用显示表单数据
  },

  computed: {
    editOrAdd() {
      // 通过路由传参得到判断是否为添加/编辑---true为添加,false为编辑 this.$router.currentRoute.query.coyEditDoubt
      return this.$router.currentRoute.query.coyEditDoubt ? "添加" : "编辑";
    },
    editOrAddSubmit() {
      // 通过路由传参得到判断是否为添加/编辑---true为添加,false为编辑 this.$router.currentRoute.query.coyEditDoubt
      return this.$router.currentRoute.query.coyEditDoubt ? "添加" : "保存";
    },
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
  text-align: center;
  img {
    max-width: 100%;
    height: 100%;
  }
}
</style>