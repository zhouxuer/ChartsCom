<template>
  <div class="chart" />
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'BarChart2',
  mixins: [resize],
  props: {
    dataset: {
      type: Object
    },
    colorArr: {
      type: Array,
      default: () => {
        return [['#00FBCF', '#00BAE1']];
      }
    },
    xFont: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      chart: null,
      seriesData: [],
      colorList: [],
      list: [],
      unit: '',
      showLegend: false,
      bottom: 0,
      // 阴影颜色
      shadowColor: [],
      // 坐标轴高亮颜色
      labelColor: '#0A84FE'
    };
  },
  computed: {
    changeData() {
      const { dataset, colorArr, xFont } = this;
      return {
        dataset, colorArr, xFont
      }
    }
  },
  watch: {
    changeData: {
      handler(newVal, oldVal) {
        this.watchProps(newVal, oldVal)
      },
      deep: true
    }
  },
  created() {
    this.colorList = this.colorArr;
  },
  mounted() {
    this.formatData();
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    watchProps(newVal, oldVal) {
      this.formatData();
      if (this.chart) {
        if (newVal) {
          this.setChartOption();
        }
      } else {
        this.initChart();
      }
    },
    // 转换颜色
    colorHex(item) {
      const str = item + '7F';
      return str
    },
    formatData() {
      this.seriesData = [];
      if (this.dataset.unit) {
        this.unit = this.dataset.unit;
      }
      if (this.dataset.colorList) {
        this.colorList = this.dataset.colorList;
      }
      if (this.dataset.legend) {
        this.showLegend = this.dataset.legend;
        this.bottom = 0;
      }
      this.colorList.forEach(item => {
        // const _item = this.colorHex(item[1]);
        this.shadowColor.push(this.colorHex(item[1]));
      })
      // 修改坐标轴高亮颜色
      if(this.colorList.length === 1) {
        this.labelColor = this.colorList[0][1];
      } else {
        this.labelColor = '#0A84FE';
      }
      const list = this.dataset.datas;
      if (list.length > 0) {
        list.forEach((item, index) => {
          const thise = this
          this.seriesData.push({
            name: item.name,
            type: 'bar',
            data: item.data,
            // 控制柱状图柱子最大宽度
            barMaxWidth: this.dataset.barWidth,
            // 柱子间距
            barGap: '42%',
            markLine: {
              // data: [{ type: 'max', name: '起点', value: '10' }],
              label: {
                show: true,
                position: 'start'
              }
            },
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(216, 216, 216, 0)',
              barBorderRadius: [100, 100, 100, 100]
            },
            itemStyle: {
              barBorderRadius: [100, 100, 100, 100],
              color: function(params) {
                return {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: thise.colorList[params.dataIndex][index] // 0% 处的颜色
                    },
                    // {
                    //   offset: 0.5,
                    //   color: thise.colorList[params.dataIndex][1] // 0% 处的颜色
                    // },
                    {
                      offset: 1,
                      color: '#125' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
              // color: {
              //   type: 'linear',
              //   x: 0,
              //   y: 0,
              //   x2: 0,
              //   y2: 1,
              //   colorStops: [
              //     {
              //       offset: 0,
              //       color: this.colorList[index][1] // 0% 处的颜色
              //     },
              //     {
              //       offset: 1,
              //       color: this.colorList[index][0] // 0% 处的颜色
              //     }
              //     // {
              //     //   offset: 1,
              //     //   color: '#125' // 100% 处的颜色
              //     // }
              //   ],
              //   global: false // 缺省为 false
              // }
            },
            emphasis: {
              focus: 'series'
              // itemStyle: {
              //   shadowOffsetX: 0,
              //   shadowOffsetY: 4,
              //   opacity: 1,
              //   shadowBlur: 12,
              //   shadowColor: this.shadowColor[index]
              // }
            },
            animationDelay: function (idx) {
              return idx * 10;
            }
          });
        });
      }
    },
    setChartOption() {
      this.chart.setOption({
        // 图表背景
        backgroundColor: '#131c3c',
        // 图例
        legend: {
          show: this.showLegend,
          // top: 0,
          // right: 0,
          // orient: 'horizontal',
          // icon: 'circle',
          itemWidth: 16,
          itemGap: 20,
          textStyle: {
            color: '#999999',
            fontSize: 12
          }
        },
        // 鼠标移入
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            snap: true,
            // label: {
            //   show: true,
            //   backgroundColor: '#242526',
            //   color: this.labelColor,
            //   fontSize: this.xFont,
            //   fontWeight: 600,
            //   padding: [5, 0, 0, 0]
            // },
            shadowStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#BEDDFF36' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#95C8FF00' // 100% 处的颜色
                }]
              }
            }
          },
          className: 'tooltip',
          // backgroundColor: 'rgba(255,255,255,0.10)',
          // borderBottomColor: '#6E7175',
          // borderRight: 1,
          borderRadius: 0,
          padding: [8, 12],
          textStyle: {
            fontSize: 12,
            fontFamily: 'DIN',
            color: '#fff'
          },
          // 自定义样式
          extraCssText: 'border-left: 2px solid #2c9df5;background: repeating-linear-gradient(to right, #2C9DF596, #1f7fcd48, #1f7fcd00);'
        },
        grid: {
          top: '38px',
          right: '0',
          bottom: this.bottom,
          left: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // 轴线样式配置
            axisLine: {
              show: true,
              lineStyle: {
                color: '#A6CBE6',
                width: 2
              }
            },
            // 刻度样式配置
            axisTick: {
              show: false
            },
            // 刻度标签配置
            axisLabel: {
              color: '#B0B3B8',
              fontSize: this.xFont,
              // 控制间隔
              // interval: 0,
              rotate: this.rotate
            },
            data: this.dataset.xAxisLabel
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '件/人',
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: this.dataset.end
          }
        ],
        // 动画
        // animationEasing: 'elasticOut',
        animationDuration: function (idx) { // 动画的时长，它是以毫秒为单位
          // console.log(idx, '====');
          return idx * 1000;
        },
        animation: true, // 控制动画示否开启
        // animationDuration:5000, // 动画的时长，它是以毫秒为单位
        // animationDuration: (arg) => {
        //     console.log(arg);
        //     return 1000 * arg
        // },
        animationEasing: 'bounceOut', // 缓动动画
        animationThreshold: 8, // 动画元素的阈值

        series: this.seriesData
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'dark');
      this.setChartOption();
    }
  }
};
</script>

<style lang='scss' scoped>
.chart {
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: #131c3c;
}
</style>
