<template>
  <div style="width: 100%; height: 100%; position: relative">
    <!-- 地图 -->
    <div class="chart" ref="mapChart"></div>
    <!-- 海外 -->
    <div
      class="overseasBtn"
      :class="{
        showOverseas: isShowOverseas,
      }"
      @mouseenter="showOverseas"
      @mouseleave="displayOverseas"
    >
      海外
    </div>
    <!-- 海外悬浮框 -->
    <div v-show="isShowOverseas" class="toolTip overseas">
      <div class="tip-title">海外</div>
      <div class="tip-num">{{ overseas.value || 0 }}</div>
    </div>
    <!-- 遮罩层 -->
    <div v-if="highlight" class="mask"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import '@/utils/map/china';
import resize from '@/mixins/resize';

export default {
  name: 'MapChart',
  mixins: [resize],
  props: {
    dataset: {
      type: Array,
      required: true
    },
    linesMapData: {
      type: Array,
      required: true
    },
    highlight: {
      type: String,
      required: false,
      default: ''
    },
    bg: {
      type: String,
      required: false,
      default: '#4B2833'
    },
    color: {
      type: Array,
      required: false,
      default: () => {
        return ['#E10014', '#FE3287'];
      }
    }
  },
  data() {
    return {
      chart: null,
      time: null,
      timeIndex: 0,
      isShowOverseas: false,
      overseas: {
        name: '海外',
        value: null
      },
      mapData: [
        {
          name: '北京',
          value: 0
        },
        {
          name: '天津',
          value: 0
        },
        {
          name: '上海',
          value: 0
        },
        {
          name: '重庆',
          value: 0
        },
        {
          name: '河北',
          value: 0
        },
        {
          name: '河南',
          value: 0
        },
        {
          name: '云南',
          value: 0
        },
        {
          name: '辽宁',
          value: 0
        },
        {
          name: '黑龙江',
          value: 0
        },
        {
          name: '湖南',
          value: 0
        },
        {
          name: '安徽',
          value: 0
        },
        {
          name: '山东',
          value: 0
        },
        {
          name: '新疆',
          value: 0
        },
        {
          name: '江苏',
          value: 0
        },
        {
          name: '浙江',
          value: 0
        },
        {
          name: '江西',
          value: 0
        },
        {
          name: '湖北',
          value: 0
        },
        {
          name: '广西',
          value: 0
        },
        {
          name: '甘肃',
          value: 0
        },
        {
          name: '山西',
          value: 0
        },
        {
          name: '内蒙古',
          value: 0
        },
        {
          name: '陕西',
          value: 0
        },
        {
          name: '吉林',
          value: 0
        },
        {
          name: '福建',
          value: 0
        },
        {
          name: '贵州',
          value: 0
        },
        {
          name: '广东',
          value: 0
        },
        {
          name: '青海',
          value: 0
        },
        {
          name: '西藏',
          value: 0
        },
        {
          name: '四川',
          value: 0
        },
        {
          name: '宁夏',
          value: 0
        },
        {
          name: '海南',
          value: 0
        },
        {
          name: '台湾',
          value: 0
        },
        {
          name: '澳门',
          value: 0
        },
        {
          name: '香港',
          value: 0
        }
      ],
      hData: [],


      // 飞线数据======
      // 进行相关配置
      chinaGeoCoordMap: {
        北京: [116.6130, 40.368],
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        宜宾市: [104.630825, 28.760189],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891],
        台湾: [120.8648, 23.891],
        香港: [114.1648, 22.391],
        澳门: [113.5658, 22.14]
      }
    };
  },
  watch: {
    dataset: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.formatData();
          this.setChartOption();
          this.$nextTick(() => {

            this.loop();
          })
        }
      },
      deep: true
    }
    // highlight: {
    //   handler(newVal, oldVal) {
    //     // clearInterval(this.time);
    //     // this.time = null;
    //     if(newVal) {
    //       this.timeIndex = 0;
    //       this.$nextTick(() => {
    //         // this.showRegion(newVal);
    //         this.loop();
    //       })

    //     }


    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.formatData();
    this.initChart();
    this.$nextTick(() => {
      this.loop();
    });


  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.off('mouseout');
    this.chart.off('mouseover');
    this.chart.dispose();
    this.chart = null;
    clearInterval(this.time);
    this.time = null;
    this.timeIndex = 0;
  },
  methods: {
    // 飞线方法======
    // 可以根据你实际项目需求来添加你的数据。
    // 定义中心点和起始点，代码如下：
    convertData(data) {
      const res = [];
      for(let i = 0; i < data.length; i++) {
        const dataItem = data[i];
        // const fromCoord = this.chinaGeoCoordMap[dataItem[0].name];
        const fromCoord = this.chinaGeoCoordMap[dataItem.name];

        const toCoord = [103.5901, 36.3043];// 中心点地理坐标
        if(fromCoord && toCoord) {
          res.push([{
            coord: fromCoord,
            // value: dataItem[0].value
            value: dataItem.value
          }, {
            coord: toCoord
          }]);
        }
      }
      return res;
    },

    // 创建飞线======
    seriesFn() {
      // console.log(this.series, '====---===');
      const series = [];
      const _this = this;
      // [['甘肃', chinaDatas]].forEach(function(item, i) {
      // eslint-disable-next-line no-unexpected-multiline
      [['甘肃', this.linesMapData]].forEach(function(item, i) {
        // console.log(item, '====--00000--===', _this.convertData(item[1]));
        series.push(
          // 原始数据
          {
            name: 'mapSer',
            type: 'map',
            geoIndex: 0,
            selectedMode: false, // 取消选中状态
            label: {
              show: false
            },
            data: _this.mapData,
            zoom: 1.2
          },
          // 飞线
          {
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 4, // 箭头指向速度，值越小速度越快
              trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', // 箭头图标
              symbolSize: 5 // 图标大小
            },
            lineStyle: {
              normal: {
                width: 1, // 尾迹线条宽度
                opacity: 1, // 尾迹线条透明度
                curveness: 0.3 // 尾迹线条曲直度
              }
            },
            data: _this.convertData(item[1])
          },
          // 气泡
          {
            // 带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: { // 涟漪特效
              period: 4, // 动画时间，值越小速度越快
              brushType: 'stroke', // 波纹绘制方式 stroke, fill
              scale: 4 // 波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: 'right', // 显示位置
                offset: [5, 0], // 偏移设置
                formatter: function(params) { // 圆环显示文字
                  return params.data.name;
                },
                fontSize: 13
              },
              emphasis: {
                show: true
              }
            },
            symbol: 'circle',
            symbolSize: function(val) {
              return 5 + val[2] * 5; // 圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
                color: '#f00'
              }
            },
            data: item[1].map(function(dataItem) {
              // console.log(_this.chinaGeoCoordMap[dataItem.name], '===111===', [dataItem.value]);
              return {
                // 在这里定义你所要展示的数据
                // name: dataItem[0].name,
                name: dataItem.name,
                // value: this.chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                value: _this.chinaGeoCoordMap[dataItem.name].concat([dataItem.value])
              };
            })
          },
          // 中心点
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: 'stroke',
              scale: 4
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                // offset:[5, 0],
                color: '#0f0',
                formatter: '{b}',
                textStyle: {
                  color: '#0f0'
                }
              },
              emphasis: {
                show: true,
                color: '#f60'
              }
            },
            symbol: 'pin',
            symbolSize: 50,
            data: [{
              name: item[0],
              value: _this.chinaGeoCoordMap[item[0]].concat([10])
            }]
          }
        );
      });

      // console.log(series, '===series');

      return series
    },




    // 原始方法
    formatData() {
      // 重置地图数据、高亮地区
      this.mapData.forEach(item => item.value === 0);
      this.hData = [];
      for (let i = 0; i < this.mapData.length; i++) {
        const name = this.mapData[i].name;
        for (let j = 0; j < this.dataset.length; j++) {
          const newName = this.dataset[j].name;
          if (name.indexOf(newName) > -1 || newName.indexOf(name) > -1) {
            this.mapData[i].value = Number(this.dataset[j].value);
            if (this.mapData[i].value > 0) {
              this.hData.push({
                ...this.mapData[i],
                index: i
              });
            }
          }
        }
      }
      this.overseas = this.dataset.find((item) => {
        return item.name === this.filters.ThousandSeparator(this.overseas.name);
      }) || {
        name: '海外',
        value: null
      };
    },
    setChartOption() {
      this.chart.setOption(
        {
          backgroundColor: '#131c3c',
          tooltip: {
            trigger: 'item',
            className: 'tooltip',
            backgroundColor: 'rgba(255,255,255,0.10)',
            borderWidth: 1,
            borderColor: '#6E7175',
            padding: [10, 12],
            extraCssText:
              'border-radius: 8px 8px 2px 8px;backdrop-filter: blur(20px);z-index:8;',
            position: function (point) {
              return [point[0] - 60, point[1] - 70];
            },
            formatter: (params) => {
              if (params.name && params.name !== '南海诸岛') {
                const str = `
              <div class="" style="text-align: center;">
                <div style="margin-bottom: 0px;font-size: 12px;color: #ffffff">
                  ${params.name}
                </div>
                <div style="font-size: 20px;font-family: 'DIN';color: #ffffff;line-height:24px;">
                  ${this.filters.ThousandSeparator(params.data.value)}
                </div>
              </div>
              `;
                return str;
              }
            }
          },
          visualMap: {
            // type: 'piecewise',
            // // show: false,
            // pieces: [
            //   {
            //     value: 0,
            //     color: '#2c2c2e'
            //   },
            //   {
            //     min: 0,
            //     color: '#3BDC00'
            //   }
            // ],

            // 飞线数据======
            min: 0,
            max: 1,
            calculable: true,
            show: true,
            color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            roam: false, // 是否允许缩放和平移
            map: 'china',
            zoom: 1.2,
            selectedMode: false, // 取消选中状态
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              areaColor: '#3A3B3C',
              borderColor: '#56595C',
              borderWidth: 0.3,
              emphasis: {
                areaColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: this.color[0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: this.color[1] // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                },
                borderColor: 'rgba(0,0,0,0)'
              }

              // 飞线数据======
              // normal: {
              //   color: 'rgba(51, 69, 89, .5)', // 地图背景色
              //   borderColor: '#516a89', // 省市边界线00fcff 516a89
              //   borderWidth: 1
              // }
              // emphasis: {
              //   color: 'rgba(37, 43, 61, .5)' // 悬浮背景
              // }
            },
            regions: [
              {
                name: '南海诸岛',
                value: 0,
                itemStyle: {
                  normal: {
                    opacity: 0, // 不显示南海诸岛
                    label: {
                      show: false
                    }
                  }
                }
              }
            ],
            data: this.mapData

            // 飞线数据======
            // map: 'china',
            // zoom: 1.2,
            // label: {
            //   emphasis: {
            //     show: false
            //   }
            // },
            // roam: true // 是否允许缩放
            // itemStyle: {
            //   normal: {
            //     color: 'rgba(51, 69, 89, .5)', // 地图背景色
            //     borderColor: '#516a89', // 省市边界线00fcff 516a89
            //     borderWidth: 1
            //   },
            //   emphasis: {
            //     color: 'rgba(37, 43, 61, .5)' // 悬浮背景
            //   }
            // }
          },
          // series: [
          //   {
          //     name: 'mapSer',
          //     type: 'map',
          //     geoIndex: 0,
          //     selectedMode: false, // 取消选中状态
          //     label: {
          //       show: false
          //     },
          //     data: this.mapData,
          //     zoom: 1.2
          //   }
          // ]

          // 飞线数据======
          series: this.seriesFn()
        },
        true
      );
    },
    initChart() {
      this.chart = echarts.init(this.$refs.mapChart, 'dark');
      this.setChartOption();
    },
    // 循环高亮及其鼠标事件
    loop() {
      this.chart.off('mouseout');
      this.timeIndex = 0;
      // this.mapActive();
      // 延迟500ms开始循环
      setTimeout(this.mapActive, 200)
      this.chart.on('mouseout', (params) => {
        this.mapActive();
      });
      this.chart.on('mouseover', (params) => {
        this.stopActive(params.name);
      });
    },
    // 定时遍历循环高亮显示
    mapActive() {
      const dataLength = this.hData.length;
      this.isShowOverseas = false;
      clearInterval(this.time);
      this.time = null;
      // this.timeIndex = 0;
      // 如果传入的数组长度>=1条且没有传入高亮省市，则循环显示
      if(dataLength && !this.highlight) {
        this.time = setInterval(this.mapActiveFn(dataLength), 2000, dataLength);
      } else if(this.highlight) {
        // 若传入高亮省市，则说明是高亮某个城市，
        this.showRegion(this.highlight);
      }
    },
    // 循环高亮自身函数
    mapActiveFn(dataLength) {
      // const dataLength = this.hData.length;

      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      });
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.hData[this.timeIndex].index
      });
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this.hData[this.timeIndex].index
      });
      this.timeIndex++;
      if (this.timeIndex === dataLength) {
        this.timeIndex = 0;
      }

      return this.mapActiveFn;
    },
    stopActive(name) {
      // 停止所有的循环高亮
      this.isShowOverseas = false;
      clearInterval(this.time);
      this.time = null;
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      });
      this.chart.dispatchAction({
        type: 'hideTip',
        seriesIndex: 0
      });
      // 高亮选中的省份
      if (name === '海外') {
        // this.showOverseas();
        this.isShowOverseas = true;
      } else {
        this.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          name: name
        });
        this.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          name: name
        });
      }
    },
    showRegion(name) {
      let showName = '';
      if (name === '海外') {
        showName = name;
      } else {
        for (let i = 0; i < this.mapData.length; i++) {
          const _name = this.mapData[i].name;
          if (_name.indexOf(name) > -1 || name.indexOf(_name) > -1) {
            showName = _name;
          }
        }
      }
      this.stopActive(showName);
    },
    showOverseas() {
      this.isShowOverseas = true;
      this.stopActive('海外');
    },
    displayOverseas() {
      this.isShowOverseas = false;
      this.mapActive();
    }
  }
};
</script>

