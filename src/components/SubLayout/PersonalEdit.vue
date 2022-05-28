<template>
  <div class="personal-edit">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <!-- 邮箱 -->
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="dynamicValidateForm.email"></el-input>
      </el-form-item>
      <el-form-item
        prop="username"
        label="用户名"
        :rules="[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="dynamicValidateForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="resetForm('dynamicValidateForm')"
          style="float: right"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        email: "",
        username: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getEditData() {
      this.$bus.$on("perEditData", (val) => {
        this.$nextTick(() => {
          this.dynamicValidateForm.email = val.email;
          this.dynamicValidateForm.username = val.username;
        });
      });
    },
  },
  mounted() {
    this.getEditData();
  },
  beforeDestroy() {
    //销毁前对事件解绑
    this.$bus.$off("perEditData");
  },
};
</script>

<style>
</style>