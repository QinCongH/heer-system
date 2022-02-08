<template>
  <div>
    <!-- 
          action上传的地址
          on-preview	点击文件列表中已上传的文件时的钩子	function(file)	
          on-remove	文件列表移除文件时的钩子	function(file, fileList)
          file-list	上传的文件列表, 例如: [{name: 'food.jpg', url:
          auto-upload	是否在选取文件后立即进行上传	boolean	\
          :on-success 上传成功的钩子
            name="file" 设置文件字段名
       -->
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="uplodeImgUrl"
      :on-success="successImg"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      name="file"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
   
    </el-upload>
 
  </div>
</template>

<script>
import base from '../../api/base'
export default {
  name: "CoyUploadImg",
  data() {
    return {
      fileList: [
      //  name,url
      ],
      uplodeImgUrl:base.updataImg //上传图片的后端路由地址
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 图片上传成功的回调function(response, file, fileList)
    successImg(res,file,fileList){
      // console.log(res);
      this.$bus.$emit('getImgUrl',res.img)  //发送给全局事件总线
      // res.img
    }
  },
};
</script>

<style>
</style>