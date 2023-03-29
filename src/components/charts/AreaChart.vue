<template>
  <div class="chart" />
</template>


<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'AreaChart',
  mixins: [resize],
  props: {
    dataset: {
      type: Object,
      required: false
    },
    color: {
      type: Array,
      required: false,
      default: () => {
        return ['#00FBCF', '#00BAE1']
      }
    },
    // 是否为金额，添加￥
    money: {
      type: Boolean,
      required: false,
      default: false
    },
    // x轴是否都显示
    interval: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      chart: null,
      unit: ''
    };
  },
  computed: {
    changeData() {
      const { dataset, color, money, interval } = this;
      return {
        dataset, color, money, interval
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
  mounted() {
    this.formatData();
    this.$nextTick(() => {
      if (this.dataset.chartData.length > 0) {
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
    // 1111
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
    formatData() {
      if (this.dataset.unit) {
        this.unit = this.dataset.unit;
      }
    },
    setChartOption() {
      this.chart.setOption({
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#242526',
              color: this.color[1],
              fontSize: 12,
              fontWeight: 600,
              padding: [5, 0, 0, 0]
            },
            shadowStyle: {
              color: 'rgba(255, 255, 255, 0.04)'
            }
          },
          backgroundColor: 'rgba(255,255,255,0)',
          borderColor: '#6E7175',
          borderWidth: 1,
          borderRadius: 8,
          padding: [0, 0],
          className: 'tooltip',
          textStyle: {
            fontFamily: 'DIN',
            fontSize: 20,
            color: '#ffffff'
          },
          extraCssText: 'backdrop-filter: blur(20px);',
          formatter: (params) => {
            // 获取标题
            const index = params[0].dataIndex;
            let titleStr = '';
            if(this.dataset.title && this.dataset.title.length > 0) {
              titleStr = `
                <div class="tooltip-title2">
                  ${this.dataset.title[index]}
                </div>
              `
            }
            // 判断是否为金额
            let value = '',
                _data = params[0].data;
            if(this.money) {
              _data = _data.toFixed(2);
              value = `￥${this.filters.ThousandSeparator(_data)}`;
            } else {
              value = `${this.filters.ThousandSeparator(_data)}`;
            }

            const str = `
              ${titleStr}
              <div class="tooltip-wrapper">
                <div class="area-text">
                  ${value}
                </div>
              </div>
            `;

            return str;
          }
        },
        grid: {
          left: this.dataset.offset,
          // left: "0%",
          right: this.dataset.right || '3%',
          bottom: '0%',
          top: '7px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dataset.xAxisData,
          splitLine: {
            show: true, // 显示纵向网格线
            lineStyle: {
              color: '#3E4042',
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#4D4D4D'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            // 始终显示最小和最大的刻度
            showMinLabel: true,
            showMaxLabel: true,
            interval: this.interval,
            textStyle: {
              color: '#B0B3B8',
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: 'value',
          show: this.dataset.yAxis,
          offset: this.dataset.offset,
          axisLabel: {
            textStyle: {
              color: '#B0B3B8',
              fontSize: 12
            },
            formatter: (value) => {
              // 如果不显示y轴，则返回y轴数据为空，这样y轴就不会占位
              if(!this.dataset.yAxis) {
                return '';
              } else {
                return value;
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: '#4D4D4D'
            }
          },
          splitLine: {
            show: this.dataset.yAxis, // 显示横向网格线
            lineStyle: {
              color: '#3E4042',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: this.dataset.start,
            end: 100
          }
        ],
        series: [
          {
            data: this.dataset.chartData,
            type: 'line',
            showSymbol: false,
            symbolSize: 12,
            itemStyle: {
              color: this.color[1],
              borderColor: '#ffffff',
              borderWidth: 2
            },
            lineStyle: {
              width: 0
            },
            areaStyle: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: this.color[0]
                },
                {
                  offset: 1,
                  color: this.color[1]
                }
              ])
            },
            smooth: true
          }
        ]
      }, true);
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
}
</style>
