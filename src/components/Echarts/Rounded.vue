<template>
  <div class="Rounded">
    <div id="main1"></div>
  </div>
</template>

<script>
export default {
  name: "Rounded",
  methods: {
    showCharts() {
      var chartDom = document.getElementById("main1");
      var myChart = this.$echarts.init(chartDom);
      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.showCharts();
  },
};
</script>

<style lang="less" scoped>
.Rounded {
  margin-top: 30px;
  background: #fff;
  box-shadow: 0px 0px 25px #eee;
  padding: 10px;
  #main1 {
    width: auto;
    height: 350px;
  }
}
</style>