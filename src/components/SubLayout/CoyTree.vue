<template>
  <div>
    <!-- 树形控件 -->
    <!-- 内容s -->
    <!-- 
      props配置选项,
      handleNodeClick节点被点击的回调
      highlight-current是否高亮显示选中

     -->
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
export default {
  name: "CoyTree",
  data() {
    return {
      data: [
        {
          label: "家居百货",
          children: [
            {
              label: "桌子",
            },
            {
              label: "椅子",
            },
            {
              label: "窗帘",
            },
            {
              label: "电视",
            },
          ],
        },
        {
          label: "休闲食品",
          children: [
               {
              label: "饮料",
            },
            {
              label: "鲜肉",
            },
            {
              label: "坚果",
            },
            {
              label: "锅巴",
            },
          ],
        },
        {
          label: "生鲜区",
          children: [
            {
              label: "海鲜",
              children: [
                {
                  label: "虾子",
                },
              ],
            },
           
          ],
        },
        {
          label: "水果区",
          children: [
           {
              label: "香蕉",
            },
            {
              label: "西瓜",
            },
            {
              label: "苹果",
            },
            {
              label: "草莓",
            },
          ],
        },
        {
          label: "运动穿搭",
          children: [
            {
              label: "鞋子",
            },
            {
              label: "裤子",
            },
            {
              label: "衣服",
            },
            {
              label: "围巾",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
         draggable:"true"
      },
    };
  },
  methods: {
    handleNodeClick(data) {//发送数据给CoyAdd
        this.$bus.$emit('sendTree',data)  
    },
  },
};
</script>

<style>
</style>