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
        return ['#FA114F', '#A6FE00', '#3AE9E6'];
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
      colorList: [],
      list: [],
      legendData: [], // 图例数据
      maxData1: [],
      maxData2: [],
      splitNumber: 5, // 图表刻度段数
      unit: '',
      showLegend: false,
      bottom: 0,
      // 阴影颜色
      shadowColor: [],
      // 坐标轴高亮颜色
      labelColor: '#3AE9E6'
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
  created() {
    this.colorList = this.colorArr;
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
    // 转换颜色
    colorHex(item) {
      const str = item + '7F';
      return str;
    },
    formatData() {
      this.seriesData = [];
      if (this.dataset.colorList) this.colorList = this.dataset.colorList;
      if (this.dataset.legend) {
        this.showLegend = this.dataset.legend;
        this.bottom = 30;
      }
      this.colorList.forEach((item) => {
        const _item = this.colorHex(item[1]);
        this.shadowColor.push(_item);
      });

      const barList = this.dataset.barData;
      const lineList = this.dataset.lineData;
      // 柱状图数据配置
      barList.forEach((item, index) => {
        const _item = {
          name: item.name,
          type: 'bar',
          data: item.data,
          yAxisIndex: 0,
          // 控制柱状图柱子最大宽度
          barMaxWidth: this.dataset.barWidth,
          barGap: '30%',
          itemStyle: {
            color: this.colorList[index],
            borderRadius: 2
          },
          emphasis: {
            itemStyle: {
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              opacity: 1,
              shadowBlur: 12,
              shadowColor: this.shadowColor[index]
            }
          }
        };
        this.seriesData.push(_item);
        this.maxData1.push(...item.data);
        this.legendData.push({ icon: 'rect', name: item.name });
      });

      // 折线数据配置
      lineList.forEach((item, index) => {
        const _item = {
          type: 'line',
          name: item.name,
          data: item.data,
          yAxisIndex: 1,
          smooth: true,
          showSymbol: false,
          symbolSize: 8,
          color: this.colorList[index],
          lineStyle: {
            shadowColor: this.colorList[index]
          },
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 1
          },
          emphasis: {
            focus: 'series'
          }
        };
        this.seriesData.push(_item);
        this.maxData2.push(...item.data);

        const preIndex = this.legendData.findIndex((val) => {
          const itemName = item.name.split('-')[0];
          const valName = val.name.split('-')[0];
          return itemName === valName;
        });
        if (preIndex !== -1) {
          this.legendData.splice(preIndex + 1, 0, {
            icon: 'circle',
            name: item.name
          });
        }
      });
    },

    // chart配置项
    setChartOption() {
      const Min1 = this.calMin(this.maxData1),
        Max1 = this.calMax(this.maxData1),
        Min2 = this.calMin(this.maxData2),
        Max2 = this.calMax(this.maxData2);

      this.chart.setOption({
        backgroundColor: '#242526',
        // 图例配置
        legend: {
          show: this.showLegend,
          // show: true,
          data: this.legendData,
          bottom: -5,
          orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 6,
          borderColor: '#f00',
          itemGap: 20,
          textStyle: {
            color: '#999999',
            fontSize: 12
          }
        },
        // 提示框配置
        tooltip: {
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'line',
            label: {
              show: true,
              backgroundColor: '#242526',
              color: '#0A84FE',
              fontSize: 12,
              fontWeight: 600,
              padding: [5, 0, 0, 0]
            },
            lineStyle: {
              type: 'solid',
              color: '#ffffff'
            },
            z: 0
          },
          className: 'tooltip',
          backgroundColor: 'rgba(255,255,255,0.10)',
          borderColor: '#6E7175',
          borderWidth: 1,
          borderRadius: 8,
          padding: [12, 20],
          textStyle: {
            fontSize: 12,
            color: '#ffffff'
          },
          extraCssText: 'backdrop-filter: blur(20px);z-index: 3;',
          formatter: (params) => {
            let str = '',
              // eslint-disable-next-line prefer-const
              typeData = [],
              // newTypeData = [],
              // eslint-disable-next-line prefer-const
              titleList = [];
            // 获取标题
            const index = params[0].dataIndex;
            let titleStr = '';
            if (this.dataset.title && this.dataset.title.length > 0) {
              titleStr = `
              <div class="tooltip-title">
                ${this.dataset.title[index]}
              </div>
            `;
            }

            // 拼接每项数据
            params.forEach((ele) => {
              if (ele.seriesName) {
                let _data = 0;
                let _unit = '';
                if (ele.data >= 10000) {
                  _data = this.filters.isTenThousand(ele.data);
                  _unit = 'W';
                } else {
                  _data = ele.data;
                }
                let itemValue = '';
                if (this.money) {
                  _data = _data.toFixed(2);
                  // eslint-disable-next-line camelcase
                  itemValue = `￥${this.filters.ThousandSeparator(
                    _data
                  )}${_unit}`;
                } else {
                  // eslint-disable-next-line camelcase
                  itemValue = `${this.filters.ThousandSeparator(
                    _data
                  )}${_unit}${this.unit}`;
                }
                if (ele.seriesName.includes('-')) {
                  const arr = ele.seriesName.split('-');
                  const title = arr[arr.length - 1];
                  const name = arr[0];
                  if (!titleList.includes(title)) titleList.push(title);
                  typeData.push({
                    title,
                    name,
                    itemValue: itemValue,
                    color: ele.color
                  });
                } else {
                  str += `
                    <div class="line-tooltip-wrapper">
                      <i class="tooltip-icon" style="background: ${ele.color};"></i>
                      <div class="text-label"><span>${ele.seriesName}</span></div>
                      <span class="text-value">${itemValue}</span>
                    </div>
                  `;
                }
              }
            });

            // tips分类
            titleList.forEach((title) => {
              let list = '';
              typeData.forEach((item) => {
                if (item.title === title) {
                  list += `<li class="line-tooltip-wrapper">
                      <i class="tooltip-icon" style="background: ${item.color};"></i>
                      <div class="text-label"><span>${item.name}</span></div>
                      <span class="text-value">${item.itemValue}</span>
                    </li>`;
                }
              });
              str += `<div class="tooltip-com">
              <div class="tooltip-com-title">${title}</div>
              <ul>${list}</ul>
              </div>`;
            });

            const result = `
              ${titleStr}
              <div class="tooltip-wrapper tooltip-wrapper1 flex">${str}</div>
            `;
            return result;
          }
        },
        // 网格位置配置
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
            data: this.dataset.xAxisLabel,
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
            splitLine: {
              show: true, // 显示纵向网格线
              lineStyle: {
                color: '#3E4042',
                type: 'solid'
              }
            }
          }
        ],
        yAxis: [
          {
            show: true,
            type: 'value',
            min: Min1,
            max: Max1,
            splitNumber: this.splitNumber,
            interval: (Max1 - Min1) / this.splitNumber,
            position: 'left',
            boundaryGap: ['20%', '20%'],
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
              fontSize: 12,
              formatter: '{value}人'
            }
          },
          {
            show: true,
            type: 'value',
            min: Min2,
            max: Max2,
            splitNumber: this.splitNumber,
            interval: (Max2 - Min2) / this.splitNumber,
            boundaryGap: ['10%', '10%'],
            position: 'right', // y轴在右侧
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
              fontSize: 12,
              formatter: '{value}次'
            }
          }
        ],
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
    // 创建chart实例
    initChart() {
      this.chart = echarts.init(this.$el, 'dark');
      this.setChartOption();
    },

    calMax(arr) {
      const max = Math.max(...arr);
      const maxInt = Math.ceil(max / 9.5); // 不让最高的值超过最上面的刻度
      const maxVal = maxInt * 10; // 让显示的刻度是整数
      return maxVal;
    },
    calMin(arr) {
      const min = Math.min(...arr);
      const minInt = Math.floor(min / 10);
      const minVal = minInt * 10; // 让显示的刻度是整数
      return minVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
