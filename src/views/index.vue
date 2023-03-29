<template>
  <my-container border class="tabs-box">
    <el-tabs tab-position='left' class="tabs-box">
      <el-tab-pane label="面积图表" class="content-box">
        <my-container border theme="success">面积图表</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ AreaChartImport }}
            <div style="height: 200px;background: #000">
              <area-chart :dataset="AreaChartData" />
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

              引入: import AreaChart from "@/components/BiCharts/AreaChart";

              dataset: {                          // 参数
                unit: 'W',                        // 显示的单位，默认无单位
                yAxis: true,                      // 是否显示y轴坐标以及网格竖线，默认无
                start: 0,                         // 从百分之N显示数据，默认从头显示
                offset: "0",                      // y轴的偏移量，默认为0
                xAxisData: ['01-01', '01-02', '01-03', '01-04','01-05'],  // x轴的数据
                chartData: [880, 200, 300, 500,400],      // y轴数据
              }
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="柱状图图表2" class="content-box">
        <my-container border theme="success">柱状图图表2</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ BarChart2Import }}
            <div style="height: 200px;background: #000">
              <bar-chart2  :dataset="BarChart2Data" />
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

      <el-tab-pane label="滚动柱状图" class="content-box">
        <my-container border theme="success">滚动柱状图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
      <div slot="header" class="card-header">
        <span class="title">使用示例</span>
      </div>
      <div>
        {{ BarScrollImport }}
        <!-- <export-button :requestParams="requestParams"></export-button> -->
        <div style="height: 200px;background: #000">
          <bar-scroll
            :dataset="BarScrollData"
            :colorList="BarScrollColor"
            :showno="false"
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

        引入：import BarScroll from "@/components/BiCharts/BarScroll";

        dataset: {      // 参数
          yAxisDate: ['区域影像', '区域影像1', '区域影像2', '区域影像3', '区域影像4', '区域影像5', '区域影像6'],  //左边label
          data: [120, 110,100,90,80,70,30],   // 数据，以及右边label
          unit: '', // 单位，默认无
        },
        colorList: ["#FA114F", "#FFE620"],      // 非必需，默认["#FA114F", "#FF5712", "#FFE620", "#FFF"]
        showno: "false",     // 非必需，默认true，是否显示排名文字，NO.1...
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
            <div style="height: 200px;background: #000">
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
            <div style="height: 200px;background: #000">
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
              name: '在线问诊',
              value: 200
            }, {
              name: '我的医生',
              value: 300
            }, {
              name: '院内会诊',
              value: 350
            }, {
              name: '处方',
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

            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="极坐标柱状图" class="content-box">
        <my-container border theme="success">极坐标柱状图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ PolarBarImport }}
            <div style="height: 320px; width: 360px; margin: auto">
              <polar-bar :dataset="PolarBarData" legendTop="240px" />
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

            引入：import PolarBar from "@/components/BiCharts/PolarBar";

            属性：
            dataset: {      // echarts参数
              title: '总篇数', // 图形中间标题文本
              radius: ["150px", "70px"], // 图表大小
              space: '6px', // 图例垂直间隔距离
              dataArr: [300, 600, 900], // 数据数组
              nameArr: ["专业论文", "专业文章", "运营文章"],// 数据对应的lable
            }

            colorArr: 数据对应的颜色样式，数组类型，默认 ["#FA114F", "#A6FE00", "#00B7FF"]

            backgroundColor: 图形背景底色，字符串类型，默认 '#222224'

            top: 中间文本垂直位置，字符串或数字类型，默认 '43%'

            legendTop: 图例垂直位置，字符串类型，支持px或%，默认 '218px'

            legendLeft: 图例水平位置，字符串类型，支持px或%，默认 '53%'

            startAngle: 起始角度，数字类型，默认 270

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
              dataset: 图表数据,必传,默认{
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

      <el-tab-pane label="面积图表2" class="content-box">
        <my-container border theme="success">面积图表2</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <pre>
              {{ AreaChart2Import }}
            </pre>
            <div class="chart-h320">
              <area-chart2 :dataset="AreaChart2Data" />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">组件文档</span>
          </div>
          <div>
            <pre>
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="柱状图图表3" class="content-box">
        <my-container border theme="success">柱状图图表3</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <pre>
              {{ AreaChart2Import }}
            </pre>
            <div class="chart-h320">
              <bar-chart3
                  :dataset="BarChart3Data"
                  :isStack="false"
                  :showLegend="false"
                  bottom="0"
                  :colorArr="BarChart3Data.colorList"
                  titleType="year"
                  :color="BarChart3Data.color"
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
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="柱状图加折线图" class="content-box">
        <my-container border theme="success">柱状图加折线图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <pre>
              {{ AreaChart2Import }}
            </pre>
            <div class="chart-h320">
              <bar-line-chart :dataset="BarLineChartData" :colorArr="BarLineChartColor" />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">组件文档</span>
          </div>
          <div>
            <pre>
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
            <pre>
              {{ AreaChart2Import }}
            </pre>
            <div class="chart-h320">
              <map-chart1 :dataset="mapDistribution" />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">组件文档</span>
          </div>
          <div>
            <pre>
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="环形图表2" class="content-box">
        <my-container border theme="success">环形图表2</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <pre>
              {{ AreaChart2Import }}
            </pre>
            <div class="chart-h320">
              <pie-chart-2
                :dataset="PieChart2Data"
                :color="[
                  ['rgba(254, 50, 135, 1)', 'rgba(225, 0, 20, 1)'],
                  ['rgba(186, 255, 0, 1)', 'rgba(55, 219, 0, 1)'],
                  ['rgba(0, 251,208, 1)', 'rgba(0, 186, 225, 1)'],
                ]"
                :setRadius="[0, 61]"
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
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="环形图表3" class="content-box">
        <my-container border theme="success">环形图表3</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <pre>
              {{ AreaChart2Import }}
            </pre>
            <div class="chart-h320">
              <pie-chart3
                title="总数"
                :dataset="PieChart3Data"
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
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="极地图表" class="content-box">
        <my-container border theme="success">极地图表</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <pre>
              {{ AreaChart2Import }}
            </pre>
            <div class="chart-h320">
              <polar-chart :dataset="PolarChartData" />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">组件文档</span>
          </div>
          <div>
            <pre>
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="极地图表2" class="content-box">
        <my-container border theme="success">极地图表2</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <pre>
              {{ AreaChart2Import }}
            </pre>
            <div class="chart-h320">
              <div
                class="chart-wrapper"
                v-for="(item, key) in PolarChart2Data"
                :key="key"
              >
                <polar-chart2
                  :total="PolarChart2TotalEva"
                  :title="item.title"
                  :num="item.num"
                  :color="item.color"
                  :bgColor="item.bgColor"
                  :radius=[50,60]
                />
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">组件文档</span>
          </div>
          <div>
            <pre>
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="雷达图" class="content-box">
        <my-container border theme="success">雷达图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <pre>
              {{ AreaChart2Import }}
            </pre>
            <div class="chart-h320">
              <radar-chart :dataset="RadarChartData" />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">组件文档</span>
          </div>
          <div>
            <pre>
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="环形图表4" class="content-box">
        <my-container border theme="success">环形图表4</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <pre>
              {{ AreaChart2Import }}
            </pre>
            <div class="chart-h320" style="width: 360px;">
              <special-Chart
                :dataset="SpecialChartData"
                :showbtn="true"
                :row="3"
                title="医生科室分布"
                font="24"
                top="40%"
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
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </my-container>
</template>

