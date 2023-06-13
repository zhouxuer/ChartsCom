<template>
  <my-container border class="tabs-box">
    <el-tabs tab-position='left' class="tabs-box">

      <el-tab-pane label="map地图" class="content-box">
        <my-container border theme="success">map地图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <p>
          功能概述：<br/>
            1.引入地图，添加路径，标点，心跳移动位置，到达指定位置，弹窗说明数据。<br/>
            2.地图标点，增加标点状态，心跳切换位置，弹窗展示数据，鼠标可点击标点，移入标点等操作
        </p>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div style="height: 820px;">
            <Map/>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">组件文档</span>
          </div>
          <div>
            <pre>
            注意！父容器必须有高度！

            引入: import BarChart2 from "@/components/BiCharts/BarChart2";

            dataset: {      // 参数
              unit: '篇',     // 数量单位，默认为空
              legend: true,   // 显示图例，默认不显示
              barWidth: 16,   // 柱子的宽度
              end: 50,        // 百分比，从0开始显示的数据比例，默认为全显示
              colorList: [    // 颜色数组 默认为[["#00FBCF", "#00BAE1"]]
                ["#00BAE1", "#00FBD0"],
                ["#37DB00", "#BAFF00"],
              ],
              xAxisLabel: ['01-01', '01-02', '01-03', '01-04','01-05'], //x轴数据
              datas: [{                             // 图表数据，数组有几项就有几个柱
                name: '在线问诊',
                data: [20, 10, 30, 23, 11]
              }, {
                name: '我的医生',
                data: [12, 22, 11, 30, 23]
              }],
              barWidth: 16,
              end: 50,
              colorList: [
                ["#00BAE1", "#00FBD0"],
                ["#37DB00", "#BAFF00"],
              ],
            }
            </pre>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </my-container>
</template>

<script>
import Map from '@/components/OpenLayers/map';
export default {
name: 'OpenLayers',
components: {
  Map
},
data() {
  return {
    // 柱状图图表
    BarChart2Import2: '<line-chart :dataset="dataset" />',
    BarChart2Data2: {
      unit: '篇',
      xAxisLabel: [
        '行政公益诉讼 诉前程序案件',
        '民事公益 诉讼案件',
        '行政公益 诉讼案件',
        '刑事附带民事 公益诉讼案件'
      ],
      datas: [{
        name: '数据1',
        data: [20, 4, 5, 2]
      }],
      barWidth: 80,
      // end: 50,
      colorList: [
        ['#1A91FF', '#0A7BD224']
      ]
    }
  };
},
created() {},
methods: {}
}
</script>

<style lang="scss" scoped>
.tabs-box {
  height: 100%;
  width: 100%;
  ::v-deep .el-tabs__header {
    width: 10%;
  }
  ::v-deep .el-tabs__content {
    height: 100%;
    overflow: auto;
  }
}
.content-box {
  text-align: left;
  width: 100%;
}
.box-card {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: #333;
    font-size: 16px;
    font-weight: 700;
  }

  .personal {
    font-size: 12px;

    i {
      font-size: 14px;
      margin-right: 2px;
      vertical-align: -1px;
    }
  }
}

.chart-h320 {
  width: 100%;
  height: 320px;
  padding: 15px 20px;
  margin-bottom: 40px;
  border-radius: 12px;
  // background-color: #242526;
}

.chart-wrapper {
  width: 33.33%;
  height: 100%;
  float: left;
  border-right: 1px solid #3e4042;
  &:last-child {
    border-right: 0px;
  }
}
</style>
