<template>
  <div style="width: 100%; height: 100%; position: relative">
    <my-chart-map
      class="chart"
      debug
      :data="data"
      :register="register"
      map="china"
      :settings="settings"
      :extend="extend"
    ></my-chart-map>
  </div>
</template>

<script>
import china from '$ui/charts/geo/china.json';
import resize from '@/mixins/resize';

  const area = {
    columns: ['省份', '面积'],
    rows: [
      ['广东', 100],
      ['北京', 60],
      ['广西', 78],
      ['湖南', 90],
      ['湖北', 110],
      ['福建', 87],
      ['新疆', 90],
      ['贵州', 75],
      ['江苏', 63],
      ['山西', 80],
      ['山东', 90],
      ['黑龙江', 105]
    ]
  }

  const scatter = {
    columns: ['省份', '人口'],
    rows: [
      ['广东', 1],
      ['湖南', 1],
      ['贵州', 1],
      ['新疆', 1],
      ['西藏', 1]
    ]
  }

  const effectScatter = {
    columns: ['省份', '首都'],
    rows: [
      ['北京', 2]
    ]
  }

  const lines = {
    columns: ['路线', '航线'],
    rows: [
      ['广东->北京', ['广东', '北京']],
      ['湖南->北京', ['湖南', '北京']],
      ['贵州->北京', ['贵州', '北京']],
      ['新疆->北京', ['新疆', '北京']],
      ['西藏->北京', ['西藏', '北京']]
    ]
  }

  export default {
    name: 'MapChart2',
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
        register: china,
        data: [area, scatter, effectScatter, lines],
        settings: {
          type: {
            面积: 'map',
            航线: 'lines',
            人口: 'scatter',
            首都: 'effectScatter'
          }
        },
        extend: {
          'series.1.itemStyle': {
            color: 'blue'
          },
          'series.2.itemStyle': {
            color: 'red'
          },
          'series.2.symbolSize': 20,
          'series.3.lineStyle': {
            color: 'green',
            width: 2,
            curveness: 0.4
          },
          'series.3.effect': {
            show: true,
            period: 4, // 箭头指向速度，值越小速度越快
            trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', // 箭头图标
            symbolSize: 5 // 图标大小
          }
        }
      }
    }
  }

</script>

<style lang='scss' scoped>
.chart {
  width: 100% !important;
  height: 100% !important;
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
