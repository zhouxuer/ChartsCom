<template>
  <div class="pie-container">
    <!-- echarts -->
    <div style="widht: 100%; height: 40px" v-if="isShowDom"></div>
    <div class="chart" ref="pieChart"></div>
    <div style="widht: 100%; height: 40px" v-if="isShowDom"></div>
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
      required: false
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
      default: '45%'
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
      dataIndex: 0
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
            borderWidth: 1,
            borderColor: '#6E7175',
            padding: [10, 12],
            confine: true,
            extraCssText:
              'border-radius: 8px 8px 2px 8px;backdrop-filter: blur(20px);',
            position: function (point) {
              return [point[0] - 85, point[1] - 70];
            },
            formatter: (params) => {
              const str = `
            <div class="" style="text-align: center; z-index:999">
              <div style="margin-bottom: 5px;font-size: 12px;color: #ffffff">${
                params.data.name
              }</div>
              <div style="font-size: 20px;font-family: 'DIN';color: #ffffff;">${this.filters.ThousandSeparator(
                params.data.value
              )}</div>
            </div>
            `;
              return str;
            }
          },
          color: this.color,
          title: {
            // text: this.filters.ThousandSeparator(titleText),
            text: this.title,
            // subtext: this.subtext,
            textStyle: {
              color: '#999999',
              fontSize: this.fontSize,
              fontFamily: 'DIN',
              fontWeight: 500
            },
            // subtextStyle: {
            //   color: '#999999',
            //   fontSize: this.fontSize
            // },
            left: 'center',
            top: this.top,
            // top: 50,
            itemGap: 4
          },
          // legend: {
          //   orient: 'vertical',
          //   itemGap: 65,
          //   itemWidth: 14,
          //   top: '20%',
          //   right: 20
          // },
          series: [
            {
              name: '全部任务',
              type: 'pie',
              radius: ['64%', '78%'],
              // radius: ['86%', '94%'],
              avoidLabelOverlap: false,
              z: 99,
              startAngle: this.startAngle,
              label: {
                opacity: 1,
                show: true,
                width: 0,
                height: 0,
                padding: 2.5,
                borderRadius: 2.5,
                backgroundColor: 'auto',
                distanceToLabelLine: -2.5
              },
              labelLine: {// 设置延长线的长度
                  normal: {
                    length: 20, // 设置延长线的长度
                    length2: 80// 设置第二段延长线的长度
                  }
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
                  borderRadius: '50%',
                  borderWidth: 5
                },
                scale: true
                // scaleSize: 5,
              },
              data: this.seriesData
            },
            {
              name: '全部任务',
              type: 'pie',
              radius: ['64%', '78%'],
              // radius: ['86%', '94%'],
              avoidLabelOverlap: false,
              z: 99,
              startAngle: this.startAngle,
              label: {
                show: true,
                formatter: '{b}\n\n',
                padding: [0, -40]
                // padding: [-70, 10, -10, 0]
                // normal: {
                //   opacity: 1,
                //   show: true,
                //   width: 0,
                //   height: 0,
                //   padding: 2.5,
                //   borderRadius: 2.5,
                //   backgroundColor: 'auto',
                //   distanceToLabelLine: -2.5
                // }
              },
              labelLine: {// 设置延长线的长度
                  normal: {
                    length: 20, // 设置延长线的长度
                    length2: 80// 设置第二段延长线的长度
                  }
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
                  borderRadius: '50%',
                  borderWidth: 5
                },
                scale: true
                // scaleSize: 5,
              },
              data: this.seriesData
            },
            {
              // 内圈外边框
              name: '',
              type: 'pie',
              radius: ['51%', '52%'],
              avoidLabelOverlap: false,
              legendHoverLink: false,
              z: 98,
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
                    color: '#3A3B3C',
                    emphasis: {
                      color: '#3A3B3C'
                    }
                  }
                }
              ]
            },
            {
              // 内圈填充
              type: 'pie',
              radius: ['0%', '51%'],
              label: {
                show: false,
                position: 'center'
              },
              tooltip: {
                show: false
              },
              hoverAnimation: false,
              color: '#3A3B3C',
              data: [
                {
                  value: '100',
                  itemStyle: {
                    color: '#3A3B3C',
                    emphasis: {
                      color: '#3A3B3C'
                    }
                  }
                }
              ]
            }
          ]
        },
        true
      );
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
}
.chart {
  width: 100%;
  padding-top: 0;
  flex-grow: 1;
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
