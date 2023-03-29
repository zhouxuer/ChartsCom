<template>
  <my-container border class="tabs-box">
    <el-tabs tab-position='left' class="tabs-box">
      <el-tab-pane label="柱状图图表" class="content-box">
        <my-container border theme="success">柱状图图表</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ BarChart2Import }}
            <div style="height: 280px;">
              <bar-chart  :dataset="BarChart2Data" />
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

      <el-tab-pane label="横向柱状图滚动图表" class="content-box">
        <my-container border theme="success">横向柱状图滚动图表</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <pre>
              {{ RankingChartImport }}
            </pre>
            <div class="chart-h320" style="width: 450px">
              <ranking-chart :dataset="RankingChartData"></ranking-chart>
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">组件文档</span>
          </div>
          <div>
            <pre>
              // 图表数据,必传,默认
              dataset: {
                label: [],
                data: []
              }

              例如:
              dataset: {
                label: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7', 'label8', 'label9', 'label10'],
                data: [100, 92, 80, 70, 66, 53, 22, 10, 2, 0]
              }
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="折线图表" class="content-box">
        <my-container border theme="success">折线图表</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ LineChartImport }}
            <!-- <export-button :requestParams="requestParams"></export-button> -->
            <div style="height: 280px;">
              <line-chart
                :dataset="LineChartData"
                :color="LineChartColor"
                orient="vertical"
                :money="true"
              />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">组件文档</span>
          </div>
          <div>
            <pre>
            注意！父容器必须有高度！传入的数据必需为数字类型或数字字符串

            引入：import LineChart from "@/components/BiCharts/LineChart";

            dataset: {      // 参数
              tooltip: "right",       // tooltip是否显示在右侧，默认跟随鼠标位置自动切换左右
              legend: true,           // 是否显示图例，默认不显示
              date: ['01-01', '01-02', '01-03', '01-04','01-05'],   // x轴数据
              data: [{                // 图表数据
                name: '在线问诊',
                data: [20, 15, 12, 23, 18]
              }, {
                name: '我的医生',
                data: [12, 8, 12, 16, 20]
              }],
            },
            color: ["#FA114F", "#FFE620"],      // 非必需，折线的颜色，默认["#00B7FF","#A6FE00","#FA114F","#FFE620","#BF5AF2","#FE9F0A","#3AE9E6","#A28BFE","#FF5712","#5E5CE6","#FF453A",]
            orient: "vertical",     // 非必需，tooltip的布局朝向，值为vertical（垂直）和horizontal（水平），默认为horizontal
            unit: "%",    // 非必需，数值单位(y轴和tooltip)，默认无
            money: true,  // 非必需，默认为false，传入true时，说明数据为人民币单位，将数据转换为默认两位小数点，并添加￥符号
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="地图图表" class="content-box">
        <my-container border theme="success">地图图表</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ MapChartImport }}
            <!-- <export-button :requestParams="requestParams"></export-button> -->
            <div style="height: 380px;">
              <map-chart
                :dataset="MapChartData"
                :highlight="showRegion"
                bg="#3E4B27"
                :color="MapChartColor"
              />
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

            引入：import MapChart from "@/components/BiCharts/MapChart";

            dataset: [
              {
                name: '江苏',
                value: 1110
              }, {
                name: '上海',
                value: 10
              }, {
                name: '山西',
                value: 20
              }, {
                name: '新疆',
                value: 1
              }
            ],
            showRegion: '',      // 特定高亮的省份 不传或为空默认轮播
            bg: "",  // 有数据的省份背景色，不传默认为"#4B2833"
            color: []   // 高亮时的颜色，不传默认为["#E10014", "#FE3287"]

            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="地图图表2" class="content-box">
        <my-container border theme="success">地图图表2</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ MapChart2Import }}
            <div style="height: 280px;">
              <map-chart2
                :dataset="MapChart2Data"
                :highlight="showRegion2"
                bg="#3E4B27"
                :color="MapChart2Color"
              />
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

            引入：import MapChart from "@/components/BiCharts/MapChart";

            dataset: [
              {
                name: '江苏',
                value: 1110
              }, {
                name: '上海',
                value: 10
              }, {
                name: '山西',
                value: 20
              }, {
                name: '新疆',
                value: 1
              }
            ],
            showRegion: '',      // 特定高亮的省份 不传或为空默认轮播
            bg: "",  // 有数据的省份背景色，不传默认为"#4B2833"
            color: []   // 高亮时的颜色，不传默认为["#E10014", "#FE3287"]

            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="地图图表3" class="content-box">
        <my-container border theme="success">地图图表3</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ MapChart3Import }}
            <div style="height: 380px;">
              <map-chart3
                :dataset="MapChart3Data"
                :highlight="showRegion3"
                bg="#3E4B27"
                :color="MapChart3Color"
              />
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

            引入：import MapChart from "@/components/BiCharts/MapChart";

            dataset: [
              {
                name: '江苏',
                value: 1110
              }, {
                name: '上海',
                value: 10
              }, {
                name: '山西',
                value: 20
              }, {
                name: '新疆',
                value: 1
              }
            ],
            showRegion: '',      // 特定高亮的省份 不传或为空默认轮播
            bg: "",  // 有数据的省份背景色，不传默认为"#4B2833"
            color: []   // 高亮时的颜色，不传默认为["#E10014", "#FE3287"]

            </pre>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </my-container>
