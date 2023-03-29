<template>
  <div class="chart" />
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'PolarChart2',
  mixins: [resize],
  props: {
    total: {
      type: Number,
      required: true
    },
    num: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    color: {
      type: Array,
      required: false,
      default: () => {
        return ['#E10014', '#FE3287']
      }
    },
    bgColor: {
      type: String,
      required: false,
      default: '#2B191D'
    },
    radius: {
      type: Array,
      required: false,
      default: () => {
        return [64, 80]
      }
    }
  },
  data() {
    return {
      chart: null,
      chartData: [],
      value: 0
    };
  },
  computed: {
    changeData() {
      const {total, num, title, color, bgColor} = this;
      return {
        total, num, title, color, bgColor
      }
    }
  },
  watch: {
    changeData: {
      handler(newVal, oldVal) {
        this.formatData();
        this.setChartOption();
      },
      deep: true
    }
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
    formatData() {
      this.chartData = [];
      this.value = this.num >= 10000 ? this.filters.ThousandSeparator(this.filters.isTenThousand(this.num)) + 'W' : this.filters.ThousandSeparator(this.num);
      this.chartData.push(
        {
          name: this.title,
          type: 'pie',
          hoverAnimation: false,
          z: 200,
          radius: this.radius,
          center: ['50%', '50%'],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: this.color[0],
          data: [
            {
              name: this.title,
              value: this.num,
              zlevel: 200,
              emphasis: {
                itemStyle: {
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  opacity: 1,
                  shadowBlur: 12,
                  shadowColor: this.color[0]
                }
              },
              itemStyle: {
                normal: {
                  borderRadius: '50%',
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: this.color[0] // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: this.color[1] // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              }
            },
            {
              value: this.total - this.num,
              tooltip: {
                show: false
              },
              itemStyle: {
                color: 'rgba(0,0,0,0)'
              }
            }
          ]
        },
        {
          // 底色
          name: '',
          type: 'pie',
          radius: this.radius,
          center: ['50%', '50%'],
          z: 100,
          clockwise: false,
          animation: false,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          tooltip: {
            show: false
          },
          hoverAnimation: false,
          data: [
            {
              value: this.total,
              itemStyle: {
                color: this.bgColor
              }
            }
          ]
        }
      );

    },
    setChartOption() {
      this.chart.setOption({
        backgroundColor: 'rgba(0, 0, 0, 0)',
        legend: {
          show: false
        },
        tooltip: {
          show: false
        },
        title: {
          text: this.value,
          subtext: this.title,
          textStyle: {
            color: '#FFFFFF',
            fontSize: '28',
            fontFamily: 'DIN',
            fontWeight: 600
          },
          subtextStyle: {
            color: '#999999',
            fontSize: 12
          },
          left: 'center',
          top: '75',
          itemGap: 5,
          z: 201
        },
        series: this.chartData
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
  padding: 0;
}
</style>
