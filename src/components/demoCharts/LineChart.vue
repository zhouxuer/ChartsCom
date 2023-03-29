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
      currentIndex: -1
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
          areaStyle = {
            // 区域渐变
            // color: this.color[index],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: this.color[index]
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
            // className: 'tooltip',
            // backgroundColor: 'rgba(255,255,255,0.10)',
            // borderColor: '#6E7175',
            // borderWidth: 1,
            // borderRadius: 8,
            // padding: [12, 20],
            // textStyle: {
            //   fontSize: 12,
            //   color: '#ffffff'
            // },
            // extraCssText: 'backdrop-filter: blur(20px);z-index: 3;'
            // position: (pos, params, dom, rect, size) => {
            //   if (this.dataset.tooltip == "right") {
            //     return [pos[0] + 30, "10%"];
            //   } else {
            //     var obj = { top: 0 };
            //     // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = pos[0];
            //     if (pos[0] > (size.viewSize[0] / 4) * 3) {
            //       //鼠标位置大于屏幕宽度4分之三
            //       obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] =
            //         (pos[0] / 8) * 6 - 100;
            //     } else if (
            //       pos[0] >= size.viewSize[0] / 2 &&
            //       pos[0] < (size.viewSize[0] / 4) * 3
            //     ) {
            //       //largethan equals one half and less than 3/4
            //       obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] =
            //         (pos[0] / 8) * 5 - 100;
            //     } else {
            //       obj[["left", "right"][+(pos[0] > size.viewSize[0] / 2)]] =
            //         pos[0] + 100;
            //     }
            //     return obj;
            //   }
            // },
            // formatter: (params) => {
            //   let str = '';
            //   // 获取标题
            //   const index = params[0].dataIndex;
            //   let titleStr = '';
            //   if (this.dataset.title && this.dataset.title.length > 0) {
            //     titleStr = `
            //     <div class="tooltip-title">
            //       ${this.dataset.title[index]}
            //     </div>
            //   `;
            //   }
            //   // 拼接每项数据
            //   params.forEach((ele) => {
            //     if (ele.seriesName) {
            //       let _data = 0;
            //       let _unit = '';
            //       if (ele.data >= 10000) {
            //         _data = this.filters.isTenThousand(ele.data);
            //         _unit = 'W';
            //       } else {
            //         _data = ele.data;
            //       }
            //       let itemValue = '';
            //       if (this.money) {
            //         _data = _data.toFixed(2);
            //         itemValue = `￥${this.filters.ThousandSeparator(
            //           _data
            //         )}${_unit}`;
            //       } else {
            //         itemValue = `${this.filters.ThousandSeparator(
            //           _data
            //         )}${_unit}${this.unit}`;
            //       }
            //       if (this.formatterType === 'flex') {
            //         str += `
            //       <div class="line-tooltip-wrapper">
            //         <i style="width: 4px;height: 4px;display: inline-block;background: ${ele.color};border-radius: 50%;position: absolute;top: 10px;"></i>
            //         <div class="text-label"><span>${ele.seriesName}</span></div>
            //         <span class="text-value">${itemValue}</span>
            //       </div>
            //     `;
            //       } else if (this.formatterType === 'float') {
            //         str += `
            //         <div style="display: flex;margin:8px 0;justify-content:space-between">
            //           <div style="display:flex;width:auto;align-items:center;">
            //             <i style="width: 4px;height: 4px;display: inline-block;background: ${ele.color};border-radius: 50%;margin-right:6px"></i>
            //             <span>${ele.seriesName}</span>
            //           </div>
            //           <div style="width: auto">
            //             <span>${itemValue}</span>
            //           </div>
            //         </div>
            //         `;
            //       }
            //     }
            //   });
            //   let chartStyle = '';
            //   if (this.width) chartStyle = 'width:' + this.width + ';';

            //   if (this.formatterType !== 'grid') {
            //     const b = `
            //       ${titleStr}
            //       <div class="line-t-wrapper ${
            //         this.orients === 'vertical' ? 'vertical' : ''
            //       }" style='${chartStyle}' >
            //         ${str}
            //       </div>
            //     `;
            //     return b;
            //   } else {
            //     let list = []; // 爱加健康分类
            //     let list1 = []; // 随身行分类
            //     let string = null;
            //     let string1 = null;
            //     // let list2 = [];
            //     params.forEach((ele) => {
            //       if (ele.name) {
            //         let _data = 0;
            //         let _unit = '';
            //         if (ele.data >= 10000) {
            //           _data = this.filters.isTenThousand(ele.data);
            //           _unit = 'W';
            //         } else {
            //           _data = ele.data;
            //         }
            //         // const item_Value = '';
            //         if (this.money) {
            //           _data = _data.toFixed(2);
            //           ele.itemValue = `￥${this.filters.ThousandSeparator(
            //             _data
            //           )}${_unit}`;
            //         } else {
            //           ele.itemValue = `${this.filters.ThousandSeparator(
            //             _data
            //           )}${_unit}${this.unit}`;
            //         }

            //         if (!this.isGMV) {
            //           if (ele.seriesName.indexOf('爱加健康') !== -1) {
            //             list.push(ele);
            //           } else if (ele.seriesName.indexOf('随身行') !== -1) {
            //             list1.push(ele);
            //           }
            //         }
            //       }
            //     });
            //     if (this.isGMV) {
            //       list = params.splice(0, 5)
            //       list1 = params.splice(0, 5)
            //     }
            //     if (list.length > 0) {
            //       string = `
            //       ${list
            //         .map((ele) => {
            //           return `
            //         <div style="display: flex;margin:8px 0;justify-content:space-between;width:200px">
            //           <div style="display:flex;width:auto;align-items:center;">
            //             <i
            //               style="width: 4px;height: 4px;display: inline-block;background: ${ele.color};border-radius: 50%;margin-right:6px"></i>
            //             <span>${ele.seriesName}</span>
            //           </div>
            //           <div style="width: auto">
            //             <span>${ele.item_value}</span>
            //           </div>
            //         </div>
            //           `;
            //         })
            //         .join('')}
            //                       `;
            //     }
            //     if (list1.length > 0) {
            //       string1 = `
            //       ${list1
            //         .map((ele) => {
            //           return `
            //         <div style="display: flex;margin:8px 0;justify-content:space-between;width:200px">
            //           <div style="display:flex;width:auto;align-items:center;">
            //             <i
            //               style="width: 4px;height: 4px;display: inline-block;background: ${ele.color};border-radius: 50%;margin-right:6px"></i>
            //             <span>${ele.seriesName}</span>
            //           </div>
            //           <div style="width: auto">
            //             <span>${ele.item_value}</span>
            //           </div>
            //         </div>
            //           `;
            //         })
            //         .join('')}
            //                       `;
            //     }
            //     const b = `
            //       ${titleStr}
            //       <div style="display: flex;margin:8px 0;">
            //       ${
            //         string == null
            //           ? ''
            //           : `
            //       <div>
            //           ${string}
            //       </div>`
            //       }
            //       ${
            //         string1 == null
            //           ? ''
            //           : `
            //       <div style="margin-left: 20px">
            //           ${string1}
            //         </div>`
            //       }
            //       </div>
            //     `;
            //     return b;
            //   }
            // }
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
              color: '#B0B3B8',
              fontSize: 12
            },
            splitLine: {
              show: true, // 显示纵向网格线
              lineStyle: {
                color: '#3E4042',
                type: 'solid'
              }
            }
          },
          yAxis: {
            type: 'value',
            offset: '20',
            axisLine: {
              show: false
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
