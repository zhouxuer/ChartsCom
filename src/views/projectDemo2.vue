<template>
  <my-container border class="tabs-box">
    <el-tabs tab-position='left' class="tabs-box">

      <el-tab-pane label="弹窗1" class="content-box">
        <my-container border theme="success">弹窗1</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/19.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ dialog1Import }}
            <div style="height: 380px;background: #000">
              <dialog1 :dataset="dialog1Data" />
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="列表类型1" class="content-box">
        <my-container border theme="success">列表类型1</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/12.png" />
          <img class="rotationBg" src="../assets/ProjectDemo2/13.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例1</span>
          </div>
          <div>
            {{ listTypeImport1 }}
            <div style="width: 580px;height: 260px;background: #00142B">
              <list-type1
                :dataset1="listType1Data11"
              />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例2</span>
          </div>
          <div>
            {{ listTypeImport1 }}
            <div style="width: 580px;height: 260px;background: #00142B">
              <list-type1
                :dataset1="listType1Data12"
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

            引入：import listType1 from '@/components/ProjectDemo/listType1';

            listType1Data1: [{
              icon: '11',
              title: '结案率',
              value: '91.7',
              unit: '%'
            }, {
              icon: '11',
              title: '不捕率',
              value: '50.0',
              unit: '%'
            }],
            listType1Data2: [{
              icon: '22',
              title: '受理',
              value1: '1',
              unit1: '件',
              percentage1: '80.0%',
              value2: '1',
              unit12: '人',
              percentage2: '92.9'
            }, {
              icon: '22',
              title: '批准逮捕',
              value1: '2',
              unit1: '件'
            }, {
              icon: '22',
              title: '审结',
              value1: '2',
              unit1: '件',
              value2: '2',
              unit12: '人'
            }, {
              icon: '22',
              title: '不批准逮捕',
              value1: '2',
              unit1: '件'
            }]
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="锥型柱状图" class="content-box">
        <my-container border theme="success">锥型柱状图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/03.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div class="tab-btn-box">
            <el-button
              v-for="(item,i) in tabBtn"
              :key="i"
              @click="tabBtnClick(item)"
              :class="activeTab === item.id ? 'active-tab-btn' : ''"
            >{{ item.name }}</el-button>
          </div>
          <div>
            {{ BarChart2Import2 }}
            <div style="height: 280px;background: #000">
              <bar-chart3  :dataset="BarChart2Data2" />
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="列表类型4" class="content-box">
        <my-container border theme="success">列表类型4</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/15.png" />
          <img class="rotationBg" src="../assets/ProjectDemo2/16.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ listTypeImport1 }}
            <div style="width: 1330px;height: 260px;background: #00142B">
              <list-type4
                :dataset1="listType1Data41"
              />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ listTypeImport1 }}
            <div style="width: 1330px;height: 260px;background: #00142B">
              <list-type4
                :dataset1="listType1Data42"
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

            引入：import listType1 from '@/components/ProjectDemo/listType1';

            listType1Data1: [{
              icon: '11',
              title: '结案率',
              value: '91.7',
              unit: '%'
            }, {
              icon: '11',
              title: '不捕率',
              value: '50.0',
              unit: '%'
            }],
            listType1Data2: [{
              icon: '22',
              title: '受理',
              value1: '1',
              unit1: '件',
              percentage1: '80.0%',
              value2: '1',
              unit12: '人',
              percentage2: '92.9'
            }, {
              icon: '22',
              title: '批准逮捕',
              value1: '2',
              unit1: '件'
            }, {
              icon: '22',
              title: '审结',
              value1: '2',
              unit1: '件',
              value2: '2',
              unit12: '人'
            }, {
              icon: '22',
              title: '不批准逮捕',
              value1: '2',
              unit1: '件'
            }]
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="列表类型3" class="content-box">
        <my-container border theme="success">列表类型3</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/14.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ listTypeImport1 }}
            <div style="width: 550px;height: 260px;background: #00142B">
              <list-type3
                :dataset1="listType1Data3"
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

            引入：import listType1 from '@/components/ProjectDemo/listType1';

            listType1Data1: [{
              icon: '11',
              title: '结案率',
              value: '91.7',
              unit: '%'
            }, {
              icon: '11',
              title: '不捕率',
              value: '50.0',
              unit: '%'
            }],
            listType1Data2: [{
              icon: '22',
              title: '受理',
              value1: '1',
              unit1: '件',
              percentage1: '80.0%',
              value2: '1',
              unit12: '人',
              percentage2: '92.9'
            }, {
              icon: '22',
              title: '批准逮捕',
              value1: '2',
              unit1: '件'
            }, {
              icon: '22',
              title: '审结',
              value1: '2',
              unit1: '件',
              value2: '2',
              unit12: '人'
            }, {
              icon: '22',
              title: '不批准逮捕',
              value1: '2',
              unit1: '件'
            }]
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="列表类型2" class="content-box">
        <my-container border theme="success">列表类型2</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/18.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ listTypeImport1 }}
            <div style="width: 550px;height: 260px;background: #00142B">
              <list-type2
                :dataset1="listType1Data2"
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

            引入：import listType1 from '@/components/ProjectDemo/listType1';

            listType1Data1: [{
              icon: '11',
              title: '结案率',
              value: '91.7',
              unit: '%'
            }, {
              icon: '11',
              title: '不捕率',
              value: '50.0',
              unit: '%'
            }],
            listType1Data2: [{
              icon: '22',
              title: '受理',
              value1: '1',
              unit1: '件',
              percentage1: '80.0%',
              value2: '1',
              unit12: '人',
              percentage2: '92.9'
            }, {
              icon: '22',
              title: '批准逮捕',
              value1: '2',
              unit1: '件'
            }, {
              icon: '22',
              title: '审结',
              value1: '2',
              unit1: '件',
              value2: '2',
              unit12: '人'
            }, {
              icon: '22',
              title: '不批准逮捕',
              value1: '2',
              unit1: '件'
            }]
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="曲线图表" class="content-box">
        <my-container border theme="success">曲线图表</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/11.png" />
        </el-card>
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

      <el-tab-pane label="环形图" class="content-box">
        <my-container border theme="success">环形图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/02.png" />
          <img class="rotationBg" src="../assets/ProjectDemo2/04.png" />
          <img class="rotationBg" src="../assets/ProjectDemo2/06.png" />
          <img class="rotationBg" src="../assets/ProjectDemo2/10.png" />
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例1</span>
          </div>
          <div>
            {{ PieChartImport }}
            <!-- <export-button :requestParams="requestParams"></export-button> -->
            <div style="width: 570px;height: 320px;background: #000">
              <pie-chart1
                :dataset="PieChartData"
                title="受案来源"
                subtext="（件）"
                width="260px"
                :showbtn="true"
                :row="1"
              />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例2</span>
          </div>
          <div>
            {{ PieChartImport }}
            <!-- <export-button :requestParams="requestParams"></export-button> -->
            <div style="width: 570px;height: 320px;background: #000">
              <pie-chart1
                :dataset="PieChartData"
                title="信访分类"
                width="260px"
                :showbtn="true"
                :row="1"
                :label="true"
                :legend="false"
                :top="'46%'"
              />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例3</span>
          </div>
          <div>
            {{ PieChartImport }}
            <!-- <export-button :requestParams="requestParams"></export-button> -->
            <div style="width: 570px;height: 320px;background: #000">
              <pie-chart1
                :dataset="PieChartData"
                title="不同类型"
                subtext="案件"
                width="260px"
                :showbtn="true"
                :legend="false"
                :row="1"
              />
            </div>
          </div>
        </el-card>

        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例4</span>
          </div>
          <div>
            {{ PieChartImport }}
            <!-- <export-button :requestParams="requestParams"></export-button> -->
            <div style="width: 570px;height: 320px;background: #000">
              <pie-chart1
                :dataset="PieChartData"
                title="受案类型"
                width="260px"
                :showbtn="true"
                :row="1"
                :borderWidth="8"
                :top="'46%'"
                :legendShowNum="true"
                :unit="'件'"
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

      <el-tab-pane label="自定义环形图" class="content-box">
        <my-container border theme="success">自定义环形图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/09.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ PieChartImport3 }}
            <!-- <export-button :requestParams="requestParams"></export-button> -->
            <div style="width: 770px;height: 320px;background: #03122D">
              <pie-chart3
                :dataset="PieChartData3"
                title="四大检察"
                subtext="占比"
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

      <el-tab-pane label="标签环形图1" class="content-box">
        <my-container border theme="success">标签环形图1</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/04.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ PieChartImport }}
            <!-- <export-button :requestParams="requestParams"></export-button> -->
            <div style="width: 570px;height: 320px;background: #000">
              <pie-chart2
                :dataset="PieChartData"
                title="信访分类"
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

      <el-tab-pane label="多数据柱状图" class="content-box">
        <my-container border theme="success">多数据柱状图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/05.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ BarChart2Import }}
            <div style="height: 480px;">
              <bar-chart5  :dataset="BarChart2Data" />
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

      <el-tab-pane label="单条多数据柱状图" class="content-box">
        <my-container border theme="success">锥型柱状图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/08.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ BarChart2Import }}
            <div style="height: 480px;">
              <bar-chart4  :dataset="BarChart2Data" />
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

      <el-tab-pane label="堆叠横向柱状图" class="content-box">
        <my-container border theme="success">堆叠横向柱状图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/01.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ BarChartImport1 }}
            <div style="height: 480px;">
              <div class="top-btn">
                <div
                  class="list-btn"
                  v-for="(item, index) in BarChartBtn1"
                  :key="index"
                  @click="ssssssss(index)"
                >
                  <div :style='`background-color:${item.color}`' class="box-icon"></div>
                  <p>{{ item.name }}</p>
                </div>
              </div>
              <bar-chart1 :dataset="BarChartData1" />
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

            引入: import BarChart1 from '@/components/ProjectDemo2/BarChart1';;

            dataset: {      // 参数
              unit: '篇',     // 数量单位，默认为空
              legend: true,   // 显示图例，默认不显示
              barWidth: 16,   // 柱子的宽度
              end: 50,        // 百分比，从0开始显示的数据比例，默认为全显示
              colorList: [    // 颜色数组 默认为[["#00FBCF", "#00BAE1"]]
                ['#31B2E9', '#31B2E9'],
                ['#37E77E', '#37E77E'],
                ['#F98AB1', '#F98AB1'],
                ['#FEC88D', '#FEC88D']
              ],
              xAxisLabel: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], //x轴数据
              datas: [{
                name: 'xxx1',
                data: [320, 302, 301, 334, 390, 330, 320]
              }, {
                name: 'xxx2',
                data: [120, 132, 101, 134, 90, 230, 210]
              }, {
                name: 'xxx3',
                data: [220, 182, 191, 234, 290, 330, 310]
              }, {
                name: 'xxx4',
                data: [150, 212, 201, 154, 190, 330, 410]
              }],
            }
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="横线多彩柱状图" class="content-box">
        <my-container border theme="success">横线多彩柱状图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/07.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ BarChartImport2 }}
            <div style="height: 480px;">
              <bar-chart2 :dataset="BarChartData2" />
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

            引入: import BarChart1 from '@/components/ProjectDemo2/BarChart1';;

            dataset: {      // 参数
              unit: '篇',     // 数量单位，默认为空
              legend: true,   // 显示图例，默认不显示
              barWidth: 16,   // 柱子的宽度
              end: 50,        // 百分比，从0开始显示的数据比例，默认为全显示
              colorList: [    // 颜色数组 默认为[["#00FBCF", "#00BAE1"]]
                ['#31B2E9', '#31B2E9'],
                ['#37E77E', '#37E77E'],
                ['#F98AB1', '#F98AB1'],
                ['#FEC88D', '#FEC88D']
              ],
              xAxisLabel: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], //x轴数据
              datas: [{
                name: 'xxx1',
                data: [320, 302, 301, 334, 390, 330, 320]
              }, {
                name: 'xxx2',
                data: [120, 132, 101, 134, 90, 230, 210]
              }, {
                name: 'xxx3',
                data: [220, 182, 191, 234, 290, 330, 310]
              }, {
                name: 'xxx4',
                data: [150, 212, 201, 154, 190, 330, 410]
              }],
            }
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="堆叠横向柱状图" class="content-box">
        <my-container border theme="success">堆叠横向柱状图</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/01.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            {{ BarChartImport1 }}
            <div style="height: 480px;">
              <bar-chart1 :dataset="BarChartData1" />
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

            引入: import BarChart1 from '@/components/ProjectDemo2/BarChart1';;

            dataset: {      // 参数
              unit: '篇',     // 数量单位，默认为空
              legend: true,   // 显示图例，默认不显示
              barWidth: 16,   // 柱子的宽度
              end: 50,        // 百分比，从0开始显示的数据比例，默认为全显示
              colorList: [    // 颜色数组 默认为[["#00FBCF", "#00BAE1"]]
                ['#31B2E9', '#31B2E9'],
                ['#37E77E', '#37E77E'],
                ['#F98AB1', '#F98AB1'],
                ['#FEC88D', '#FEC88D']
              ],
              xAxisLabel: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], //x轴数据
              datas: [{
                name: 'xxx1',
                data: [320, 302, 301, 334, 390, 330, 320]
              }, {
                name: 'xxx2',
                data: [120, 132, 101, 134, 90, 230, 210]
              }, {
                name: 'xxx3',
                data: [220, 182, 191, 234, 290, 330, 310]
              }, {
                name: 'xxx4',
                data: [150, 212, 201, 154, 190, 330, 410]
              }],
            }
            </pre>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="标签环形图2" class="content-box">
        <my-container border theme="success">标签环形图2</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">展示示例</span>
          </div>
          <img class="rotationBg" src="../assets/ProjectDemo2/06.png" />
        </el-card>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <div style="height: 800px;background-image: url(../assets/img/logo.82b9c7a5.png)">
              <div class="ground-glass"></div>
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="毛玻璃效果" class="content-box">
        <my-container border theme="success">毛玻璃效果</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <div style="height: 800px;background-image: url(../assets/img/logo.82b9c7a5.png)">
              <div class="ground-glass"></div>
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="地图旋转背景" class="content-box">
        <my-container border theme="success">地图旋转背景</my-container>
        <my-header title="组件负责人: 肉肉" icon="el-icon-user-solid"></my-header>
        <el-card class="box-card" size="mini">
          <div slot="header" class="card-header">
            <span class="title">使用示例</span>
          </div>
          <div>
            <div style="height: 800px;background: #000" class="rotationBg-box">
              <img class="rotationBg" src="../assets/true.png" />
              <!-- <rotation-bg /> -->
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </my-container>
</template>

