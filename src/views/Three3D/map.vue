<template>
  <my-container border class="tabs-box">
    <el-tabs tab-position='left' class="tabs-box">

      <el-tab-pane label="3d地图练习4" class="content-box">
        <my-container border theme="success">地图板块根据不同数据拉伸高度+鼠标拾取显示信息弹窗</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
            <span class="title">地图板块根据不同数据拉伸高度+鼠标拾取显示信息弹窗</span>
          </div>
          <img class="rotationBg" src="../../assets/three3D/Map3D/damo/02.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <div style="height: 800px">
              <Map3D4 />
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="3d地图练习3" class="content-box">
        <my-container border theme="success">地图板块根据不同数据拉伸高度+标签标注</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
            <span class="title">地图板块根据不同数据拉伸高度+标签标注</span>
          </div>
          <img class="rotationBg" src="../../assets/three3D/Map3D/damo/02.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <div style="height: 800px">
              <!-- <Map3D3 /> -->
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="3d地图练习2" class="content-box">
        <my-container border theme="success">地图板块根据不同数据对应不同颜色+鼠标射线拾取+div信息弹窗</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
            <span class="title">地图板块根据不同数据对应不同颜色+鼠标射线拾取+div信息弹窗</span>
          </div>
          <img class="rotationBg" src="../../assets/three3D/Map3D/damo/09.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <div style="height: 800px">
              <!-- <Map3D2 /> -->
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="3d地图练习1" class="content-box">
        <my-container border theme="success">3d地图练习1</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../../assets/three3D/Map3D/damo/01.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <div style="height: 800px">
              <!-- <Map3D1 /> -->
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
import Map3D4 from '@/components/Three3D/Map3D/map4/index.vue';
// import Map3D3 from '@/components/Three3D/Map3D/map3/index.vue';
// import Map3D2 from '@/components/Three3D/Map3D/map2/index.vue';
// import Map3D1 from '@/components/Three3D/Map3D/map1/index.vue';
import BarChart2 from '@/components/ProjectDemo1/BarChart2';
export default {
name: 'Three3D',
components: {
  Map3D4,
  // Map3D3,
  // Map3D2,
  // Map3D1,
  BarChart2
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
  .rotationBg {
    width: 60%;
  }
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
