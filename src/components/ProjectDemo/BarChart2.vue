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
      LabelDataList: [],
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
    this.LabelData();
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
      this.LabelData();
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
        // this.showLegend = this.dataset.legend;
        // this.bottom = 30;
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
          this.seriesData.push({
            name: item.name,
            type: 'pictorialBar',
            barCategoryGap: '0%',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            data: item.data,
            // 控制柱状图柱子最大宽度
            barMaxWidth: this.dataset.barWidth,
            barGap: '10%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: this.colorList[index][0] // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: this.colorList[index][1] // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              },
              borderRadius: 4,
              // borderColor: 'red',
              // opacity: 0.8,
              // borderWidth: 1
              shadowColor: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255, 0, 0, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 0, 0, 1)' // 100% 处的颜色
                  }
                ]
              },
              shadowBlur: 8
            },
            emphasis: {
              itemStyle: {
                shadowOffsetX: 0,
                shadowOffsetY: 4,
                opacity: 1,
                shadowBlur: 12,
                shadowColor: this.shadowColor[index]
              }
            },
            label: {
              show: true,
              position: 'top'
            }
          });
        });
      }
    },

    LabelData() {
      this.LabelDataList = [];
      const label = this.dataset.xAxisLabel;
      if (label.length > 0) {
        label.forEach((item, index) => {
          this.LabelDataList.push({
            value: item.replace(' ', '\n'),
            textStyle: {
              color: '#FFF',
              fontSize: 16,
              width: 112,
              lineHeight: 20
            }
          });
        });
      }
    },
    setChartOption() {
      this.chart.setOption({
        backgroundColor: '#242526',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            snap: true,
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
          top: '62px',
          right: '0',
          bottom: this.bottom,
          left: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#3E4042'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#B0B3B8',
              fontSize: this.xFont,
              // 控制间隔
              // interval: 0,
              rotate: this.rotate
            },
            // data: this.dataset.xAxisLabel
            data: this.LabelDataList
          }
        ],
        yAxis: {
          show: true,
          type: 'value',
          min: 0,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false,
            length: 2 // 刻度线长度
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#3E4042'
            }
          },
          axisLabel: {
            color: '#B0B3B8',
            fontSize: 12
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: this.dataset.end
          }
        ],
        series: this.seriesData
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'dark');
      this.setChartOption();
    }

    // 图表数据根据数据量展示处理
    // dataListShow(value) {
    //   if (value.length <= 10) {
    //     // 10条数据以内全部显示
    //     let data = {
    //       end: 100
    //     }
    //     return data
    //   } else if (value.length <= 20) {
    //     // 20条数据以内显示一半
    //     let data = {
    //       end: 50
    //     }
    //     return data
    //   } else if (value.length <= 30){
    //     // 大于20条数据，显示7条数据,最多显示21条数据
    //     let data = {
    //       end: 30
    //     }
    //     return data
    //   } else if (value.length <= 60) {
    //     // 大于20条数据，显示7条数据,最多显示21条数据
    //     let data = {
    //       end: 20
    //     }
    //     return data
    //   } else {
    //     // 大于20条数据，显示7条数据,最多显示21条数据
    //     let data = {
    //       end: 10
    //     }
    //     return data
    //   }
    // }
  }
};
</script>

<style lang='scss' scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