<script>
import dialog1 from '@/components/ProjectDemo2/dialog1';
import listType4 from '@/components/ProjectDemo2/listType4';
import listType3 from '@/components/ProjectDemo2/listType3';
import listType2 from '@/components/ProjectDemo2/listType2';
import listType1 from '@/components/ProjectDemo2/listType1';
import LineChart from '@/components/ProjectDemo2/LineChart';
import PieChart3 from '@/components/ProjectDemo2/PieChart3';
import PieChart2 from '@/components/ProjectDemo2/PieChart2';
import PieChart1 from '@/components/ProjectDemo2/PieChart1';
import BarChart5 from '@/components/ProjectDemo2/BarChart5';
import BarChart4 from '@/components/ProjectDemo2/BarChart4';
import BarChart3 from '@/components/ProjectDemo2/BarChart3';
import BarChart2 from '@/components/ProjectDemo2/BarChart2';
import BarChart1 from '@/components/ProjectDemo2/BarChart1';
export default {
name: 'ProjectDemo2',
components: {
  dialog1,
  listType4,
  listType3,
  listType2,
  listType1,
  LineChart,
  PieChart3,
  PieChart2,
  PieChart1,
  BarChart5,
  BarChart4,
  BarChart3,
  BarChart2,
  BarChart1
},
data() {
  return {
    // 弹窗1
    dialog1Import: '<dialog1 :dataset="dialog1Data" />',
    dialog1Data: {
      title: '审查逮捕',
      list: [{
        name: '受理',
        value: '9999',
        unit: '件',
        percentage: '98.9',
        value1: '9989',
        unit1: '人',
        percentage1: '5.6'
      }, {
        name: '审结',
        value: '9989',
        unit: '件',
        value1: '8878',
        unit1: '人'
      }, {
        name: '批捕',
        value: '8878',
        unit: '人'
      }, {
        name: '不批捕',
        value: '7766',
        unit: '人'
      }],
      progress: [{
        name: '不捕率',
        percentage: 89,
        customColor: '#f56c6c'
      }, {
        name: '审结率',
        percentage: 66,
        unsettled: '9',
        peopleNum: '18',
        customColor: '#e6a23c'
      }]
    },

    // tab当前选中
    activeTab: 1,

    // yab按钮
    tabBtn: [{
      id: 1,
      name: '逮捕'
    }, {
      id: 2,
      name: '起诉'
    }, {
      id: 3,
      name: '上诉'
    }, {
      id: 4,
      name: '抗诉'
    }],

    // 列表类型4
    listType1Data41: [{
      icon: '2',
      title: '社会治理类检察建议',
      value: '9998',
      unit: '件'
    }, {
      icon: '2',
      title: '和解和化解社会矛盾',
      value: '9999',
      unit: '件'
    }, {
      icon: '2',
      title: '检察听证',
      value: '9999',
      unit: '件'
    }, {
      icon: '2',
      title: '司法救助',
      value: '9999',
      unit: '件'
    }],
    listType1Data42: [{
      icon: '2',
      title: '社会治理类检察建议',
      value: '9998',
      unit: '件'
    }, {
      icon: '2',
      title: '和解和化解社会矛盾',
      value: '9999',
      unit: '件'
    }, {
      icon: '2',
      title: '检察听证',
      value: '9999',
      unit: '件'
    }, {
      icon: '2',
      title: '司法救助',
      value: '9999',
      unit: '件'
    }],

    // 列表类型3
    listType1Data3: [{
      title: '受理不服',
      value: '9998',
      unit: '件',
      value1: '9998',
      unit1: '人'
    }, {
      title: '受理不服',
      value: '9999',
      unit: '件'
    }],

    // 列表类型2
    listType1Data2: [{
      icon: '2',
      title: '受理不服',
      subtitle: '法院刑事裁判决定',
      value: '9998',
      unit: '件'
    }, {
      icon: '2',
      title: '受理不服',
      subtitle: '检察机关处理决定',
      value: '9999',
      unit: '件'
    }],

    // 列表类型1
    listTypeImport1: '<list-type1 :dataset1="listType1Data1" :dataset2="listType1Data2" />',
    listType1Data11: [{
      icon: '11',
      title: '件数',
      value: '99999',
      unit: '件',
      percentage: '92.8',
      children: [{
        title: '裁判监督',
        value: '1211',
        unit: '件'
      },
      {
        title: '审违监督',
        value: '1222',
        unit: '件'
      },
      {
        title: '执行监督',
        value: '1099',
        unit: '件'
      }]
    }, {
      icon: '11',
      title: '人数',
      value: '2999',
      unit: '件',
      percentage: '5.8'
    }],
    listType1Data12: [{
      icon: '11',
      title: '件数',
      value: '99999',
      unit: '件',
      value1: '12999',
      unit1: '人'
    }, {
      icon: '11',
      title: '人数',
      value: '2999',
      unit: '件'
    }],

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

    // 自定义环形图
    PieChartImport3: '<pie-chart3 :dataset="dataset" title="任务数" :legendNum="false" orient="horizontal" :showbtn="true" :row="2"/>',
    PieChartData3: [{
      name: '刑事检察',
      value: 200,
      children: [
        '审查逮捕',
        '审查起诉',
        '刑事二审',
        '刑事检察'
      ]
    }, {
      name: '民事检察',
      value: 300,
      children: [
        '审查逮捕',
        '审查起诉',
        '刑事二审',
        '民事检察'
      ]
    }, {
      name: '行政检察',
      value: 350,
      children: [
        '审查逮捕',
        '审查起诉',
        '刑事二审',
        '行政检察'
      ]
    }, {
      name: '公益检察',
      value: 390,
      children: [
        '审查逮捕',
        '审查起诉',
        '刑事二审',
        '公益检察'
      ]
    }],

    // 基础环形图
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
    }],

    // 多数据柱状图
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
      barWidth: 14,
      // end: 50,
      colorList: [
        ['#24D7B1', '#3FE385'],
        ['#A0A7E5', '#24D7B1'],
        ['#6F758E', '#A0A7E5'],
        ['#24D7B1', '#46C2FF'],
        ['#F48DB1', '#46C2FF'],
        ['#FEFE81', '#95DDE7'],
        ['#C3EAAD', '#6F758E']
      ]
    },

    // 锥型柱状图
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
      barWidth: 28,
      // end: 50,
      colorList: [
        ['#E7A04B', '#112445']
      ]
    },

    // 横线多彩柱状图
    BarChartImport2: '<bar-chart2 :dataset="BarChartData2" />',
    BarChartData2: {
      unit: '篇',
      legend: true,
      xAxisLabel: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datas: [{
        name: 'xxx1',
        data: [320, 302, 301, 334, 390, 330, 320]
      }],
      barWidth: 10,
      // end: 50,
      colorList: [
        ['#125', '#F38DB2'],
        ['#125', '#3FE385'],
        ['#125', '#C2EAAE'],
        ['#125', '#9FA7E5'],
        ['#125', '#67749D'],
        ['#125', '#68E5C2'],
        ['#125', '#40B0E2']
      ]
    },

    // 堆叠横向柱状图
    BarChartImport1: '<bar-chart1 :dataset="BarChartData1" />',
    BarChartData1: {
      unit: '篇',
      legend: true,
      xAxisLabel: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datas: [{
        name: 'xxx1',
        data: [320, 302, 301, 334, 390, 330, 320]
      }, {
        name: 'xxx2',
        data: [120, 132, 101, 134, 90, 230, 210]
      }, {
        name: 'xxx3',
        data: [220, 182, 191, 234, 290, 330, 310]
      }, {
        name: 'xxx4',
        data: [150, 212, 201, 154, 190, 330, 410]
      }],
      barWidth: 18,
      // end: 50,
      colorList: [
        ['#31B2E9', '#31B2E9'],
        ['#37E77E', '#37E77E'],
        ['#F98AB1', '#F98AB1'],
        ['#FEC88D', '#FEC88D']
      ]
    },
    BarChartBtn1: [
      {
        name: 'xxx1',
        color: '#31B2E9'
      },
      {
        name: 'xxx2',
        color: '#37E77E'
      },
      {
        name: 'xxx3',
        color: '#F98AB1'
      },
      {
        name: 'xxx4',
        color: '#FEC88D'
      }
    ]

    // // 柱状图图表
    // BarChart2Import2: '<line-chart :dataset="dataset" />',
    // BarChart2Data2: {
    //   unit: '篇',
    //   xAxisLabel: [
    //     '行政公益诉讼 诉前程序案件',
    //     '民事公益 诉讼案件',
    //     '行政公益 诉讼案件',
    //     '刑事附带民事 公益诉讼案件'
    //   ],
    //   datas: [{
    //     name: '数据1',
    //     data: [20, 4, 5, 2]
    //   }],
    //   barWidth: 80,
    //   // end: 50,
    //   colorList: [
    //     ['#1A91FF', '#0A7BD224']
    //   ]
    // }
  };
},
created() {},
methods: {
  // 点击切换tab按钮
  tabBtnClick (list) {
    this.activeTab = list.id
    if (list.id === 2) {
      this.BarChart2Data2 = {
        unit: '篇',
        xAxisLabel: [
          '合同纠纷',
          '物权纠纷',
          '劳动争议 纠纷',
          '婚姻家庭 继承纠纷'
        ],
        datas: [{
          name: '数据1',
          data: [20, 4, 5, 2]
        }],
        barWidth: 28,
        // end: 50,
        colorList: [
          ['#E7A04B', '#112445']
        ]
      }
    } else {
      this.BarChart2Data2 = {
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
        barWidth: 28,
        // end: 50,
        colorList: [
          ['#E7A04B', '#112445']
        ]
      }
    }
  },

  ssssssss(index) {
    this.BarChartData1.datas = [this.BarChartData1.datas[index]]
    console.log(this.BarChartData1.datas[index], '===---==--000', index, '===---', this.BarChartData1.datas);
  }
}
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

