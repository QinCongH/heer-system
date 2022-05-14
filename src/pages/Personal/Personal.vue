<template>
  <div class="personal pd10">
    <!-- 顶部 -->
    <div class="personal_top">
      <el-row :gutter="10">
        <el-col :md="18">
          <div class="personal_search">
            <el-input
              v-model="Keyword"
              placeholder="请输入内容"
              @change="searchPersoner(Keyword)"
            >
            </el-input>
          </div>
        </el-col>
        <el-col :md="6">
          <el-button class="defaultBtn" type="primary" @click="searchPersoner(keyword)"> 查询 </el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 主体 -->
    <div class="personer_ctn">
      <el-row class="mt15">
        <el-col :md="24">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="_id" label="id" width="220">
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="200">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="操作" width="220">
              <template scope="scope">
              <el-button type="danger" size="mini" @click="deletePersonal(scope.row._id)"
                ><i class="fa fa-trash-o" aria-hidden="true"></i> 删除
              </el-button>
              <el-button type="info" size="mini"
                ><i class="fa fa-pencil" aria-hidden="true"></i> 编辑
              </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="mt15">
        <el-col :md="3">
          <el-button class="defaultBtn" @click="toggleSelection()"
            >取消选择</el-button
          >
        </el-col>
        &nbsp;
        <el-col :md="3">
          <el-button class="defaultBtn">删除选中</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 底部 -->
    <div class="personer_foot">
      <Pag
        :pageSize="psldata.pageSize"
        :page="psldata.page"
        :total="total"
        @current-change="getPage"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex"; //state
import Pag from "../../components/SubLayout/Pag.vue";
export default {
  name: "Personal",
  computed: {
    Keyword: {
      get() {
        return this.$store.state.personalAbout.searchKeyword; //获取值
      },
      set(newV) {
        this.$store.commit("personalAbout/CHANGE_KEYWORD", newV);
      },
    },
    ...mapState("personalAbout", {
      psldata: "data",
      total: "total",
      tableData: "tableData",
    }),
  },
  components: {
    Pag,
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    //发送给vuex使用axios
    ...mapActions("personalAbout", {
      getTableData: "getTableData", //分页
      searchPersoner:"searchPersoner", //搜索
      deletePersonal:"deletePersonal" //删除
}),
    //取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //获取pag的页码
    getPage(page) {
      this.getTableData(page);
    },
    handleSelectionChange() {},
  },

  mounted() {
    //  dom更新完的钩子，//初始化传值
    this.getTableData(1);
  },
};
</script>

<style scoped lang="less">
.personal_top,
.personal_ctn {
  .el-button--primary:focus,
  .el-button--primary:hover {
    background: #009c7f;
  }
}
</style>