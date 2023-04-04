<template>
  <my-container border class="tabs-box">
    <el-card class="box-card" size="mini">
      <div class="chart-h320" style="width: 450px">
        <ranking-chart :dataset="RankingChartData"></ranking-chart>
      </div>
    </el-card>
  </my-container>
</template>

<script>
import RankingChart from '@/components/demoCharts/RankingChart';
export default {
name: 'index',
components: {
  RankingChart
},
data() {
  return {
    // 组件使用示例
    RankingChartData: {
      label: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7', 'label8', 'label9', 'label10'],
      data: [100, 92, 80, 70, 66, 53, 22, 10, 2, 0]
    }
  };
},
created() {
},
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