// 地图旋转背景
.rotationBg-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .rotationBg {
    width: 60%;
    // -webkit-animation: rotation 15s linear infinite;
    // animation: rotation 10s linear infinite;
    animation: rotation 6s linear infinite;
  }
  @keyframes rotation {
    0% {
      // -webkit-transform: rotate(0deg);
      transform: rotateX(65deg) rotateZ(0deg);
      opacity: 0.8;
    }

    50% {
      // -webkit-transform: rotate(0deg);
      transform: rotateX(65deg) rotateZ(-180deg);
      opacity: 1;
    }

    100% {
      // -webkit-transform: rotate(360deg);
      transform: rotateX(65deg) rotateZ(-360deg);
      opacity: 0.8;
    }
  }
}

// 毛玻璃效果
.ground-glass {
  top: 150px;
  left: 300px;
  position: relative;
  width: 800px;
  height: 500px;
  border-radius: 40px;
  box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px); //毛玻璃特效
  background: rgba(71, 80, 108, 0.5);
}

// 堆叠横向柱状图图例
.top-btn {
  display: flex;
  justify-content: space-evenly;
  .list-btn {
    display: flex;
    align-items: center;
    .box-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .btn-text {
      color: rgb(187, 187, 187);
    }
  }
}

.tab-btn-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  .el-button {
    width: 70px;
    height: 28px;
    background: #082B51;
    box-shadow: inset 0px 0px 6px 0px rgba(50,219,255,1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: Alibaba-PuHuiTi-Regular;
    font-weight: 400;
    color: #6C99BA;
    line-height: 24px;
    border: none;
    &:hover {
      color: #06F2FF;
    }
  }
  .active-tab-btn {
    color: #06F2FF;
  }
}
</style>
