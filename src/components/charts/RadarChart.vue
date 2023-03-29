<template>
  <div class="chart" />
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'RadarChart',
  mixins: [resize],
  props: ['dataset'],
  data() {
    return {
      colorList: ['#FA114F', '#BF5AF2', '#FFE620', '#3AE9E6', '#A6FE00'],
      max: null,
      seriesData: [],
      virtualArr: [],
      indicator: [],
      length: null,
      arr: [] // 占位空数组
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
      this.max = Math.max(...this.dataset.data) * 1.2; // 最大值再加10%，使之始终不会满格
      // 创建一个数组，存储每层雷达图的数组
      this.length = this.dataset.data.length;
      this.dataset.data.forEach((item, index) => {
        this.arr[index] = '';
        this.virtualArr[index] = [];
        for (let i = 0; i < this.length; i++) {
          this.virtualArr[index][i] = '';
          if (i === index) {
            this.virtualArr[index][i] = item;
          }
        }
      });

      // 绘制总的图形 坐标系组件
      this.indicator = this.dataset.labelArr.map((item, index) => {
        return {
          name: index === 0 ? `{a|${item}}` : item,
          max: this.max,
          color: '#B0B3B8'
        };
      });

      this.setSeriesData();
    },
    //  设置每一层的雷达
    setSeriesData() {
      this.seriesData = [
        {
          // 绘制总的图形不设置拐点
          type: 'radar',
          radaIndex: 0,
          data: [
            {
              value: this.dataset.data,
              symbolSize: 10,
              lineStyle: {
                color: '#B0B3B8'
              },
              areaStyle: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          ],
          itemStyle: {
            color: '#ffffff'
          },
          tooltip: {
            show: false // 不显示总的tooltip，只显示各个点的
          },
          z: 1 // 图层是一层一层叠加，所以这个也是一级一级递增
        }
      ];

      for (let i = 0; i < this.length; i++) {
        this.seriesData.push({
          type: 'radar',
          radarIndex: 0,
          symbolSize: 8,
          name: this.dataset.labelArr[i],
          z: i + 2,
          data: [
            {
              value: this.virtualArr[i]
            }
          ],
          itemStyle: {
            color: this.colorList[i],
            borderWidth: 0
          },
          lineStyle: {
            width: 0,
            labelLine: {
              show: false
            }
          },
          emphasis: {
            itemStyle: {
              borderWidth: 1,
              borderColor: this.colorList[i]
            }
          },
          tooltip: {
            show: true,
            trigger: 'item',
            className: 'tooltip',
            backgroundColor: 'rgba(255,255,255,0.10)',
            borderColor: '#6E7175',
            borderWidth: 1,
            borderRadius: 8,
            padding: [9, 15],
            textStyle: {
              fontFamily: 'DIN',
              fontSize: 20,
              color: '#ffffff'
            },
            extraCssText: 'backdrop-filter: blur(20px);',
            formatter: (params) => {
              return `${this.filters.ThousandSeparator(
                params.value[i].toString()
              )}`;
            }
          }
        });
      }
      // 这个图层是为了盖住圆心，如果去掉，圆心的颜色为最后一个图层的颜色
      this.seriesData.push({
        type: 'radar',
        radarIndex: 0,
        name: '',
        z: this.length + 2,
        data: [
          {
            value: this.arr,
            symbolSize: 12
          }
        ],
        itemStyle: {
          color: '#3E4042'
        },
        lineStyle: {
          width: 0,
          labelLine: {
            show: false
          }
        },
        tooltip: {
          show: false
        }
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'dark');
      const options = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tooltip: {
          show: true
        },
        radar: {
          indicator: this.indicator, // 坐标系组件
          radius: '100%',
          nameGap: 5, // 指示器名称和指示器轴的距离
          center: ['50%', '50%'],
          splitNumber: 4, // 圈数
          startAngle: 90, // 起始角度 90为正上方
          shape: 'circle',
          name: {
            // color: '#999',
            fontSize: 12,
            rich: {
              a: {
                padding: [0, 100, -30, 0],
                color: '#B0B3B8'
              },
              hover: {
                color: '#FA114F'
              }
            }
          },

          triggerEvent: true, // 响应鼠标事件
          tooltip: {
            show: true,
            trigger: 'item',
            className: 'tooltip',
            backgroundColor: 'rgba(255,255,255,0.10)',
            borderColor: 'rgba(255,255,255,0.20)',
            borderWidth: 1,
            borderRadius: 8,
            padding: [9, 15],
            textStyle: {
              fontFamily: 'DIN',
              fontSize: 20,
              color: '#ffffff'
            },
            extraCssText: 'backdrop-filter: blur(20px);',
            formatter: (params) => {
              let str;
              this.dataset.labelArr.forEach((item, index) => {
                if (
                  item.indexOf(params.name) >= 0 ||
                  params.name.indexOf(item) >= 0
                ) {
                  str = `<div>${this.filters.ThousandSeparator(
                    this.dataset.data[index].toString()
                  )}</div>`;
                }
              });
              return str;
            }
          },
          splitArea: {
            areaStyle: {
              color: 'none'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#3E4042'
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#3E4042', '#3E4042', '#3E4042', '#3E4042', 'rgba(0,0,0,0)'] // 每层网格的颜色
            }
          }
        },
        series: this.seriesData
      };
      this.chart.setOption(options);
      this.chart.on('mouseover', (params) => {
        if (params.componentIndex === 0 && params.name) {
          this.dataset.labelArr.forEach((item, index) => {
            if (
              item.indexOf(params.name) >= 0 ||
              params.name.indexOf(item) >= 0
            ) {
              this.chart.dispatchAction({
                // 点高亮
                type: 'highlight',
                seriesIndex: index + 1
              });
              // options.radar.indicator[index].color = '#000'
              // console.log(options.radar.indicator[index].color)
            }
          });
        }
      });
      this.chart.on('mouseout', (params) => {
        if (params.componentIndex === 0 && params.name) {
          this.dataset.labelArr.forEach((item, index) => {
            if (
              item.indexOf(params.name) >= 0 ||
              params.name.indexOf(item) >= 0
            ) {
              this.chart.dispatchAction({
                // 点还原
                type: 'downplay',
                seriesIndex: index + 1
              });
            }
          });
        }
      });
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
