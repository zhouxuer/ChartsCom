<template>
  <my-container border class="tabs-box">
    <el-card class="box-card" size="mini">
      <p class="dynamic-title">柱状图</p>
      <div class="dynamic-box" style="height: 280px;">
        <bar-chart :dataset="BarChart2Data" />
      </div>
    </el-card>
    <el-card class="box-card" size="mini">
      <p class="dynamic-title">横线柱状图</p>
      <div class="chart-h320 dynamic-box" style="width: 450px">
        <ranking-chart :dataset="RankingChartData"></ranking-chart>
      </div>
    </el-card>
  </my-container>
</template>

<script>
// import {
//   TweenMax,
//   gsap
//   // Back
// } from 'gsap'
// import { CSSRulePlugin } from 'gsap/CSSRulePlugin'; // 引入css插件,完成某些css动画
import BarChart from '@/components/demoCharts/BarChart';
import RankingChart from '@/components/demoCharts/RankingChart';
// gsap.registerPlugin(CSSRulePlugin)
export default {
name: 'index',
components: {
  BarChart,
  RankingChart
},
data() {
  return {
    // 柱状图图表
    BarChart2Data: {
      unit: '篇',
      legend: true,
      xAxisLabel: ['01-01', '01-02', '01-03', '01-04', '01-05'],
      datas: [{
        name: 'xxx1',
        data: [20, 10, 30, 23, 11]
      }, {
        name: 'xxx2',
        data: [12, 22, 11, 25, 23]
      }],
      barWidth: 10,
      // end: 50,
      colorList: [
        ['#236bb8', '#236BB838'],
        ['#5CB6FF', '#5CB6FF2B']
      ]
    },

    // 组件使用示例
    RankingChartData: {
      label: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7', 'label8', 'label9', 'label10'],
      data: [100, 92, 80, 70, 66, 53, 22, 10, 2, 0]
    }
  };
},
// mounted() {
//   TweenMax.staggerFrom(['.dynamic-box', '.dynamic-title'], 1, {
//     opacity: 0
//     // scale: 0,
//     // transformOrigin: '0% 50% -50'
//   }, 0.2)
// },
// beforeDestroy() {
//   TweenMax.staggerTo(['.dynamic-box', '.dynamic-title'], 1, {
//     opacity: 0
//     // scale: 0,
//     // transformOrigin: '0% 50% -50'
//   }, 0.2)
// },
methods: {}
}
</script>

<style lang="scss" scoped>
.tabs-box {
  height: 100%;
  width: 100%;
  text-align: left;
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
  width: 1200px;
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