</template>

<script>
import BarChart from '@/components/demoCharts/BarChart';
import RankingChart from '@/components/demoCharts/RankingChart';
import LineChart from '@/components/demoCharts/LineChart';
import MapChart from '@/components/demoCharts/MapChart';
import MapChart2 from '@/components/demoCharts/MapChart2';
import MapChart3 from '@/components/demoCharts/MapChart3';
export default {
name: 'index',
components: {
  BarChart,
  RankingChart,
  LineChart,
  MapChart,
  MapChart2,
  MapChart3
},
data() {
  return {
    // 柱状图图表
    BarChart2Import: '<line-chart :dataset="dataset" />',
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
    RankingChartImport: '<ranking-chart :dataset="typeRank"></ranking-chart>',
    RankingChartData: {
      label: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7', 'label8', 'label9', 'label10'],
      data: [100, 92, 80, 70, 66, 53, 22, 10, 2, 0]
    },

    // 折线图表
    LineChartImport: '<line-chart :dataset="dataset" :color="color" orient="vertical" unit="%" :money="true"/>',
    LineChartData: {
      date: ['01-01', '01-02', '01-03', '01-04', '01-05'],
      data: [{
        name: '在线问诊',
        data: [2000, 15000, 1200, 2300, 1800]
      }],
      // tooltip: "right",
      legend: true
    },
    LineChartColor: ['#3895e0'],

    // 地图图表
    MapChartImport: '<map-chart :dataset="dataset" :highlight="showRegion" bg="#3E4B27" :color="color"/>',
    MapChartData: [
      {
        name: '江苏',
        value: 1110
      }, {
        name: '上海',
        value: 10
      }, {
        name: '山西',
        value: 20
      }, {
        name: '新疆',
        value: 1
      }
    ],
    showRegion: '',
    MapChartColor: ['#3BDC00', '#BEF600'],

    // 地图图表2
    MapChart2Import: '<map-chart :dataset="dataset" :highlight="showRegion" bg="#3E4B27" :color="color"/>',
    MapChart2Data: [
      {
        name: '江苏',
        value: 1110
      }, {
        name: '上海',
        value: 10
      }, {
        name: '山西',
        value: 20
      }, {
        name: '新疆',
        value: 1
      }
    ],
    showRegion2: '',
    MapChart2Color: ['#3BDC00', '#BEF600'],

    // 地图图表3
    MapChart3Import: '<map-chart :dataset="dataset" :highlight="showRegion" bg="#3E4B27" :color="color"/>',
    MapChart3Data: [
      {
        name: '江苏',
        value: 1110
      }, {
        name: '上海',
        value: 10
      }, {
        name: '山西',
        value: 20
      }, {
        name: '新疆',
        value: 1
      }
    ],
    showRegion3: '',
    MapChart3Color: ['#3BDC00', '#BEF600']
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
