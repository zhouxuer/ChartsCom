/** bi项目二期饼图新增 */
<template>
  <div class="chart" ref="pieChart"></div>
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';
export default {
  name: 'pieChart3',
  mixins: [resize],
  props: {
    color: {
      typeof: Array,
      require: false,
      default: () => {
        return ['#FA114F', '#3AE9E6', '#A6FE00'];
      }
    },
    title: {
      typeof: String,
      require: true
    },
    dataset: {
      typeof: Array,
      require: true
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
  mounted() {
    this.formatData();
    this.$nextTick(() => {
      if (this.dataset.length > 0) {
        this.initChart();
      }
    });
  },
  data() {
    return {
      chart: null,
      seriesData: [],
      total: null
    };
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
        this.total += Number(item.value);
      });
      this.fontSize = 16;
    },
    setChartOption() {
      const titleText = this.total;
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
          legend: {
            show: true,
            bottom: -6,
            itemGap: 12,
            itemWidth: 4,
            itemHeight: 4
          },
          color: this.color,
          title: {
            text: this.filters.ThousandSeparator(titleText),
            subtext: this.title,
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
            top: '34%',
            itemGap: 4
          },
          series: [
            {
              name: '全部任务',
              type: 'pie',
              bottom: 20,
              radius: ['78%', '86%'],
              avoidLabelOverlap: false,
              label: {
                show: false
              },
              emphasis: {
                focus: 'none',
                itemStyle: {
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  opacity: 1,
                  shadowBlur: 12,
                  borderRadius: '50%',
                  borderWidth: 5
                },
                scale: true
                // scaleSize: 5,
              },
              labelLine: {
                show: false
              },
              data: this.seriesData
            },
            {
              // 内圈外边框
              name: '',
              type: 'pie',
              top: '-14%',
              radius: ['30%', '42%'],
              // radius:['68%','70%'],
              avoidLabelOverlap: false,
              legendHoverLink: false,
              label: {
                show: false
              },
              tooltip: {
                // 禁止鼠标悬停显示提示框
                show: false
              },
              hoverAnimation: false, // 禁止鼠标悬停放大区域
              data: [
                {
                  value: '100',
                  itemStyle: {
                    color: '#56595C'
                  }
                }
              ]
            },
            {
              // 内圈填充
              type: 'pie',
              top: '-14%',
              radius: ['0%', '44%'],
              // radius:['0%','70%'],
              label: {
                show: false,
                position: 'center'
              },
              tooltip: {
                show: false
              },
              hoverAnimation: false,
              color: '#3A3B3C',
              data: [
                {
                  value: '100',
                  itemStyle: {
                    color: '#3A3B3C',
                    emphasis: {
                      color: '#3A3B3C'
                    }
                  }
                }
              ]
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
  }
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
}
</style>