<template>
  <div class="commodity">
    <!-- 1.头部 -->
    <div class="coyHeader">
      <el-row :gutter="10">
        <el-col :span="20">
          <el-input
            @change="coySearch"
            v-model.trim="input"
            placeholder="请输入关键字"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini" @click="coySearch"  icon="el-icon-search">
            查询
          </el-button>
        </el-col>
        <el-col :span="2">
          <!-- 路由传参 -->
          <router-link
            :to="{ name: 'CoyTianJia', query: { coyEditDoubt: true } }"
          >
            <el-button type="primary" size="mini"> 增加 </el-button>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <!-- 2.表格区域 -->
    <div class="coyTable">
      <el-row :gutter="10">
        <el-col :span="24">
          <!-- 表格 -->
          <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%"
            v-loading="coyLoding"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            ref="coyTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width=""> </el-table-column>
            <!-- type="index" 设置id为索引显示，show-overflow-tooltip自动隐藏 -->
            <el-table-column
              label="商品ID"
              prop="_id"
              width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="商品名称"
              width=""
              prop="coyName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="商品价格" width="80" prop="coyPrice">
            </el-table-column>
            <el-table-column label="商品数量" width="80" prop="coyCount">
            </el-table-column>
            <el-table-column label="商品类目" width="100" prop="coyKind">
            </el-table-column>
            <el-table-column
              label="商品图片"
              width=""
              prop="coyPicture"
              align="center"
            >
              <template scope="scope">
                <img
                  class="colImg"
                  :src="scope.row.coyPicture || ''"
                  width="100"
                />
              </template>
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
            <el-table-column
              label="操作"
              width="200"
              class="coyOperate"
              align="center"
             
            >
              <template scope="scope">
                <router-link
                  :to="{
                    name: 'CoyTianJia',
                    query: { coyEditDoubt: false, coyId: scope.row._id },
                  }"
                >
                  <el-button size="small" type="info"><i class="el-icon-edit"></i> 编辑 </el-button>
                </router-link>
                &nbsp;
                <el-button
                  size="small"
                  type="danger"
                  @click="coyOpenDel(scope.row._id)"
                  ><i class="el-icon-delete"></i>删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <!-- 
      删除按钮
     -->
    <div class="coyBtn">
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="delAllSelection()"> 删除选中 </el-button>
    </div>

    <!-- 3.分页 -->
    <Pag
      :total="total"
      v-if="pagShow"
      :pageSize="pageSize"
      @current-change="getPage"
    />
  </div>
</template>
<script>
import Pag from "../../components/SubLayout/Pag.vue";

