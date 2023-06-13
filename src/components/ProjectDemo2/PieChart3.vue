<template>
  <div class="pie-container">
    <!-- echarts -->
    <div style="widht: 100%; height: 40px" v-if="isShowDom"></div>
    <div class="chart" ref="pieChart"></div>
    <div style="widht: 100%; height: 40px" v-if="isShowDom"></div>
    <div class="list-data-box">
      <div class="list-data" v-for="(item,i) in dataset" :key="i">
        <p class="percentage">{{ (item.value / total * 100).toFixed(2) }}%</p>
        <p class="value">{{ item.value }}件</p>
      </div>
    </div>
    <!-- tooltip -->
    <div class="tooltip-box" v-if="childrenActivity">
      <div
        v-for="(item,i) in childrenData"
        :key="i"
        class="tooltip-list"
      >
        <div class="tooltip-list-icon" :style="`background: ${childrenColor};opacity: ${(1 / (i+1))+0.1};`"></div>
        <p class="tooltip-list-title">{{ item }}</p>
      </div>
    </div>
    <!-- 图例 -->
    <!-- <div
      v-if="legend"
      class="legend"
      :class="{ 'no-num': !legendNum, horizontal: orient == 'horizontal' }"
    > -->
      <!-- <div
        class="item-wrapper"
        id="legendItem"
        :style="{
          marginTop: '5px',
          width: !legendNum ? width : '100%',
          height: row ? row * 28 + 'px' : '',
        }"
      >
        <div
          class="item"
          :class="{ active: item.active }"
          v-for="(item, index) in seriesData"
          :key="index"
          @mouseenter.prevent="showChartsPart(item.name)"
          @mouseleave.prevent="hideChartsPart(item.name)"
          :style="{
            '--item-color': color[index % color.length],
          }"
        >
          <i />
          <span style="padding-left: 10px">{{ item.name }}</span>
          <div v-if="legendNum" style="float: right">
            <span style="text-align: right" class="p-number"
              >{{ ((item.value / total) * 100).toFixed(2) }}%</span
            >
          </div>
        </div>
      </div> -->

      <!-- 图例按钮 -->
      <!-- <div v-if="showbtn" class="btn-wrapper">
        <div
          class="pie-btn pre"
          @click="handleScroll('pre')"
          :class="{ disable: lastIndex <= initIndex }"
        />
        <div
          class="pie-btn next"
          @click="handleScroll('next')"
          :class="{ disable: lastIndex >= seriesData.length }"
        />
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'PieChart',
  mixins: [resize],
  // props: ["dataset"],
  props: {
    dataset: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtext: {
      type: String,
      required: true
    },
    color: {
      type: Array,
      required: false,
      default: () => {
        return [
          '#00B7FF',
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
        ];
      }
    },
    legend: {
      type: Boolean,
      required: false,
      default: true
    },
    legendNum: {
      type: Boolean,
      required: false,
      default: true
    },
    orient: {
      type: String,
      required: false,
      default: 'vertical'
    },
    width: {
      type: String,
      required: false,
      default: '220px'
    },
    showbtn: {
      // 是否显示按钮
      type: Boolean,
      required: false,
      defalut: false
    },
    row: {
      // 显示几行
      type: Number,
      required: false
    },
    font: {
      type: [Number, String],
      required: false,
      default: 32
    },
    minFont: {
      type: [Number, String],
      required: false,
      default: 22
    },
    subtitle: {
      type: [Number, String],
      required: false,
      default: 14
    },
    top: {
      type: String,
      required: false,
      default: '47%'
    },
    isAutoHightLight: {
      type: Boolean,
      required: false,
      default: false
    },
    isShowDom: {
      type: Boolean,
      required: false,
      default: false
    },
    // title数量是否展示数据长度
    isShowLen: {
      type: Boolean,
      required: false,
      default: false
    },
    borderWidth: {
      type: Number,
      required: false,
      default: 0
    },
    startAngle: {
      type: Number,
      required: false,
      default: 90
    }
  },
  computed: {
    changeData() {
      const { dataset, title, subtext, legend, legendNum, orient, width } = this;
      return {
        dataset,
        title,
        subtext,
        legend,
        legendNum,
        orient,
        width
      };
    }
  },
  watch: {
    changeData: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.formatData();
            this.setChartOption();
          }
        }
      },
      deep: true
    }
  },
  data() {
    return {
      chart: null,
      // color: [
      //   '#00B7FF',
      //   '#A6FE00',
      //   '#FA114F',
      //   '#FFE620',
      //   '#BF5AF2',
      //   '#FE9F0A',
      //   '#3AE9E6',
      //   '#A28BFE',
      //   '#FF5712',
      //   '#5E5CE6',
      //   '#FF453A'
      // ],
      total: null,
      seriesData: [],
      initIndex: this.row ? this.row * 2 : null, // 初始显示的元素
      lastIndex: this.row ? this.row * 2 : null, // 当前最后显示到第几个元素
      fontSize: 22, // 总数文字大小
      setIntervalTimes: null,
      dataIndex: 0,

      childrenData: [],
      childrenColor: '',
      childrenActivity: false,
      percentArr: []
    };
  },
  mounted() {
    this.formatData();
    // this.chart = echarts.init(this.$refs.pieChart, "dark");
    this.$nextTick(() => {
      // this.formatData();
      if (this.dataset.length > 0) {
        this.initChart();
      }
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
    // zrd
    if (this.setIntervalTimes) {
      clearInterval(this.setIntervalTimes);
    }
  },
  methods: {
    formatData() {
      this.seriesData = [];
      this.total = 0;
      this.dataset.forEach((item, index) => {
        const _item = {
          ...item,
          active: false,
          emphasis: {
            itemStyle: {
              shadowColor: this.color[index],
              borderColor: this.color[index]
            }
          }
        };
        this.seriesData.push(_item);
        this.total += item.value;

        // console.log(this.seriesData, '----', this.total);
      });
      // 当总数超过10w时，字号变小
      // this.fontSize = this.total >= 1000000 ? this.minFont : this.font;
    },
    setChartOption() {
      // let titleText = this.total;
      // if (this.isShowLen) {
      //   titleText = this.dataset.length;
      // }
      this.chart.setOption(
        {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          tooltip: {
            trigger: 'item',
            className: 'tooltip',
            backgroundColor: 'rgba(255,255,255,0.10)',
            borderWidth: 0,
            borderColor: '#6E7175',
            padding: [10, 12],
            position: ['72%', '20%'],
            confine: true,
            // extraCssText:
              // 'border-radius: 8px 8px 2px 8px;backdrop-filter: blur(20px);',
              // 'border: none;',
            formatter: (params) => {
              this.showTooltip(params.data.children, params.color)
            }
            // position: function (point) {
            //   return [point[0] - 85, point[1] - 70];
            // },
            // formatter: (params) => {
            //   const str = `
            // <div class="" style="text-align: center; z-index:999">
            //   <div style="margin-bottom: 5px;font-size: 12px;color: #ffffff">${
            //     params.data.name
            //   }</div>
            //   <div style="font-size: 20px;font-family: 'DIN';color: #ffffff;">${this.filters.ThousandSeparator(
            //     params.data.value
            //   )}</div>
            // </div>
            // `;
            //   return str;
            // }
          },
          color: this.color,
          title: {
            // text: this.filters.ThousandSeparator(titleText),
            text: this.title,
            subtext: this.subtext,
            textAlign: 'center',
            textStyle: {
              color: '#C9E3FF',
              fontSize: this.fontSize,
              fontFamily: 'DIN',
              fontWeight: 500
            },
            subtextStyle: {
              color: '#C9E3FF',
              fontSize: this.fontSize
            },
            left: 266,
            top: this.top,
            itemGap: 10
          },
          // 图例样式
          legend: {
            itemGap: 100,
            itemWidth: 16,
            itemHeight: 16,
            top: 0,
            // 文本样式
            textStyle: {
              color: '#A6CBE6',
              fontWeight: 400,
              fontSize: 16,
              fontFamily: 'PingFangHK-Regular, PingFangHK',
              lineHeight: 36,
              padding: 8
            }
          },
          series: [
            {
              name: '全部任务',
              type: 'pie',
              radius: ['44%', '58%'],
              avoidLabelOverlap: false,
              z: 99,
              // 位置
              center: ['35%', '56%'],
              startAngle: this.startAngle,
              label: {
                show: false
              },
              // itemStyle: {
              //   borderRadius: 30,
              //   borderColor: 'rgba(0, 0, 0)',
              //   borderWidth: this.borderWidth
              // },
              emphasis: {
                focus: 'none',
                itemStyle: {
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  opacity: 1,
                  shadowBlur: 12,
                  // borderRadius: '50%',
                  borderWidth: 5
                },
                scale: true
                // scaleSize: 5,
              },
              labelLine: {
                show: false
              },
              data: this.seriesData
            },
            {
              // 内圈外边框
              name: '',
              type: 'pie',
              radius: ['0%', '36%'],
              avoidLabelOverlap: false,
              legendHoverLink: false,
              z: 2,
              center: ['35%', '56%'],
              label: {
                show: false
              },
              tooltip: {
                // 禁止鼠标悬停显示提示框
                show: false
              },
              hoverAnimation: false, // 禁止鼠标悬停放大区域
              data: [
                {
                  value: '100',
                  itemStyle: {
                    color: '#03122DE8',
                    emphasis: {
                      color: '#03122DE8'
                    }
                  }
                }
              ]
            },
            {
              // 内圈填充
              type: 'pie',
              radius: ['20%', '30%'],
              label: {
                show: false,
                position: 'center'
              },
              tooltip: {
                show: false
              },
              z: 1,
              center: ['35%', '56%'],
              hoverAnimation: false,
              color: '#3A3B3C',
              data: this.seriesData
            }
          ]
        },
        true
      );
    },
    showTooltip (children, color) {
      this.childrenData = children
      this.childrenColor = color
      this.childrenActivity = true
    },
    initChart() {
      this.chart = echarts.init(this.$refs.pieChart, 'dark');
      this.setChartOption();
      this.autoHightLight();

      this.chart.on('mouseover', (params) => {
        // zrd
        if (this.isAutoHightLight) {
          clearInterval(this.setIntervalTimes);
          if (params.dataIndex !== this.dataIndex) {
            this.chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: this.dataIndex
            });
          }
          this.removeLegend(this.dataIndex);
          this.shaoItem(params.dataIndex);
        }
        if (params.componentIndex === 0) {
          this.showLegend(params.dataIndex);
        }
      });
      this.chart.on('mouseout', (params) => {
        // zrd
        this.autoHightLight(this.dataIndex, false, params);
        if (params.componentIndex === 0) {
          this.removeLegend(params.dataIndex);
        }
      });
    },
    // 公共抽离
    moveFn(dataIndex) {
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: dataIndex
      });
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: dataIndex
      });
      this.shaoItem(dataIndex);
      this.showLegend(dataIndex);
    },

    // zrd 自动高亮
    autoHightLight(index = 0, flag = true, params) {
      // 隐藏右侧内容
      this.childrenActivity = false


      if (!this.isAutoHightLight) return;
      let dataIndex = index;
      if (flag) {
        this.moveFn(dataIndex);
      }
      this.setIntervalTimes = setInterval(() => {
        const dataLength = this.seriesData.length;
        // 取消之前高亮的图形
        this.removeLegend(dataIndex);
        this.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: dataIndex
        });
        dataIndex = (dataIndex + 1) % dataLength;
        this.dataIndex = dataIndex;
        this.moveFn(dataIndex);
      }, 3000);
    },
    // 展示对应数据
    shaoItem(index) {
      const option = this.chart.getOption();
      option.title[0].subtext = this.seriesData[index].name;
      option.title[0].text = this.seriesData[index].value;
    },
    showLegend(index) {
      this.seriesData[index].active = true;
    },
    removeLegend(index) {
      this.seriesData[index].active = false;
    },
    showChartsPart(name) {
      if (this.chart) {
        this.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          name: name
        });
        this.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          name: name
        });
      }
    },
    hideChartsPart(name) {
      if (this.chart) {
        this.chart.dispatchAction({
          type: 'downplay',
          name: name
        });
        this.chart.dispatchAction({
          type: 'hideTip',
          name: name
        });
      }
    },
    handleScroll(action) {
      const legendScroll = document.getElementById('legendItem');
      // 每次滚动的距离
      const dis = 29;
      // legend总条数
      const length = this.seriesData.length;

      if (action === 'next') {
        if (this.lastIndex < length) {
          this.lastIndex += 2;
          legendScroll.scrollTop += dis;
        }
      } else if (action === 'pre') {
        if (this.lastIndex > this.initIndex) {
          this.lastIndex -= 2;
          legendScroll.scrollTop -= dis;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pie-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .tooltip-box {
    position: absolute;
    top: 100px;
    right: 60px;
    .tooltip-list {
      display: flex;
      align-items: center;
      .tooltip-list-icon {
        width: 12px;
        height: 36px;
      }
      .tooltip-list-title {
        margin: 0;
        line-height: 36px;
        padding-left: 14px;
        font-size: 18px;
        color: #DCEDFA;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
  }
  .list-data-box {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    .list-data {
      display: flex;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #A6CBE6;
      line-height: 28px;
      position: absolute;
      &:nth-child(1) {
        // top: 100px;
        // left: 46px;
        top: 100px;
        left: 376px;
      }
      &:nth-child(2) {
        // top: 200px;
        // left: 46px;
        top: 200px;
        left: 376px;
      }
      &:nth-child(3) {
        // top: 100px;
        // left: 376px;
        top: 200px;
        left: 46px;
      }
      &:nth-child(4) {
        // top: 200px;
        // left: 376px;
        top: 100px;
        left: 46px;
      }
      .percentage {
        margin-right: 12px;
      }
    }
  }
}
.chart {
  width: 100%;
  padding-top: 0;
  flex-grow: 1;
  z-index: 19;
}
.legend {
  // flex: 0 0 auto;
  width: 100%;
  .item-wrapper {
    // width: 100%;
    overflow: hidden;
  }
  .item {
    display: block;
    width: 50%;
    float: left;
    height: 29px;
    line-height: 29px;
    position: relative;
    padding-right: 20px;
    font-size: 12px;
    color: #b0b3b8;
    &:hover {
      cursor: pointer;
      // color: #ffffff;
      color: var(--item-color);
      .p-number {
        font-weight: 600;
      }
    }
    &.active {
      color: var(--item-color);
      .p-number {
        font-weight: bold;
      }
    }
    i {
      width: 4px;
      height: 4px;
      display: inline-block;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      margin-top: -4px;
      background: var(--item-color);
    }
    &:nth-child(odd) {
      border-right: 1px solid #3e4042;
    }
    &:nth-child(even) {
      padding-right: 0;
      padding-left: 20px;
    }
  }
  &.no-num {
    .item-wrapper {
      overflow: hidden;
      margin: 0 auto;
    }
    .item {
      width: 50%;
      &:nth-child(odd) {
        border-right: 0px;
        padding-left: 0px;
        padding-right: 0px;
      }
      &:nth-child(even) {
        padding-left: 0px;
      }
    }
  }
  &.horizontal {
    display: flex;
    justify-content: center;
    .item {
      width: auto;
      &:nth-child(odd) {
        border-right: 0px;
      }
      &:nth-child(even) {
        padding-right: 20px;
      }
    }
  }
}
.btn-wrapper {
  display: flex;
  justify-content: center;
  .pie-btn {
    width: 60px;
    height: 16px;
    margin-top: 10px;
    background-color: #3A3B3C;
    border-radius: 8px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    &:hover {
      background-color: #4a4b4d;
      &.pre {
        background-image: url(~@/assets/images/icon/icon_listup_hover.png);
      }
      &.next {
        background-image: url(~@/assets/images/icon/icon_listdown_hover.png);
      }
    }
    &.pre {
      margin-right: 12px;
      background-image: url(~@/assets/images/icon/icon_listup_nor.png);
      background-size: 16px 12px;
      &.disable {
        background-color: #3A3B3C;
        background-image: url(~@/assets/images/icon/icon_listup_dis.png);
        cursor: not-allowed;
      }
    }
    &.next {
      background-image: url(~@/assets/images/icon/icon_listdown_nor.png);
      background-size: 16px 12px;
      &.disable {
        background-color: #3A3B3C;
        background-image: url(~@/assets/images/icon/icon_listdown_dis.png);
        cursor: not-allowed;
      }
    }
  }
}
</style>
