<template>
  <my-container border class="tabs-box">
    <el-tabs tab-position='left' class="tabs-box">

      <el-tab-pane label="横向柱图" class="content-box">
        <my-container border theme="success">横向柱状图</my-container>
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
            <div style="height: 280px;">
              <line-chart
                :dataset="LineChartData"
                :color="LineChartColor"
                orient="vertical"
                :isArea="true"
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
                name: '数据1',
                data: [20, 15, 12, 23, 18]
              }, {
                name: '数据2',
                data: [12, 8, 12, 16, 20]
              }],
            },
            color: ["#FA114F", "#FFE620"],      // 非必需，折线的颜色，默认["#00B7FF","#A6FE00","#FA114F","#FFE620","#BF5AF2","#FE9F0A","#3AE9E6","#A28BFE","#FF5712","#5E5CE6","#FF453A",]
            smooth: "true" // 非必需，是否为折线图
            orient: "vertical",     // 非必需，tooltip的布局朝向，值为vertical（垂直）和horizontal（水平），默认为horizontal
            unit: "%",    // 非必需，数值单位(y轴和tooltip)，默认无
            money: true,  // 非必需，默认为false，传入true时，说明数据为人民币单位，将数据转换为默认两位小数点，并添加￥符号
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="曲线图表" class="content-box">
        <my-container border theme="success">曲线图表</my-container>
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
                :smooth="true"
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
                name: '数据1',
                data: [20, 15, 12, 23, 18]
              }, {
                name: '数据2',
                data: [12, 8, 12, 16, 20]
              }],
            },
            color: ["#FA114F", "#FFE620"],      // 非必需，折线的颜色，默认["#00B7FF","#A6FE00","#FA114F","#FFE620","#BF5AF2","#FE9F0A","#3AE9E6","#A28BFE","#FF5712","#5E5CE6","#FF453A",]
            smooth: "true" // 非必需，是否为折线图
            orient: "vertical",     // 非必需，tooltip的布局朝向，值为vertical（垂直）和horizontal（水平），默认为horizontal
            unit: "%",    // 非必需，数值单位(y轴和tooltip)，默认无
            money: true,  // 非必需，默认为false，传入true时，说明数据为人民币单位，将数据转换为默认两位小数点，并添加￥符号
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="柱状图图表" class="content-box">
        <my-container border theme="success">柱状图图表</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ BarChart2Import }}
            <div style="height: 480px;">
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
                name: '数据1',
                data: [20, 10, 30, 23, 11]
              }, {
                name: '数据2',
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

      <el-tab-pane label="环形图表" class="content-box">
        <my-container border theme="success">环形图表</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ PieChartImport }}
            <!-- <export-button :requestParams="requestParams"></export-button> -->
            <div style="width: 370px;height: 320px;background: #000">
              <pie-chart
                :dataset="PieChartData"
                title="任务数"
                :legendNum="false"
                width="260px"
                :showbtn="true"
                :row="1"
                :borderWidth="8"
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

            引入：import PieChart from "@/components/BiCharts/PieChart";

            dataset: [{
              name: '数据1',
              value: 200
            }, {
              name: '数据2',
              value: 300
            }, {
              name: '数据3',
              value: 350
            }, {
              name: '数据4',
              value: 400
            }],
            title: "任务数",  // 中心文字的文案
            legendNum: true,    // 默认为true， 图例是否显示数值，若不显示，则图例宽度默认为220px并且居中
            width: "300px",       // 当legendNum为false时起作用，为图例的宽度，不传默认为220px
            orient: "horizontal",  // 可选值为“horizontal"和”vertical“，不传值图例方向默认为vertical（水平两列）
            showbtn: false,   // 可选，默认为false，是否显示滚动按钮
            row: 2,   // 可选，显示几行图例，配合showbtn，传入值为数字类型
            font: 20,   // 可选，中间数字字体大小，默认32，
            subtitle: 10,   // 可选，中间副标题字体大小，默认14
            startAngle: 180, // 可选，数据间隔

            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="环形图表" class="content-box">
        <my-container border theme="success">环形图表</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ PieChartImport1 }}
            <!-- <export-button :requestParams="requestParams"></export-button> -->
            <div style="width: 370px;height: 320px;background: #000">
              <pie-chart
                :dataset="PieChartData1"
                title="任务数"
                :legendNum="false"
                width="260px"
                :showbtn="true"
                :row="1"
                :color="PieChartColor1"
                :startAngle="180"
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

            引入：import PieChart from "@/components/BiCharts/PieChart";

            dataset: [{
              name: '数据1',
              value: 200
            }, {
              name: '数据2',
              value: 300
            }, {
              name: '数据3',
              value: 350
            }, {
              name: '数据4',
              value: 400
            }],
            title: "任务数",  // 中心文字的文案
            legendNum: true,    // 默认为true， 图例是否显示数值，若不显示，则图例宽度默认为220px并且居中
            width: "300px",       // 当legendNum为false时起作用，为图例的宽度，不传默认为220px
            orient: "horizontal",  // 可选值为“horizontal"和”vertical“，不传值图例方向默认为vertical（水平两列）
            showbtn: false,   // 可选，默认为false，是否显示滚动按钮
            row: 2,   // 可选，显示几行图例，配合showbtn，传入值为数字类型
            font: 20,   // 可选，中间数字字体大小，默认32，
            subtitle: 10,   // 可选，中间副标题字体大小，默认14
            borderWidth: 0, // 可选，数据间隔
            startAngle: 180, // 可选，数据间隔

            </pre>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </my-container>
