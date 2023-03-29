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
    colorList: {
      type: Array
    },
    showno: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      index: 0,
      dataOne: [],
      yAxisDate: [],
      startValue: 0,
      endValue: 4, // 从0开始 每次显示5个
      timer: null,
      option: {},
      maxValue: null,
      isColor: false, // 是否传入颜色
      colorArr: []
    };
  },
  watch: {
    dataset: {
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
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    formatData() {
      if(this.colorList === undefined) {
        this.colorArr = ['#FA114F', '#FF5712', '#FFE620', '#FFF'];
        this.isColor = false;
      } else {
        this.isColor = true;
        this.colorArr = this.colorList;
      }
      this.dataOne = this.dataset.data;

      this.yAxisDate = this.dataset.yAxisDate;
      this.maxValue = Math.max(...this.dataset.data);
    },
    setChartOption() {
      this.option = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        grid: {
          left: 0,
          right: 0,
          top: '12px',
          bottom: '-12px',
          containLabel: true
        },
        dataZoom: [
          {
            show: false,
            type: 'slider',
            orient: 'vertical',
            startValue: this.startValue,
            endValue: this.endValue
          }
        ],
        xAxis: {
          type: 'value',
          max: this.maxValue,
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            triggerEvent: true,
            data: this.yAxisDate,
            // 左边label
            axisLabel: {
              margin: 0,
              fontSize: 12,
              align: 'left',
              verticalAlign: 'bottom',
              color: '#999',
              lineHeight: 40,
              interval: 0, // 强制显示文字
              inside: true,
              rich: {
                a1: {
                  color: this.colorArr[0],
                  width: 20,
                  align: 'left'
                },
                a2: {
                  color: this.colorArr[1],
                  width: 20,
                  align: 'left'
                },
                a3: {
                  color: this.colorArr[2],
                  width: 20,
                  align: 'left'
                }
              },
              formatter: (params) => {
                if (this.isColor) {
                  return params
                } else {
                  const index = this.yAxisDate.indexOf(params) + 1; // 查询params在数组中的位置
                  if (index <= 3) {
                    return (
                      '{a' + index + '|No.' + index + '}' + '      ' + params
                    );
                  } else {
                    return 'No.' + index + '      ' + params;
                  }
                }

              }
            }
          },
          // 利用柱状图有两个y轴时就会一边一个的特点做右边的label
          {
            type: 'category',
            inverse: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            // 右边的label
            axisLabel: {
              show: true,
              inside: true,
              fontSize: 12,
              align: 'right',
              verticalAlign: 'bottom',
              color: '#fff',
              lineHeight: 40,
              formatter: (params) => {
                if (this.dataset.unit) {
                  // return (
                    // this.filters.ThousandSeparator(params) + this.dataset.unit
                  // );
                } else {
                  // return this.filters.ThousandSeparator(params);
                }
              }
            },
            triggerEvent: true,
            data: this.dataOne
          }
        ],
        series: [
          {
            z: 2,
            type: 'bar',
            barWidth: '4px',
            data: this.dataOne,
            itemStyle: {
              color: (params) => {
                if(!this.showno) {
                  return this.colorArr[params.dataIndex];
                } else {
                  return params.dataIndex > 3
                  ? this.colorArr[3]
                  : this.colorArr[params.dataIndex];
                }

              },
              barBorderRadius: 2
            },
            emphasis: {
              itemStyle: {
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
                shadowBlur: 12,
                shadowColor: 'rgba(255,255,255,0.6)'
              }
            }
          }
        ]
      };
      this.chart.setOption(this.option, true);
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'dark');
      this.setChartOption();
      this.autoScroll();
      // this.chart.on("mouseover", this.stop);
      this.chart.on('mouseover', params => {
        this.stop(params);
        // clearInterval(this.timer);
        // this.timer = null;
      });
      this.chart.on('mouseout', this.autoScroll);
    },
    autoScroll() {
      this.timer = setInterval(() => {
        if (this.dataOne.length <= this.option.dataZoom[0].endValue) {
          this.option.dataZoom[0].startValue = this.startValue;
          this.option.dataZoom[0].endValue = this.endValue;
        } else {
          this.option.dataZoom[0].startValue =
            this.option.dataZoom[0].startValue + 1;
          this.option.dataZoom[0].endValue =
            this.option.dataZoom[0].endValue + 1;
        }
        this.chart.setOption(this.option);
      }, 3000);
    },
    stop(params) {
      clearInterval(this.timer);
      this.timer = null;
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
