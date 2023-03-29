<template>
  <div class="chart" />
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'PolarChart',
  mixins: [resize],
  props: ['dataset'],
  data() {
    return {
      chart: null,
      total: 0,
      data: [],
      colorList: [
        ['#E10014', '#FE3287'],
        ['#37DB00', '#BAFF00'],
        ['#00BAE1', '#00FBD0'],
        ['#BF00E1', '#F800FB']
      ],
      bgList: [
        'rgba(225,0,20,0.08)',
        'rgba(55,219,0,0.08)',
        'rgba(0,186,225,0.08)',
        'rgba(191,90,242,.1)'
      ],
      chartData: [],
      legendGap: 10
      // dataset: [
      //   {name: '男', value: 90},
      //   {name: '女', value: 8},
      //   {name: '未知', value: 2},
      // ]
    };
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
      if (this.dataset.length > 3) {
        this.legendGap = 4;
      }
      this.data = this.dataset.map((item) => {
        this.total += Number(item.value);
        return {
          name: item.name,
          value: Number(item.value)
        };
      });
      this.dataset.forEach((item, index) => {
        this.chartData.push(
          {
            name: item.name,
            type: 'pie',
            hoverAnimation: false,
            z: 200,
            // radius: [55 - index * 16 + '%', 70 - index * 16 + '%'],
            radius: [49 - index * 15 + 'px', 63 - index * 15 + 'px'],
            center: ['50%', '42%'],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: this.colorList[index][0],
            data: [
              {
                name: item.name,
                value: item.value,
                zlevel: 200,
                emphasis: {
                  itemStyle: {
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    opacity: 1,
                    shadowBlur: 12,
                    shadowColor: this.colorList[index][0]
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
                          color: this.colorList[index][0] // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: this.colorList[index][1] // 100% 处的颜色
                        }
                      ],
                      global: false // 缺省为 false
                    }
                  }
                }
              },
              {
                value: this.total - item.value,
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
            radius: [49 - index * 15 + 'px', 63 - index * 15 + 'px'],
            center: ['50%', '42%'],
            z: 100,
            clockwise: false,
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
                  color: this.bgList[index]
                }
              }
            ]
          }
        );
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'dark');
      this.chart.setOption(
        {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          legend: {
            show: true,
            bottom: 0,
            orient: 'vertical',
            icon: 'circle',
            itemWidth: 4,
            itemGap: this.legendGap,
            textStyle: {
              color: '#B0B3B8',
              fontSize: 12
            }
          },
          tooltip: {
            trigger: 'item',
            className: 'tooltip',
            backgroundColor: 'rgba(255,255,255,0.10)',
            borderWidth: 1,
            borderColor: '#6E7175',
            padding: [10, 12],
            extraCssText:
              'border-radius: 8px 8px 8px 2px;backdrop-filter: blur(20px);',
            textStyle: {
              fontSize: 20,
              fontFamily: 'DIN',
              color: '#ffffff'
            },
            position: function (point) {
              return [point[0] - 35, point[1] - 60];
            },
            formatter: '{d}%'
          },

          series: this.chartData
        },
        true
      );
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
</style>
