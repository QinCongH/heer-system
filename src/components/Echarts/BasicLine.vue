<template>
  <div class="basicLine">
    <div id="main"></div>
  </div>
</template>

<script>
export default {
  name: "BasicLine",
  methods: {
    showEchats() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
       // 指定图表的配置项和数据
      var option = {

        tooltip: {},
        legend: {
          data: ['商品销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '商品销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.showEchats();
  },
};
</script>

<style lang="less" scoped>
.basicLine{
  margin-top: 30px;
  padding: 10px;
  background-color:#fff;
  box-shadow: 0px 0px 25px #eee;
    #main{
    width: auto;
    height: 350px;
  }
}

</style>