<script>
import AreaChart from '@/components/charts/AreaChart';
import BarChart2 from '@/components/charts/BarChart2';
import BarScroll from '@/components/charts/BarScroll';
import LineChart from '@/components/charts/LineChart';
import MapChart from '@/components/charts/MapChart';
import PieChart from '@/components/charts/PieChart';
import PolarBar from '@/components/charts/PolarBar';
import RankingChart from '@/components/BiRankingChart';
import AreaChart2 from '@/components/charts/AreaChart2';
import BarChart3 from '@/components/charts/BarChart3';
import BarLineChart from '@/components/charts/BarLineChart';
import MapChart1 from '@/components/charts/MapChart1';
import PieChart2 from '@/components/charts/PieChart2';
import PieChart3 from '@/components/charts/PieChart3';
import PolarChart from '@/components/charts/PolarChart';
import PolarChart2 from '@/components/charts/PolarChart2';
import RadarChart from '@/components/charts/RadarChart';
import SpecialChart from '@/components/charts/SpecialChart';
export default {
name: 'index',
components: {
  AreaChart,
  BarChart2,
  BarScroll,
  LineChart,
  MapChart,
  PieChart,
  PolarBar,
  RankingChart,
  AreaChart2,
  BarChart3,
  BarLineChart,
  MapChart1,
  PieChart2,
  PieChart3,
  PolarChart,
  PolarChart2,
  RadarChart,
  SpecialChart
},
data() {
  return {
    // 面积图表
    AreaChartImport: '`<area-chart :dataset="dataset" />`',
    AreaChartData: {
      unit: 'W',
      yAxis: true,
      start: 0,
      offset: '0',
      xAxisData: ['01-01', '01-02', '01-03', '01-04', '01-05'],
      chartData: [880, 200, 300, 500, 400]
    },

    // 柱状图图表
    BarChart2Import: '<line-chart :dataset="dataset" />',
    BarChart2Data: {
      unit: '篇',
      legend: true,
      xAxisLabel: ['01-01', '01-02', '01-03', '01-04', '01-05'],
      datas: [{
        name: '在线问诊',
        data: [20, 10, 30, 23, 11]
      }, {
        name: '我的医生',
        data: [12, 22, 11, 30, 23]
      }],
      barWidth: 16,
      // end: 50,
      colorList: [
        ['#00BAE1', '#00FBD0'],
        ['#37DB00', '#BAFF00']
      ]
    },

    // 滚动柱状图
    BarScrollImport: 'import BarScroll from "@/components/BiCharts/BarScroll";',
    BarScrollData: {
      yAxisDate: ['区域影像', '区域影像1', '区域影像2', '区域影像3', '区域影像4', '区域影像5', '区域影像6'],
      data: [120, 110, 100, 90, 80, 70, 30],
      unit: ''
    },
    BarScrollColor: [
      '#FA114F',
      '#A6FE00',
      '#FA114F',
      '#FFE620',
      '#BF5AF2',
      '#FE9F0A',
      '#3AE9E6',
      '#A28BFE',
      '#FF5712',
      '#5E5CE6',
      '#FF453A'
    ],

    // 折线图表
    LineChartImport: '<line-chart :dataset="dataset" :color="color" orient="vertical" unit="%" :money="true"/>',
    LineChartData: {
      date: ['01-01', '01-02', '01-03', '01-04', '01-05'],
      data: [{
        name: '在线问诊',
        data: [2000, 15000, 1200, 2300, 1800]
      }, {
        name: '我的医生',
        data: [1200, 8000, 1200, 1600, 2000]
      }],
      // tooltip: "right",
      legend: true
    },
    LineChartColor: ['#FA114F', '#FFE620'],

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

    // 环形图表
    PieChartImport: '<pie-chart :dataset="dataset" title="任务数" :legendNum="false" orient="horizontal" :showbtn="true" :row="2"/>',
    PieChartData: [{
      name: '在线问诊',
      value: 200
    }, {
      name: '代客下单（个人）',
      value: 300
    }, {
      name: '院内会诊',
      value: 350
    }, {
      name: '代客下单（机构）',
      value: 400
    }],

    // 组件使用示例
    PolarBarImport: '<polar-bar :dataset="dataset" legendTop="234px" />',
    PolarBarData: {
      title: '总篇数', // 图形中间标题文本
      radius: ['152px', '80px'], // 图表大小
      space: '4px', // 图例垂直间隔距离
      dataArr: [300, 600, 900], // 数据数组
      nameArr: ['专业论文', '专业文章', '运营文章'] // 数据对应的lable
    },

    // 组件使用示例
    RankingChartImport: '<ranking-chart :dataset="typeRank"></ranking-chart>',
    RankingChartData: {
      label: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7', 'label8', 'label9', 'label10'],
      data: [100, 92, 80, 70, 66, 53, 22, 10, 2, 0]
    },

    // 面积图表2
    AreaChart2Import: '`<area-chart2 :dataset="dataset" />`',
    AreaChart2Data: {
      unit: '家',
      unitSize: '16px',
      yAxis: true,
      start: 0,
      offset: '24',
      xAxisData: ['01-01', '01-02', '01-03', '01-04', '01-05'],
      chartData: [
        {
          name: '111',
          data: [11, 33, 44, 45, 54]
        }
      ]
    },

    // 柱状图图表3
    BarChart3Data: {
      unit: '篇',
      date: ['01-01', '01-02', '01-03', '01-04', '01-05'],
      data: [
        {
          name: '111',
          data: [880, 200, 300, 500, 400]
        },
        {
          name: '222',
          data: [800, 280, 380, 570, 440]
        }
      ],
      barWidth: 16,
      colorList: ['#00BAE1', '#00FBD0', '#37DB00', '#BAFF00'],
      color: ['#BAFF00', '#00FBD0']
    },

    // 柱状图加折线图
    BarLineChartData: {
      title: ['#FA114F', '#A6FE00', '#3AE9E6'],
      xAxisLabel: ['#FA114F', '#A6FE00', '#3AE9E6'],
      barData: [
        {
          name: '111',
          data: [11, 22, 33]
        }
      ],
      lineData: [
        {
          name: '222',
          data: [33, 20, 18]
        }
      ],
      barWidth: 8,
      end: 100,
      legend: true
    },
    BarLineChartColor: ['#FA114F', '#A6FE00', '#3AE9E6'],

    // 地图图表2
    mapDistribution: [
      {
        name: '江苏',
        ijia: 11,
        internet: 22,
        value: 1110
      }, {
        name: '上海',
        ijia: 11,
        internet: 22,
        value: 10
      }, {
        name: '山西',
        ijia: 11,
        internet: 22,
        value: 20
      }, {
        name: '新疆',
        ijia: 11,
        internet: 22,
        value: 1
      }
    ],

    // 环形图表2
    PieChart2Data: [
      {
        name: '在线问诊',
        value: 200
      },
      {
        name: '在111',
        value: 300
      },
      {
        name: '在222',
        value: 120
      }
    ],

    // 环形图表3
    PieChart3Data: [
      {
        name: '在线问诊',
        value: 200
      },
      {
        name: '在111',
        value: 300
      },
      {
        name: '在222',
        value: 120
      }
    ],

    // 极地图表
    PolarChartData: [
      {name: '男', value: 90},
      {name: '女', value: 8},
      {name: '未知', value: 2}
    ],

    // 极地图表2
    PolarChart2TotalEva: 18,
    PolarChart2Data: {
      good: {
        title: '满意',
        num: 7,
        color: ['#E10014', '#FE3287'],
        bgColor: '#2B191D'
      },
      normal: {
        title: '一般',
        num: 3,
        color: ['#37DB00', '#BAFF00'],
        bgColor: '#1D2B1B'
      },
      worse: {
        title: '不满意',
        num: 8,
        color: ['#00BAE1', '#00FBD0'],
        bgColor: '#19282D'
      }
    },

    // 雷达图
    RadarChartData: {
      labelArr: [111, 222, 333],
      data: [121, 212, 433]
    },

    // 环形图表4
    SpecialChartData: [
      {
        name: '院ddd',
        status: 'less',
        value: 28400
      },
      {
        name: '院222',
        status: 'less',
        value: 28400
      },
      {
        name: '院333',
        status: 'less',
        value: 28400
      }
    ]
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
  background-color: #242526;
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
