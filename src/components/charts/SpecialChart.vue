<template>
  <div class="pie-container">
    <!-- echarts   医院运营数据大盘医生科室分布专用图表，精确样式配置，勿动-->
    <div style="widht: 100%; height: 40px" v-if="isShowDom"></div>
    <div class="chart" ref="pieChart"></div>
    <div style="widht: 100%; height: 40px" v-if="isShowDom"></div>
    <!-- 图例 -->
    <div
      v-if="legend"
      class="legend"
      :class="{ 'no-num': !legendNum, horizontal: orient == 'horizontal' }"
      style="margin-top: 10px"
    >
      <div
        class="item-wrapper"
        id="specialItem"
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
            <!-- <span class="status" :class="item.status"/> -->
          </div>
        </div>
      </div>

      <!-- 图例按钮 -->
      <div v-if="showbtn" class="btn-wrapper">
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
      </div>
    </div>
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
      default: '42%'
    },
    isShowDom: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    changeData() {
      const { dataset, title, legend, legendNum, orient, width } = this;
      return {
        dataset,
        title,
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
      color: [
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
      ],
      total: null,
      seriesData: [],
      initIndex: this.row ? this.row * 2 : null, // 初始显示的元素
      lastIndex: this.row ? this.row * 2 : null, // 当前最后显示到第几个元素
      fontSize: 32, // 总数文字大小
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
      this.fontSize = this.total >= 1000000 ? this.minFont : this.font;
    },
    setChartOption() {
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
            textStyle: {
              color: '#FFFFFF',
              fontSize: this.fontSize,
              fontFamily: 'DIN',
              fontWeight: 500
            },
            subtextStyle: {
              color: '#999999',
              fontSize: this.subtitle
            },
            left: 'center',
            top: this.top,
            itemGap: 4
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['50%', '100%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 4,
                borderColor: '#242526',
                borderWidth: 1
              },
              label: {
                show: false,
                position: 'none'
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: this.seriesData
            }
          ]
        },
        true
      );
    },
    initChart() {
      this.chart = echarts.init(this.$refs.pieChart, 'dark');
      this.setChartOption();

      this.chart.on('mouseover', (params) => {
        if (params.componentIndex === 0) {
          this.showLegend(params.dataIndex);
        }
      });
      this.chart.on('mouseout', (params) => {
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
      const legendScroll = document.getElementById('specialItem');
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
.chart {
  width: 100%;
  height: 100%;
  padding: 0;
}
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
