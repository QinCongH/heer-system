<template>
  <div class="personal pd10">
    <!-- 顶部 -->
    <div class="personal_top">
      <el-row :gutter="10">
        <el-col :md="18">
          <div class="personal_search">
            <el-input v-model="Keyword" placeholder="请输入内容"> </el-input>
          </div>
        </el-col>
        <el-col :md="6">
          <el-button class="defaultBtn" type="primary"> 查询 </el-button>
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
            <el-table-column label="id" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="邮箱" width="200">
            </el-table-column>
            <el-table-column
              prop="address"
              label="用户名"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="操作" width="220">
              <el-button type="danger" size="mini"
                ><i class="fa fa-trash-o" aria-hidden="true"></i> 删除
              </el-button>
              <el-button type="info" size="mini"
                ><i class="fa fa-pencil" aria-hidden="true"></i> 编辑
              </el-button>
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
        <Pag/>
    </div>
  </div>
</template>

<script>
// import {mapState} from "vuex"       //state
// import {mapMutations} from "vuex"   //commit
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
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(){
        
    }
  },
  components: {
    Pag,
  },
};
</script>

<style scoped lang="less">

</style>