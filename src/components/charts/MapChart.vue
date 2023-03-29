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
      data: [
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
      hData: []
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
    //   deep: true,
    // },
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
    formatData() {
      // 重置地图数据、高亮地区
      this.data.forEach(item => item.value === 0);
      this.hData = [];
      for (let i = 0; i < this.data.length; i++) {
        const name = this.data[i].name;
        for (let j = 0; j < this.dataset.length; j++) {
          const newName = this.dataset[j].name;
          if (name.indexOf(newName) > -1 || newName.indexOf(name) > -1) {
            this.data[i].value = Number(this.dataset[j].value);
            if (this.data[i].value > 0) {
              this.hData.push({
                ...this.data[i],
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
          backgroundColor: 'rgba(0, 0, 0, 0)',
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
            type: 'piecewise',
            show: false,
            pieces: [
              {
                value: 0,
                color: '#2c2c2e'
              },
              {
                min: 0,
                color: this.bg
              }
            ]
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
            data: this.data
          },
          series: [
            {
              name: 'mapSer',
              type: 'map',
              geoIndex: 0,
              selectedMode: false, // 取消选中状态
              label: {
                show: false
              },
              data: this.data,
              zoom: 1.2
            }
          ]
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
        for (let i = 0; i < this.data.length; i++) {
          const _name = this.data[i].name;
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
