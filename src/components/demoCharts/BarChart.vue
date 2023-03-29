<template>
  <div class="chart" />
</template>

<script>
import * as echarts from 'echarts';
// import 'echarts/lib/chart/bar'
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
        return [['#00FBCF', '#00BAE1']];
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
      unit: '',
      showLegend: false,
      bottom: 0,
      // 阴影颜色
      shadowColor: [],
      // 坐标轴高亮颜色
      labelColor: '#0A84FE'
    };
  },
  computed: {
    changeData() {
      const { dataset, colorArr, xFont } = this;
      return {
        dataset, colorArr, xFont
      }
    }
  },
  watch: {
    changeData: {
      handler(newVal, oldVal) {
        this.watchProps(newVal, oldVal)
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
      return str
    },
    formatData() {
      this.seriesData = [];
      if (this.dataset.unit) {
        this.unit = this.dataset.unit;
      }
      if (this.dataset.colorList) {
        this.colorList = this.dataset.colorList;
      }
      if (this.dataset.legend) {
        this.showLegend = this.dataset.legend;
        this.bottom = 0;
      }
      this.colorList.forEach(item => {
        // const _item = this.colorHex(item[1]);
        this.shadowColor.push(this.colorHex(item[1]));
      })
      // 修改坐标轴高亮颜色
      if(this.colorList.length === 1) {
        this.labelColor = this.colorList[0][1];
      } else {
        this.labelColor = '#0A84FE';
      }
      const list = this.dataset.datas;
      if (list.length > 0) {
        list.forEach((item, index) => {
          this.seriesData.push({
            name: item.name,
            type: 'bar',
            data: item.data,
            // 控制柱状图柱子最大宽度
            barMaxWidth: this.dataset.barWidth,
            // 柱子间距
            barGap: '42%',
            markLine: {
              data: [{ type: 'max', name: 'Avg' }]
            },
            itemStyle: {
              borderRadius: 4,
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
            },
            emphasis: {
              focus: 'series'
              // itemStyle: {
              //   shadowOffsetX: 0,
              //   shadowOffsetY: 4,
              //   opacity: 1,
              //   shadowBlur: 12,
              //   shadowColor: this.shadowColor[index]
              // }
            },
            animationDelay: function (idx) {
              return idx * 10;
            }
          });
        });
      }
    },
    setChartOption() {
      this.chart.setOption({
        // 图表背景
        backgroundColor: '#131c3c',
        // 图例
        legend: {
          show: this.showLegend,
          top: 0,
          right: 0,
          orient: 'horizontal',
          icon: 'circle',
          itemWidth: 10,
          itemGap: 20,
          textStyle: {
            color: '#999999',
            fontSize: 12
          }
        },
        // 鼠标移入
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            snap: true,
            // label: {
            //   show: true,
            //   backgroundColor: '#242526',
            //   color: this.labelColor,
            //   fontSize: this.xFont,
            //   fontWeight: 600,
            //   padding: [5, 0, 0, 0]
            // },
            shadowStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#BEDDFF36' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#95C8FF00' // 100% 处的颜色
                }]
              }
            }
          },
          className: 'tooltip',
          // backgroundColor: 'rgba(255,255,255,0.10)',
          // borderBottomColor: '#6E7175',
          // borderRight: 1,
          borderRadius: 0,
          padding: [8, 12],
          textStyle: {
            fontSize: 12,
            fontFamily: 'DIN',
            color: '#fff'
          },
          // 自定义样式
          extraCssText: 'border-left: 2px solid #2c9df5;background: repeating-linear-gradient(to right, #2C9DF596, #1f7fcd48, #1f7fcd00);'
          // extraCssText: 'backdrop-filter: blur(20px); border-right: 1px;'
          // formatter: (params) => {
          //   // 获取标题
          //   const index = params[0].dataIndex;
          //   let titleStr = '';
          //   if(this.dataset.title && this.dataset.title.length > 0) {
          //     titleStr = `
          //       <div  class="tooltip-title2" style="margin-bottom: 0px;">
          //         ${this.dataset.title[index]}
          //       </div>
          //     `
          //   }

          //   let str = '';
          //   if (params.length === 1) {
          //     str = `<div>${this.filters.ThousandSeparator(
          //       params[0].data
          //     )}</div>`;
          //   } else {
          //     for (let i = 0; i < params.length; i++) {
          //       let borderWidth = 1;
          //       let padding = 'padding: 0 12px';
          //       if (i === params.length - 1) {
          //         borderWidth = 0;
          //         padding = 'padding: 0 0 0 12px';
          //       } else if (i === 0) {
          //         padding = 'padding: 0 12px 0 0';
          //       }
          //       str += `<div style="float: left;text-align: center;border-right: ${borderWidth}px solid #56595C;${padding};">
          //           <div style="font-size: 12px;color: #ffffff;padding: 0;line-height: 17px;">${
          //             params[i].seriesName
          //           }</div>
          //           <div style="margin-bottom: 0px;font-size: 20px;font-family: 'DIN';color: #ffffff;line-height:24px;">${this.filters.ThousandSeparator(
          //             params[i].data
          //           )}</div>
          //         </div>`;
          //     }
          //   }

          //   const result = `
          //     ${titleStr}
          //     <div class="tooltip-wrapper">${str}</div>
          //   `;

          //   return result;
          // }
        },
        grid: {
          top: '38px',
          right: '0',
          bottom: this.bottom,
          left: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
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
            data: this.dataset.xAxisLabel
          }
        ],
        yAxis: {
          show: true,
          type: 'value',
          // Y轴移入
          axisPointer: {
            value: '0',
            snap: true,
            triggerTooltip: false,
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
            // 左侧标签
            label: {
              show: true,
              formatter: function (params) {
                // console.log(params, '====');
                return params.value;
              },
              // backgroundColor: '#3895E000'
              backgroundColor: '#721B729C'
            },
            handle: {
              show: true,
              color: '#5CB6FF',
              size: 0
            }
          },
          min: 0,
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
            fontSize: 12
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: this.dataset.end
          }
        ],
        // 动画
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
        series: this.seriesData
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'dark');
      this.setChartOption();
    }

    // 图表数据根据数据量展示处理
    // dataListShow(value) {
    //   if (value.length <= 10) {
    //     // 10条数据以内全部显示
    //     let data = {
    //       end: 100
    //     }
    //     return data
    //   } else if (value.length <= 20) {
    //     // 20条数据以内显示一半
    //     let data = {
    //       end: 50
    //     }
    //     return data
    //   } else if (value.length <= 30){
    //     // 大于20条数据，显示7条数据,最多显示21条数据
    //     let data = {
    //       end: 30
    //     }
    //     return data
    //   } else if (value.length <= 60) {
    //     // 大于20条数据，显示7条数据,最多显示21条数据
    //     let data = {
    //       end: 20
    //     }
    //     return data
    //   } else {
    //     // 大于20条数据，显示7条数据,最多显示21条数据
    //     let data = {
    //       end: 10
    //     }
    //     return data
    //   }
    // }
  }
};
</script>

<style lang='scss' scoped>
.chart {
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: #131c3c;
}
</style>
