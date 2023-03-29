/** bi二期数据概览三数据柱状图新增 */
<template>
  <div class="chart" />
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'BarChart3',
  mixins: [resize],
  props: {
    dataset: {
      type: Object
    },
    colorArr: {
      // 默认颜色，且长度必须为2的倍数
      type: Array,
      default: () => {
        return [
          'rgba(225, 0, 20, 1)',
          'rgba(254, 50, 135, 1)',
          'rgba(55, 219, 0, 1)',
          'rgba(186, 255, 0, 1)',
          'rgba(0, 186, 225, 1)',
          'rgba(0, 251, 208, 1)'
        ];
      }
    },
    color: {
      type: Array,
      default: () => {
        return [
          '#FA114F',
          '#A6FE00',
          '#3AE9E6'
        ]
      }
    },
    xFont: {
      type: Number,
      default: 12
    },
    isStack: {
      // 是否进行柱状图合并
      type: Boolean,
      require: false,
      default: true
    },
    showLegend: {
      type: Boolean,
      default: true
    },
    bottom: {
      type: String,
      default: '30'
    },
    tooltipWidth: {
      type: String,
      default: '183'
    },
    titleType: {
      type: String,
      default: 'none',
      require: false
    }
  },
  data() {
    return {
      chart: null,
      colorList: [],
      // 坐标轴高亮颜色
      labelColor: '#0A84FE'
    };
  },
  computed: {
    changeData() {
      const { dataset, colorArr, xFont } = this;
      return {
        dataset,
        colorArr,
        xFont
      };
    }
  },
  watch: {
    changeData: {
      handler(newVal, oldVal) {
        this.watchProps(newVal, oldVal);
      },
      deep: true
    }
  },
  // created() {
  //   this.colorList = this.colorArr;
  // },
  mounted() {
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
      if (this.chart) {
        if (newVal) {
          this.setChartOption();
        }
      } else {
        this.initChart();
      }
    },
    setChartOption() {
      const chartOption = {
        backgroundColor: '#242526',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            label: {
              show: true,
              backgroundColor: '#242526',
              color: this.labelColor,
              fontSize: this.xFont,
              fontWeight: 600,
              padding: [5, 0, 0, 0]
            }
          },
          className: 'tooltip',
          backgroundColor: 'rgba(255,255,255,0.10)',
          borderColor: '#6E7175',
          borderWidth: 1,
          borderRadius: 8,
          padding: [12, 20],
          textStyle: {
            fontSize: 12,
            fontFamily: 'DIN',
            color: '#fff'
          },
          extraCssText: 'backdrop-filter: blur(20px);',
          formatter: (params) => {
            // 获取标信息
            const index = params[0].dataIndex;
            let title
            if (this.titleType === 'year') {
              // 获取当前年份
              const date = new Date()
              const year = date.getFullYear()
              title = `${year}.${params[0].name}`
            } else if (this.titleType === 'time') {
              if (this.dataset.title && this.dataset.title.length > 0) {
                title = this.dataset.title[index]
              }
            } else {
              title = params[0].name
            }
            const str = `
               <div style="min-width:${this.tooltipWidth}px">
                      <div style="font-size:16px;margin-bottom: 2px">${title}</div>
                ${params
                  .map((item, index) => {
                    return `
                        <div style="display: flex;justify-content: space-between;margin-top:10px">
                          <div style="display: flex;align-items: center;">
                            <div style="width:4px;height:4px;border-radius: 12px;background:${
                              this.color[index]
                            }"></div><span
                              style="margin-left: 10px;">${
                                params[index].seriesName
                              }</span>
                          </div>
                          <div><span>${this.filters.ThousandSeparator(
                            Number(params[index].data)
                          )}</span></div></div>`;
                  })
                  .join('')}</div>`;
            return str;
          }
        },
        legend: {
          show: this.showLegend,
          icon: 'circle',
          itemWidth: 4,
          bottom: -5,
          itemGap: 20,
          borderStyle: {
            barBorderRadius: 10
          },
          orient: 'horizontal',
          textStyle: {
            color: '#999999',
            fontSize: 12
          }
        },
        grid: {
          top: '7px',
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
            data: this.dataset.date
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
            // end: this.dataset.end ? this.dataset.end : this.dataListShow(this.dataset.xAxisLabel).end
          }
        ],
        series: this.mapDataOption()
      };
      this.chart.setOption(chartOption);
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'dark');
      this.setChartOption();
    },
    // 针对数据进行处理
    mapDataOption() {

      const list = [];

      const colors = JSON.parse(JSON.stringify(this.colorArr));
      // emphasis: {
      //       itemStyle: {
      //         shadowOffsetX: 0,
      //         shadowOffsetY: 4,
      //         opacity: 1,
      //         shadowBlur: 12,
      //         shadowColor: this.minColor[index],
      //       },
      //     },
      // eslint-disable-next-line array-callback-return
      this.dataset.data.map((item, index) => {
        const itemColor = colors.splice(0, 2);
        const option = {
          name: item.name,
          type: 'bar',
          stack: this.isStack ? 'bar' : `${index}`,
          barWidth: this.dataset.barWidth ? this.dataset.barWidth : 16,
          emphasis: {
            focus: 'series'
          },
          data: item.data,
          itemStyle: {
            normal: {
              borderRadius: '',
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: itemColor[0]
                },
                {
                  offset: 1,
                  color: itemColor[1]
                }
              ])
            }
          }
        };

        if (this.isStack && index === 0) {
          option.itemStyle.normal.borderRadius = [0, 0, 4, 4];
        } else if (this.isStack && index === this.dataset.data.length - 1) {
          option.itemStyle.normal.borderRadius = [4, 4, 0, 0];
        }
        if (!this.isStack) {
          if(this.dataset.barWidth !== 16) {
            option.itemStyle.normal.borderRadius = [2, 2, 2, 2];
          } else {
            option.itemStyle.normal.borderRadius = [4, 4, 4, 4];
          }
        }
        list.push(option);
      });

      return list;
    }
  }
};
</script>

<style lang='scss' scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
