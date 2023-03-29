/** bi二期环形组件修改，可选颜色支持，新增图表内半径设置 */
<template>
  <!-- echarts -->
  <div class="chart" ref="pieChart"></div>
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'PieChart2',
  mixins: [resize],
  props: {
    dataset: {
      type: Array,
      required: true
    },
    color: {
      type: Array,
      require: true,
      default: () => {
        return [
          ['#37DB00', '#BAFF00'],
          ['#00BAE1', '#00FBD0']
        ];
      }
    },
    // 内半径设置
    setRadius: {
      type: Array,
      require: true,
      default: () => {
        return [28, 61]
      }
    }
  },
  computed: {
    changeData() {
      const { dataset } = this;
      return {
        dataset
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
      chart: null
    };
  },
  mounted() {
    this.formatData();
    this.$nextTick(() => {
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
  },
  methods: {
    formatData() {
      this.seriesData = [];
      this.dataset.forEach((item, index) => {
        const _item = {
          ...item
          // active: false,
        };
        const _start = index === 0 ? 1 : 0;
        const _end = index === 0 ? 0 : 1;
        this.seriesData.push({
          ..._item,
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: this.color[index][_start]
                  },
                  {
                    offset: 1,
                    color: this.color[index][_end]
                  }
                ]
              }
            }
          },
          emphasis: {
            itemStyle: {
              shadowColor: this.color[index][0]
            }
          }
        });
      });
    },
    setChartOption() {
      this.chart.setOption(
        {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          legend: {
            show: true,
            bottom: 0,
            orient: 'horizontal',
            icon: 'circle',
            itemWidth: 6,
            itemGap: 10,
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
            confine: true,
            extraCssText: 'border-radius: 8px;backdrop-filter: blur(20px);',
            formatter: (params) => {
              // console.log(params)
              const str = `
            <div class="" style="text-align: center;">
              <div style="margin-bottom: 5px;font-size: 12px;color: #ffffff;font-weight: bold;">${
                params.percent
              }%</div>
              <div style="font-size: 20px;font-family: 'DIN';color: #ffffff;">${this.filters.ThousandSeparator(
                params.data.value
              )}</div>
            </div>
            `;
              return str;
            }
          },
          series: [
            {
              type: 'pie',
              radius: this.setRadius,
              center: ['50%', '42%'],
              startAngle: 270,
              selectedMode: 'single',
              data: this.seriesData,

              label: {
                show: false,
                formatter: '{d}%',
                color: '#B0B3B8',
                padding: [0, -30],
                fontSize: 12
              },
              labelLine: {
                show: false,
                lineStyle: {
                  color: '#3E4042'
                }
              },
              itemStyle: {
                borderRadius: 5,
                borderColor: '#242526',
                borderWidth: 2
              },
              emphasis: {
                itemStyle: {
                  borderWidth: 0,
                  shadowBlur: 10,
                  shadowOffsetX: 0
                }
              }
            }
          ]
        },
        true
      );
    },
    initChart() {
      this.chart = echarts.init(this.$refs.pieChart, 'dark');
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
