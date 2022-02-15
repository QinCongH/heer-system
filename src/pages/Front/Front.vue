<template>
  <div class="front">
    <el-row :gutter="20">
      <el-col :md="6" v-for="(value, index) in fhData" :key="index">
        <front-head :fhValue="value"> </front-head>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :md="12">
        <basic-line></basic-line>
      </el-col>
      <el-col :md="12">
        <rounded></rounded>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :md="8">
        <front-ctn title="最新内容">
          <li
            slot="newCtnList"
            v-for="(value, index) in fcData.newCtnList"
            :key="index"
          >
            <p>
              {{ value }}
            </p>
          </li>
        </front-ctn>
      </el-col>
      <el-col :md="8">
        <front-ctn :fcData="fcData" title="新增产品">
          <li
            slot="addPctList"
            v-for="(value, index) in fcData.addPctList"
            :key="index"
          >
            <p>
              {{ value }}
            </p>
          </li>
        </front-ctn>
      </el-col>
      <el-col :md="8">
        <front-ctn :fcData="fcData" title="快捷入口">
          <div class="FastList" slot="FastList">
            <div>
              <router-link to="/Commodity">
                <el-button type="primary"> 商品管理 </el-button>
              </router-link>
            </div>
            <div>
              <router-link to="/Advertise">
                <el-button type="primary"> 广告中心 </el-button>
              </router-link>
            </div>
            <div>
              <router-link to="/Personal">
                <el-button type="primary"> 个人中心 </el-button>
              </router-link>
            </div>
            <div>
              <router-link to="/Order/OrderList">
                <el-button type="primary"> 订单信息 </el-button>
              </router-link>
            </div>
            <div>
              <router-link to="/Specification">
                <el-button type="primary"> 规格参数 </el-button>
              </router-link>
            </div>
          </div>
        </front-ctn>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex"; //简化获取state数据
import BasicLine from "../../components/Echarts/BasicLine.vue";
import Rounded from "../../components/Echarts/Rounded.vue";
import FrontHead from "../../components/SubLayout/ForntHead.vue";
import FrontCtn from "../../components/SubLayout/FrontCtn.vue";
export default {
  components: { BasicLine, FrontHead, Rounded, FrontCtn },
  name: "Front",
  computed: {
    ...mapState("frontAbout", { fhData: "fhData", fcData: "fcData" }), //从vuex中获取数据
  },
};
</script>

<style lang="less" scoped>
.front {
  padding: 0px 10px;
  .FastList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      margin-top: 15px;
      button {
        background: #009c7f;
      }
    }
  }
}
</style>