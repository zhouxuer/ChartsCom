<template>
  <div class="chart" />
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'BarChart',
  mixins: [resize],
  props: ['dataset'],
  data() {
    return {
      chart: null,
      option: {},
      colorList: [
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
      datas: [],
      yAxisDate: [],
      dataUnit: [],
      total: 0
    };
  },
  watch: {
    dataset: {
      handler(newVal, oldVal) {
        if(newVal) {
          this.formatData();
          this.chart.setOption(this.option);
        }
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
      this.total = 0;
      const _data = this.dataset.datas.map((item) => {
        this.total += Number(item);
        return Number(item);
      });
      this.yAxisDate = this.dataset.yAxisDate;
      this.datas = _data.map((item) => (item / this.total) * 100);
      this.dataUnit = this.datas.map((item) => item.toFixed(1) + '%');
      this.option = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        grid: {
          left: '0',
          right: '0',
          top: '0px',
          bottom: '0%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            label: {
              show: false,
              backgroundColor: 'rgba(0,0,0,0)',
              color: '#ffffff',
              fontWeight: 600,
              padding: [0, 2, 0, 8]
            }
          },
          formatter: (params) => {
            return ''
          }
        },
        xAxis: {
          type: 'value',
          max: 100,
          splitLine: {
            show: false
          },
          axisTick: {
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
            data: this.yAxisDate,
            // 左边label
            axisLabel: {
              fontSize: 14,
              align: 'right',
              interval: 0, // 强制显示文字
              // fontSize: 12,
              color: (value, index) => {
                if (this.dataset.titleColor) {
                  return this.colorList[index];
                } else {
                  return '#999';
                }
              }
            }
          },
          // 利用柱状图有两个y轴时就会一边一个的特点做右边的label
          {
            type: 'category',
            offset: -5,
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
              inside: false,
              margin: 15,
              fontSize: 14,
              align: 'left',
              color: '#fff'
              // fontSize: 12
            },
            data: this.dataUnit
          }
        ],
        series: [
          {
            z: 2,
            type: 'bar',
            barWidth: '4px',
            data: this.datas,
            itemStyle: {
              color: (params) => {
                return this.colorList[params.dataIndex];
              },
              barBorderRadius: 2
            },
            showBackground: true,
            backgroundStyle: {
              color: '#2C2C2E',
              barBorderRadius: 2
            },
            emphasis: {
              itemStyle: {
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
                shadowBlur: 6,
                shadowColor: 'rgba(255,255,255,0.9)'
              }
            }
          }
        ]
      };
      if (this.dataset.type === 'up') {
        // 判断标签是否在上方
        // eslint-disable-next-line no-unused-expressions, no-sequences
        (this.option.grid.top = '12px'), (this.option.grid.bottom = '-12px');
        // 左边label
        this.option.yAxis[0].axisLabel = {
          ...this.option.yAxis[0].axisLabel,
          align: 'left',
          margin: 0,
          lineHeight: 40,
          verticalAlign: 'bottom',
          inside: true
        };
        // 右边label
        this.option.yAxis[1].axisLabel = {
          ...this.option.yAxis[1].axisLabel,
          inside: true,
          align: 'right',
          verticalAlign: 'bottom',
          lineHeight: 40,
          margin: 0
        };
      }
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'dark');
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
