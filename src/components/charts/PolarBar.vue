<template>
  <div class="chart-wraaper">
    <!-- echarts -->
    <div class="chart" ref="polarBar"></div>
    <!-- 图例 -->
    <ul
      class="legend"
      v-if="legendData.length"
      :style="{ top: legendTop, left: legendLeft }"
    >
      <li
        v-for="(item, index) in dataset.dataArr"
        :key="index"
        :style="{ 'margin-bottom': dataset.space || '6px' }"
        :class="{ active: currentIndex === index }"
        @mouseover.prevent="overLegend(index)"
        @mouseout.prevent="outLegend(index)"
      >
        <span
          class="mark"
          :style="{
            'background-color': colorList[colorList.length - 1 - index],
          }"
        ></span>
        <span class="text-box">
          <span class="name">{{ `${legendData[index].name} ${item}` }}</span>
          <span class="number">{{ legendData[index].number }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/mixins/resize';

export default {
  name: 'PolarBar',
  mixins: [resize],
  props: {
    // echarts 图表所需数据
    dataset: {
      type: Object,
      required: true,
      default: () => {
        return {
          title: '', // 图形中间标题文本
          // radius: ["150px", "70px"], // 图表大小
          radius: ['50%', '50%'],
          space: '6px', // 图例垂直间隔距离
          dataArr: [], // 数据数组
          nameArr: [] // 数据对应的lable
        };
      }
    },
    // 数据对应的颜色样式
    colorArr: {
      type: Array,
      default: () => {
        return ['#FA114F', '#A6FE00', '#00B7FF', '#BF5AF2'];
      }
    },
    // 图形背景底色
    backgroundColor: {
      type: String,
      default: '#1C1D1F'
    },
    // 中间文本垂直位置
    top: {
      type: [String, Number],
      default: '43%'
    },
    // 图例垂直位置
    legendTop: {
      type: String,
      default: '218px'
    },
    // 图例水平位置
    legendLeft: {
      type: String,
      default: '53%'
    },
    // 起始角度
    startAngle: {
      type: Number,
      default: 270
    }
  },
  data() {
    return {
      // 图表实例
      chart: null,
      // 总数
      sumValue: '',
      // 图例数据
      legendData: [],
      // 图表系列数据
      seriesData: [],
      // 当前hover项的index
      currentIndex: '',
      // 当前图例使用的颜色列表
      colorList: [],
      // 存储所有数字数据
      datas: []
    };
  },
  // 利用 计算属性 配合 watch 的深度监听  实现同时监听多个属性
  computed: {
    watchList() {
      const {
        dataset,
        colorArr,
        backgroundColor,
        top,
        legendTop,
        legendLeft,
        startAngle
      } = this;
      return {
        dataset,
        colorArr,
        backgroundColor,
        top,
        legendTop,
        legendLeft,
        startAngle
      };
    }
  },
  created() {
    this.colorList = [...this.colorArr];
    this.colorList.length = this.dataset.dataArr.length;
  },
  watch: {
    // 监听传入的参数变化之后重新计算渲染 -- 同时监听多个属性
    watchList: {
      handler(newVal) {
        this.watchProps(newVal);
      },
      deep: true
    }
  },
  mounted() {
    if (this.dataset.dataArr.length) {
      this.datas = this.dataset.dataArr.map((item) => {
        return Number(item);
      });
      this.sumValue = this.datas.reduce((total, item) => total + item);
    }
    this.formatData();
    this.$nextTick(() => {
      this.initChart();
      this.eConsole();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    // 注销事件和echarts实例
    this.chart.off('mouseover');
    this.chart.off('mouseout');
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    // 监听的属性变化之后的处理函数
    watchProps(newVal) {
      this.datas = [];
      this.colorList = [...this.colorArr];
      this.colorList.length = this.dataset.dataArr.length;
      this.datas = this.dataset.dataArr.map((item) => {
        return Number(item);
      });
      this.sumValue = this.datas.reduce((total, item) => total + item);
      this.formatData();
      if (this.chart && newVal) {
        this.chart.setOption(this.initData(), true);
      } else {
        this.initChart();
        this.eConsole();
      }
    },

    // 准备数据
    formatData() {
      this.legendData = [];
      this.seriesData = [];
      for (let i = 0; i < this.dataset.dataArr.length; i++) {
        // 生成自定义图例数据
        const number = ((this.dataset.dataArr[i] / this.sumValue) * 100).toFixed(
          2
        );
        const name = this.dataset.nameArr[i];
        this.legendData.unshift({ name, number: `${number}%` });

        // 生成图表系列数据
        const dataList = new Array(this.dataset.dataArr.length);
        dataList[i] = this.dataset.dataArr[i];
        this.seriesData.push({
          type: 'bar',
          barWidth: '8px',
          data: dataList,
          coordinateSystem: 'polar', // 选择坐标系为极坐标系
          name: this.dataset.nameArr[i],
          stack: 'a', // 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置
          roundCap: true, // 圆头
          itemStyle: {
            color: this.colorArr[i]
          },
          showBackground: true,
          backgroundStyle: {
            color: this.backgroundColor
          },
          // houver时的强调效果
          emphasis: {
            itemStyle: {
              shadowBlur: 12,
              shadowColor: this.colorArr[i]
            }
          }
        });
      }
    },

    // 组装数据
    initData() {
      const option = {
        backgroundColor: 'RGBA(28,28,30,0)',
        title: {
          // text: this.sumValue.toLocaleString(),
          text: this.filters.ThousandSeparator(this.sumValue),
          left: 'center',
          top: this.top,
          textStyle: {
            color: 'rgb(255,255,255)',
            fontSize: 28,
            fontFamily: 'DIN',
            fontWeight: 500,
            align: 'center'
          },
          subtext: this.dataset.title || '',
          subtextStyle: {
            color: '#999',
            fontSize: 12,
            fontFamily: 'PingFangSC',
            fontWeight: 400,
            align: 'center'
          }
        },
        // 极坐标系
        polar: {
          center: ['50%', '50%'],
          radius: this.dataset.radius || ['150px', '70px']
        },
        // 极坐标系角度轴
        angleAxis: {
          type: 'value',
          min: 0,
          max: this.sumValue,
          startAngle: this.startAngle,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        // 坐标系的径向轴
        radiusAxis: {
          type: 'category',
          z: 100,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: this.seriesData
      };
      return option;
    },

    // 初始化echarts配置
    initChart() {
      this.chart = echarts.init(this.$refs.polarBar, 'dark');
      this.chart.setOption(this.initData(), true);
    },

    // 给echarts绑定事件
    eConsole() {
      this.chart.on('mouseover', this.overFunc);
      this.chart.on('mouseout', this.outFunc);
    },

    // 事件处理函数 - hover图形时将对应的图例字体改为白色
    overFunc(param) {
      // param: 点击对象的所有相关参数
      this.currentIndex = this.dataset.dataArr.length - 1 - param.dataIndex;
    },
    outFunc(param) {
      // param: 点击对象的所有相关参数'
      this.currentIndex = '';
    },

    // hover 图例时的处理函数
    overLegend(index) {
      this.currentIndex = index;
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: this.dataset.dataArr.length - 1 - index
      });
    },
    outLegend(index) {
      this.currentIndex = '';
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: this.dataset.dataArr.length - 1 - index
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.chart {
  width: 100%;
  height: 100%;
}
.chart-wraaper {
  position: relative;
  width: 100%;
  height: 100%;
  // echarts
  .chart {
    padding: 0;
  }
  // 图例
  .legend {
    width: 45%;
    position: absolute;
    li {
      height: 20px;
      padding: 0 10px 0 8px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #fff;
      line-height: 20px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      display: flex;
      flex-direction: row;
      align-items: center;
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        font-weight: bold;
      }
      .mark {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
      }
      .text-box {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .name {
          width: 70%;
          text-align: left;
          margin: 0 13px 0 4px;
        }
        .number {
          width: 30%;
          text-align: right;
        }
      }
    }
    .active {
      background: rgba(255, 255, 255, 0.3);
      font-weight: bold;
    }
  }
}
</style>
