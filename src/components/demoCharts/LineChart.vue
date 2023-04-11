<template>
  <div class="chart" />
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'LineChart',
  mixins: [resize],
  props: {
    dataset: {
      type: Object,
      required: true
    },
    color: {
      type: Array,
      required: false,
      default: () => {
        return [
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
        ];
      }
    },
    // 是否开启区域面积渐变
    isArea: {
      type: Boolean,
      required: false,
      default: false
    },
    orient: {
      type: String,
      required: false,
      default: 'horizontal'
    },
    unit: {
      type: String,
      required: false,
      default: ''
    },
    money: {
      type: Boolean,
      required: false,
      default: false
    },
    right: {
      type: String,
      required: false,
      default: '4%'
    },
    width: {
      type: String,
      required: false,
      default: ''
    },
    formatterType: {
      type: String,
      require: false,
      default: 'flex'
    },
    isGMV: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data() {
    return {
      chart: null,
      data: [],
      seriesData: [],
      showLegend: false,
      bottom: 0,
      legendData: [],
      orients: '',
      maxData: 0,


      cityMap: null, // 这个属性 保存实例变量
      currentIndex: -1,
      timer: null
    };
  },
  computed: {
    changeData() {
      const { dataset, color, isArea, orient, unit, money, right } = this;
      return {
        dataset,
        color,
        isArea,
        orient,
        unit,
        money,
        right
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
      if (this.dataset.data.length > 0) {
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
      this.orients = this.dataset.data.length === 1 ? 'vertical' : this.orient;
      this.seriesData = [];
      this.legendData = [];
      if (this.dataset.legend) {
        this.showLegend = this.dataset.legend;
        if (this.isGMV && this.formatterType !== 'float') {
          this.bottom = 70
        } else {
          this.bottom = 10;
        }
      }
      this.dataset.data.forEach((item, index) => {
        let areaStyle = null;
        // 折线区域面积图配置
        if (this.isArea || this.dataset.data.length <= 3) {
          areaStyle = { // 曲线阴影
            // 区域渐变
            // color: this.color[index],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: this.color[index] // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#3895E000'
              }
            ]),
            opacity: 0.2 // 渐变透明度
            // 折线阴影部分
            // shadowBlur: 10,
            // shadowColor: this.color[index]
          };
        }
        this.legendData.push(item.name);
        const _item = {
          ...item,
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 8,
          color: this.color[index],
          lineStyle: {
            shadowColor: this.color[index]
          },
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 1
          },
          areaStyle,
          emphasis: {
            focus: 'series'
          }
        };
        this.seriesData.push(_item);
      });
    },
    setChartOption() {
      this.chart.setOption(
        {
          // 图表背景
          backgroundColor: '#131c3c',
          // legend: {
          //   data: this.legendData,
          //   show: this.showLegend,
          //   bottom: -5,
          //   orient: 'horizontal',
          //   icon: 'circle',
          //   itemWidth: 4,
          //   itemGap: 20,
          //   itemStyle: {
          //     borderWidth: 0
          //   },
          //   textStyle: {
          //     color: '#B0B3B8',
          //     fontSize: 12
          //   }
          // },
          tooltip: {
            className: 'tooltip',
            borderRadius: 0,
            padding: [8, 12],
            textStyle: {
              fontSize: 12,
              fontFamily: 'DIN',
              color: '#fff'
            },
            // 自定义样式
            extraCssText: 'border-left: 2px solid #2c9df5;background: repeating-linear-gradient(to right, #2C9DF596, #1f7fcd48, #1f7fcd00);',
            trigger: 'axis',
            confine: true,
            axisPointer: {
              value: '01-01',
              snap: true,
              z: 1,
              // triggerTooltip: false,
              // type: 'line',
              // 线样式
              lineStyle: {
                color: '#721B729C',
                width: 2,
                type: 'solid',
                cap: 'butt',
                join: 'miter',
                miterLimit: 10
              },
              // 底部标签
              label: {
                show: true,
                formatter: function (params) {
                  // console.log(params, '====');
                  return params.value;
                },
                backgroundColor: '#2c5b8e'
              },
              handle: {
                show: true,
                color: '#5CB6FF',
                size: 0
              }
            }
          },
          grid: {
            left: '20',
            right: this.right,
            top: '24px',
            containLabel: true,
            bottom: this.bottom
          },
          symbolSize: 4,
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 1
          },
          lineStyle: {
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
            shadowBlur: 12,
            width: 2
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dataset.date,
            axisLine: {
              lineStyle: {
                color: '#236bb8'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              // 始终显示最小和最大的刻度
              showMinLabel: true,
              showMaxLabel: true,
              color: '#B0B3B8',
              fontSize: 12
            },
            splitLine: {
              show: false, // 显示纵向网格线
              lineStyle: {
                color: '#3E4042',
                type: 'solid'
              }
            }
          },
          yAxis: {
            type: 'value',
            offset: '0',
            axisLine: {
              // show: true
              lineStyle: {
                color: '#236bb8'
              }
            },
            axisTick: {
              show: false // 不显示刻度线
            },
            axisLabel: {
              showMinLabel: true,
              showMaxLabel: true,
              color: '#B0B3B8',
              fontSize: 12,
              formatter: '{value}' + this.unit
            },
            splitLine: {
              show: true, // 显示横向网格线
              lineStyle: {
                color: '#3E4042',
                type: 'dashed'
              }
            }
          },
          series: this.seriesData
        },
        true
      );
    },

    autoShow(length) {
      // 自动切换定时器， 自动切换项
      // let nows = -1
      // let currentIndex = -1;
      // console.log('length >>> ' + length)
      // nows = (nows + 1) % length;
      // this.chart.dispatchAction({
      //     type: 'showTip',
      //     seriesIndex: 1,
      //     dataIndex: nows
      // });

      // 取消之前高亮的图形
      if (this.chart) {
        this.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        });

        this.currentIndex = (this.currentIndex + 1) % length;

        // 高亮当前图形
        this.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        });
        // 显示 tooltip
        this.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        });
      }
      // 显示 tooltip
      // this.chart.dispatchAction({
      //   type: 'showTip',
      //   seriesIndex: 0,
      //   dataIndex: this.currentIndex
      // });
    },
    // 启动自动
    initAutoShow() {
      let timer = null
      // 每隔2秒钟自动切换到下一个数据
      this.autoShow(this.dataset.date.length);
      clearInterval(timer);
      timer = setInterval(() => {
        this.autoShow(this.dataset.date.length);
      }, 2000);
    },



    initChart() {
      // if (this.chart) {
      //   this.chart.dispose();
      //   this.chart = null;
      // }
      this.chart = echarts.init(this.$el, 'dark');
      this.setChartOption();

      // 启动自动
      this.initAutoShow();
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
