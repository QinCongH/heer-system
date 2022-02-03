<template>
  <div class="commodity">
    <!-- 1.头部 -->
    <div class="coyHeader">
      <el-row :gutter="10">
        <el-col :span="20">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini"> 查询 </el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini"> 编辑 </el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 2.表格区域 -->
    <div class="coyTable">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-table :data="tableData" stripe border style="width: 100%">
            <el-table-column type="selection" width=""> </el-table-column>
            <el-table-column label="商品ID" type="index" width="80">
            </el-table-column>
            <el-table-column
              label="商品名称"
              width=""
              prop="coyName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="商品价格" width="" prop="coyPrice">
            </el-table-column>
            <el-table-column label="商品数量" width="" prop="coyCount">
            </el-table-column>
            <el-table-column label="商品类目" width="" prop="coyKind">
            </el-table-column>
            <el-table-column
              label="商品图片"
              width=""
              prop="coyPicture"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="商品卖点"
              width=""
              prop="coySell"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="商品描述"
              width=""
              prop="coyDescribe"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template>
                <el-button size="mini" type="info">编辑</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <!-- 3.分页 -->
    <Pag :total="total" :pageSize="pageSize" @current-change="getPage" />
  </div>
</template>

<script>
import Pag from "../../components/SubLayout/Pag.vue";
export default {
  name: "Commodity",
  data() {
    return {
      input: "",
      tableData: [],
      pageSize: 6,  //每页显示的总页数
      total: 8, //  数据总数
    };
  },

  components: {
    Pag,
  },
  methods: {
/*
1.分页
*/

    // 得到了分页页码
    getPage(num) {
      this.pagFinish(num)
    },
    //实现分页
    pagFinish(page) {
      this.$api
        .getCommodityList({
          page,
        })
        .then(
          (res) => {
            if (res.data.status === 200) {
              this.tableData = res.data.data;
              this.pageSize = res.data.pageSize; //从数据库获取每页显示的总页数
              this.total = res.data.count; //  从数据库获取数据总数
            }

            // console.log(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
    },
  },
  //mounted生命周期函数获取数据渲染到页面
  mounted() {
    //第一次页数为1
    this.pagFinish(1);
  },
};
</script>

<style scoped lang="less">
.commodity {
  padding: 10px;
  .coyHeader {
    button {
      outline: none;
      height: 39px;
      width: 100%;
    }
  }
  .coyTable {
    .el-table {
      margin-top: 10px;
    }
  }
  .el-row {
    margin: 0px !important;
  }
}
</style>