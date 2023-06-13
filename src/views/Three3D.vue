<template>
  <my-container border class="tabs-box">
    <el-tabs tab-position='left' class="tabs-box">

      <el-tab-pane label="3d地图练习" class="content-box">
        <my-container border theme="success">3d地图练习</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <div style="height: 800px">
              <Map3D />
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="3d地图练习" class="content-box">
        <my-container border theme="success">3d地图练习</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <div style="height: 800px">
              <foundation />
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="3d地球" class="content-box">
        <my-container border theme="success">3d地球</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ BarChart2Import2 }}
            <div style="height: 280px;background: #000">
              <bar-chart2  :dataset="BarChart2Data2" />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">组件文档</span>
          </div>
          <div>
            <pre>
              注意！父容器必须有高度！
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

    </el-tabs>
  </my-container>
</template>

<script>
import BarChart2 from '@/components/ProjectDemo1/BarChart2';
import Foundation from '@/components/Three3D/Foundation/index.vue';
import Map3D from '@/components/Three3D/Map3D/index.vue';
export default {
name: 'Three3D',
components: {
  BarChart2,
  Foundation,
  Map3D
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
  width: 1400px;
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