</template>

<script>
import LineChart from '@/components/ProjectDemo/LineChart';
import RankingChart from '@/components/ProjectDemo/RankingChart';
import BarChart from '@/components/ProjectDemo/BarChart';
import PieChart from '@/components/ProjectDemo/PieChart';
export default {
name: 'ProjectDemo',
components: {
  LineChart,
  RankingChart,
  BarChart,
  PieChart
},
data() {
  return {
    // 横向柱状图
    RankingChartImport: '<ranking-chart :dataset="typeRank"></ranking-chart>',
    RankingChartData: {
      label: ['label1', 'label2', 'label3', 'label4', 'label5'],
      data: ['100/120', '92/100', '80/140', '70/180', '66/100']
    },

    // 折线/曲线图表
    LineChartImport: '<line-chart :dataset="dataset" :color="color" orient="vertical" unit="%" :money="true"/>',
    LineChartData: {
      date: ['01-01', '01-02', '01-03', '01-04', '01-05'],
      data: [
        {
          name: '数据1',
          data: [2000, 15000, 1200, 2300, 1800]
        },
        {
          name: '数据2',
          data: [1200, 11000, 1500, 5300, 2400]
        }
      ],
      // tooltip: "right",
      legend: true
    },
    LineChartColor: ['#3895e0', '#A6FE00'],

    // EC横向柱状图表
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
        ['#91E6FF', '#00A5DD'],
        ['#FFD291', '#DD9200']
      ]
    },

    // 环形图表
    PieChartImport: '<pie-chart :dataset="dataset" title="任务数" :legendNum="false" orient="horizontal" :showbtn="true" :row="2"/>',
    PieChartData: [{
      name: '数据1',
      value: 200
    }, {
      name: '数据2',
      value: 300
    }, {
      name: '数据3',
      value: 350
    }, {
      name: '数据4',
      value: 400
    }],

    // 环形图表
    PieChartImport1: '<pie-chart :dataset="dataset" title="任务数" :legendNum="false" orient="horizontal" :showbtn="true" :row="2"/>',
    PieChartData1: [{
      name: '数据1',
      value: 12
    }, {
      name: '数据2',
      value: 3
    }],
    PieChartColor1: ['#3AE9E6', '#A28BFE']
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
