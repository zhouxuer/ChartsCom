<template>
  <div class="chart" />
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'AreaChart2',
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
        return [
          '#FA114F',
          'rgba(254, 50, 135, 0.15)',
          '#37DB00',
          'rgba(186, 255, 0, .15)',
          '#00BAE1',
          'rgba(0, 251, 208, .15)'
        ];
      }
    },
    colors: {
      type: Array,
      required: false,
      default: () => {
        return ['#FA114F', '#37DB00', '#00BAE1'];
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
        dataset,
        color,
        money,
        interval
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
      const chartOption = {
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
          padding: [12, 20],
          className: 'tooltip',
          textStyle: {
            fontFamily: 'DIN',
            fontSize: 12,
            color: '#ffffff'
          },
          formatter: (params) => {
            // 获取标题
            const index = params[0].dataIndex;
            let titleStr = '';
            if (this.dataset.title && this.dataset.title.length > 0) {
              // eslint-disable-next-line no-unused-vars
              titleStr = `
                <div class="tooltip-title2">
                  ${this.dataset.title[index]}
                </div>
              `;
            }
            // 获取当前年份
            const date = new Date();
            const year = date.getFullYear();
            let money;
            // 判断是否为金额
            if (this.money) {
              // _data = _data.toFixed(2);
              // value = `￥${this.filters.ThousandSeparator(_data)}`;
              money = '￥';
            } else {
              money = '';
            }
            const str = `
              <div style="min-width:183px">
                      <div style="font-size:16px;margin-bottom: 2px">${year}.${
              params[0].name.length > 2 ? params[0].name.slice(0, 2) : '0' + params[0].name.slice(0, 1)
            }</div>
                ${params
                  .map((item, index) => {
                    return `
                        <div style="display: flex;justify-content: space-between;margin-top:10px">
                          <div style="display: flex;align-items: center;">
                            <div style="width:4px;height:4px;border-radius: 12px;background:${
                              this.colors[index]
                            }"></div><span
                              style="margin-left: 10px;">${
                                params[index].seriesName
                              }</span>
                          </div>
                          <div><span>${money}${this.filters.ThousandSeparator(
                      Number(params[index].data).toFixed(2)
                    )}</span></div></div>`;
                  })
                  .join('')}</div>`;
            return str;
          },
          extraCssText: 'backdrop-filter: blur(20px);'
        },
        legend: {
          bottom: 0,
          itemStyle: {
            borderColor: 'none'
          },
          icon: 'circle',
          itemWidth: 4,
          itemGap: 16
        },
        grid: {
          left: this.dataset.offset,
          // left: "0%",
          right: this.dataset.right || '3%',
          bottom: '20%',
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
              if (!this.dataset.yAxis) {
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

        // 后续需要数据遍历可依据类别进行遍历，同时针对颜色，采用截取的方式进行取色
        series: this.mapDataOption()
      };
      this.chart.setOption(chartOption, true);
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'dark');
      this.setChartOption();
    },
    // 针对图表数据进行处理，色彩取值
    mapDataOption() {
      const list = [];
      const colors = JSON.parse(JSON.stringify(this.color));

      // eslint-disable-next-line array-callback-return
      this.dataset.chartData.map((item, index) => {
        const itemColor = colors.splice(0, 2);
        const option = {
          name: item.name ? item.name : item,
          data: item.data ? item.data : item,
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 12,
          itemStyle: {
            color: itemColor[0],
            borderColor: '#ffffff',
            borderWidth: 1
          },
          lineStyle: {
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 12,
            width: 2,
            shadowColor: itemColor[0]
          },
          areaStyle: {
            // 区域渐变
            color: this.color[index],
            opacity: 0.1 // 渐变透明度
          },
          // eslint-disable-next-line no-dupe-keys
          smooth: true
        };

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
.round-color {
  width: 4px;
  height: 4px;
  border-radius: 12px;
}
</style>