export default {
  name: "Commodity",
  data() {
    return {
      input: "",
      tableData: [], //存储分页查询数据
      pageSize: 6, //每页显示的总页数
      total: 8, //  数据总数
      coyLoding: false, //loding
      pagShow: true, //通过v-if控制pag的销毁和注册
      coyIdList: [], //存储单个id的数据
      multipleSelection: [], //存储多选的数据
    };
  },
  components: {
    Pag,
  },
  methods: {
    //1-1.分页-得到了分页页码
    getPage(num) {
      // 请求前loging为true
      this.coyLoding = true;
      this.pagFinish(num);
    },
    //1-2.实现分页
    pagFinish(page) {
      this.$api
        .getCommodityList({
          page,
        })
        .then(
          (res) => {
            // 请求成功loding为false，分页显示
            this.coyLoding = false;
            this.pagShow = true;
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
    // 2.搜索
    coySearch() {
      //如果input为空不进行全部搜索，搜索时执行第一页查询
      if (this.input.length === 0) {
        //说明input数据为空
        // 请求前loging为true
        this.coyLoding = true;
        this.pagShow = false; //当空字符搜索时隐藏pagShow
        this.pagFinish(1);
        return false;
      }
      // 请求前loging为true
      this.coyLoding = true;
      this.$api
        .getCoyAllList()
        .then((res) => {
          // 请求成功false
          this.coyLoding = false;
          this.pagShow = false; //当搜索成功时隐藏pagShow
          if (res.status === 200) {
            this.tableData = res.data.data.filter((v) => {
              //方法1.indexOf
              //  return v.coyName.indexOf(this.input)!== -1;
              //方法2.使用includes+if判断全局查找字段,数自需要转换为字符串
              if (v.coyName.includes(this.input)) {
                return v.coyName.includes(this.input) == true;
              } else if (v.coyPicture.includes(this.input)) {
                return v.coyPicture.includes(this.input) == true;
              } else if (v.coyPrice.toString().includes(this.input)) {
                return v.coyPrice.toString().includes(this.input) == true;
              } else if (v.coyCount.toString().includes(this.input)) {
                return v.coyCount.toString().includes(this.input) == true;
              } else if (v.coyKind.includes(this.input)) {
                return v.coyKind.includes(this.input) == true;
              } else if (v.coySell.includes(this.input)) {
                return v.coySell.includes(this.input) == true;
              } else if (v.coyDescribe.includes(this.input)) {
                return v.coyDescribe.includes(this.input) == true;
              } else {
                return v._id.includes(this.input) == true;
              }
            });
            this.total = this.tableData.length;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 3.删除
    coyOpenDel(coyDelId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          // 3.1 执行调用删除代码
          this.coyIdList.push(coyDelId);
          // console.log( this.coyIdList);
          //   //3-2执行请求
          this.$api.postCommodityDel(this.coyIdList).then(
            (res) => {
              if (res.status === 200) {
                this.coyIdList = []; //3-3 删除成功列表为初始化空状态
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                // 3-4. 1秒刷新。刷新前销毁分页
                setTimeout(() => {
                  this.pagShow = false;
                  this.getPage(1);
                }, 1000);
              }
              // console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        })
        .catch(() => {
          // 3.2 取消删除代码
          // console.log(this.coyIdList);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //4.多选--取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.coyTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.coyTable.clearSelection();
      }
    },
    //获取表格选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //4.多选--多选删除
    delAllSelection() {
      if (this.multipleSelection.length) {
        //当选中时执行弹窗

        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(() => {
            //执行删除操作代码
            //----------
            //方法1.使用for循环
            // const length = this.multipleSelection.length; //获取多选的长度
            // let strId = []; //临时存储删除列表
            // for (let i = 0; i < length; i++) {
            //   strId.push(this.multipleSelection[i]._id);
            // }
            //方法2.使用forEach
            let strId = []; //临时存储删除列表
            this.multipleSelection.forEach((v) => {
              strId.push(v._id);
            });
            //------------
            // console.log(strId);  //得到id列表
            // 调用接口执行删除
            if (strId.length > 0) {
              this.$api
                .postCommodityDel(strId)
                .then((res) => {
                  this.$message({
                    type: "success",
                    message: "删除成功!",
                  });
                  setTimeout(() => {
                    this.pagShow = false;
                    this.getPage(1);
                  }, 1000);
                })
                .catch((err) => {});
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        //没有选中的时候
        this.$message({
          type: "info",
          message: "请选择您要删除的商品!!",
        });
      }
    },
    //5.编辑
    coyEdit(coyEditId) {
      this.$bus.$emit("sendId", coyEditId); //将id数据传给商品编辑页面
      //前进到商品添加路由(与商品添加页面一样)
      this.$router.replace({
        name: "CoyTianJia", //前进到命名为MsgContent的路由组件
      });
    },
  },
  created() {
    //created生命周期函数获取数据渲染到页面
    // 请求前loging为true
    this.coyLoding = true;
    // 1-3.初始化页面
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
  .colImg {
    max-width: 100%;
    height: auto;
    border: none;
    outline: none;
  }
  .coyBtn {
    padding: 10px;
    display: flex;
    align-items: center;
  }
}
</style>