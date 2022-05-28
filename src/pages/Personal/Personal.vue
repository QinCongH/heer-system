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
          <el-button
            class="defaultBtn"
            type="primary"
            @click="searchPersoner(keyword)"
          >
            查询
          </el-button>
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
                <el-button
                  type="danger"
                  size="mini"
                  @click="deletePersonal(scope.row._id)"
                  ><i class="fa fa-trash-o" aria-hidden="true"></i> 删除
                </el-button>
                <el-button
                  type="info"
                  size="mini"
                  @click="personalEdit(scope.row)"
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
          <el-button class="defaultBtn" @click="delChose">删除选中</el-button>
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
    <coy-dialog :personalEdit="isDialog"></coy-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex"; //state
import Pag from "../../components/SubLayout/Pag.vue";
import CoyDialog from "../../components/SubLayout/CoyDialog.vue";

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
    CoyDialog,
  },
  data() {
    return {
      multipleSelection: [],
      sendPage: 1,
      delData: [],
      isDialog: false,
    };
  },
  methods: {
    //发送给vuex使用axios
    ...mapActions("personalAbout", {
      getTableData: "getTableData", //分页
      searchPersoner: "searchPersoner", //搜索
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
      this.sendPage = page;
    },
    // 删除
    deletePersonal(val) {
      //传递一个对象
      this.$store.dispatch("personalAbout/deletePersonal", {
        sendIdList: val,
        sendpage: this.sendPage,
        sogleDel: true,
      });
    },
    //删除选择
    delChose() {
      if (this.delData.length > 0) {
        this.$store.dispatch("personalAbout/deletePersonal", {
          sendIdList: this.delData,
          sendpage: this.sendPage,
          sogleDel: false,
        });
      }
      return false;
    },
    handleSelectionChange(rows) {
      //多选删除
      // console.log(rows)
      this.delData = rows.map((v, i) => {
        return v._id;
      });
      // console.log(this.delData)
    },
    // 编辑
    personalEdit(val) {
      this.isDialog = true;
      this.$nextTick(function () {
        this.$bus.$emit("perEditData", val);
      });
    },
  },

  mounted() {
    //  dom更新完的钩子，//初始化传值
    this.getTableData(1);
    this.$bus.$on("closePersonalDia", (v) => {
      this.isDialog = false;
    });
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