<style lang='scss' scoped>
.chart {
  width: 100%;
  height: 100%;
}
.overseasBtn {
  width: 39px;
  height: 24px;
  background: #2c2c2e;
  border: 1px solid #4d4d4d;
  border-radius: 4px;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  font-weight: bold;
  line-height: 24px;
  color: #999;
  text-align: center;
  cursor: pointer;
  z-index: 8;
  &:hover {
    background: #fa114f;
    color: #ffffff;
    border-color: #fa114f;
  }
}
.showOverseas {
  background: #fa114f;
  color: #ffffff;
  border-color: #fa114f;
}
.toolTip {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #6e7175;
  backdrop-filter: blur(20px);
  padding: 10px 12px;
  text-align: center;
  border-radius: 8px 8px 2px 8px;
  display: inline-block;
  position: absolute;

  &.JS {
    left: 50%;
    top: 35%;
  }
  &.overseas {
    right: 40px;
    bottom: 25px;
  }
  & .tip-title {
    margin-bottom: 5px;
    font-size: 12px;
    color: #ffffff;
  }
  & .tip-num {
    font-size: 20px;
    font-family: "DIN";
    color: #fff;
  }
}
.mask {
  width: 100%;
  height: calc(100% + 1px);
  position: absolute;
  top: 0;
  z-index: 8;
  background: rgba(0, 0, 0, 0);
}
</style>
