<template>
  <div>
    <ul class="rankBar-wrapper" ref="rankBarWrapper">
      <li
        ref="rankBarItem"
        class="li-box rankBar-item"
        v-for="(item, index) in dataset.data"
        :key="index"
        @mouseover="mouseoverFun(index)"
        @mouseout="mouseoutFun(index)"
      >
        <div class="text-wrapper text1">
          <!-- <span v-show="rankingNum === 'true'" class="label-num">{{ `No.${index+1}` }}</span> -->
          <i class="el-icon-share"></i>
          <span class="label"> {{ dataset.label[index] }}</span>
          <div class="number">
            <span>{{ barLengthList[index].toFixed(1) }}%</span>
            <span class="number-line"> | </span>
            <span>{{ item.split('/')[0] }}</span>
            <span class="number-max">/</span>
            <span class="number-max">{{ item.split('/')[1] }}</span>
          </div>
        </div>
        <!-- background: colorList[index], -->
        <div
          class="bar"
          :style="{
            background: `linear-gradient(90deg, ${colorList[0]}, ${colorList[1]})`,
            width: `${barLengthList[index] < 50 ? barLengthList[index] + 2 : barLengthList[index]}%`,
            transition: `all 1.5s`,
          }"
        >
          <div class="vertex">
          </div>
        </div>
        <div class="bar-bgc"></div>
      </li>
    </ul>
    <!-- <div class="btn-wrapper" v-if="dataset.data.length > listLength">
      <list-button
        type="up"
        :disabled="downIsDisabled"
        @mouseover="stopScroll"
        @mouseout="autoScroll"
        @click.stop="handleDown"
      ></list-button>
      <list-button
        type="down"
        :disabled="upIsDisabled"
        @mouseover="stopScroll"
        @mouseout="autoScroll"
        @click.stop="handleUp"
      ></list-button>
    </div> -->
  </div>
</template>

<script>
import {
  TweenMax,
  gsap
  // Back
} from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'; // 引入css插件,完成某些css动画
// import ListButton from '@/components/BiListButton'
gsap.registerPlugin(CSSRulePlugin)
// import ListButton from '@/components/BiListButton'
export default {
  name: 'BiRankingChart',
  components: {
    // ListButton
  },
  props: {
    // 图表的数据和label
    dataset: {
      type: Object,
      required: true,
      default: () => {
        return {
          label: [],
          data: []
        }
      }
    },
    // 颜色列表 默认BI通用颜色列表
    colorList: {
      type: Array,
      default: () => {
        // return ['#00B7FF', '#A6FE00', '#FA114F', '#FFE620', '#BF5AF2', '#FE9F0A', '#3AE9E6', '#A28BFE', '#FF5712', '#5E5CE6', '#FF453A'];
        return ['#68d0ef', '#17b1f3', '#4dcbf8', '#4dcbf8', '#4dcbf8', '#1f65c0', '#1f65c0', '#1f65c0', '#1f65c0', '#1f65c0', '#1f65c0'];
      }
    },
    // 是否是排名格式
    rankingNum: {
      type: String,
      default: () => {
        return 'true';
      }
    },
    // 数据单位
    unit: {
      type: String,
      default: () => {
        return '';
      }
    },
    // 模块列表长度
    listLength: {
      type: Number,
      default: () => {
        return 5;
      }
    }
  },
  data() {
    return {
      itemWrapper: '', // 排名bar的包装元素
      elemenmtList: [], // 排名bar的元素列表
      timer: null, // 排名滚动频率的定时器
      stepTimer1: null, // 向上滚动步幅速度的定时器
      stepTimer2: null, // 向下滚动步幅速度的定时器
      upIsDisabled: false, // up按钮是否禁用
      downIsDisabled: false, // down按钮是否禁用
      barLengthList: [0, 0, 0, 0, 0, 0] // bar的长度数据, 先都给0,500ms后再给真实长度,配合transiton实现动画效果
    }
  },
  watch: {
    dataset: {
      handler(newVal) {
        this.$nextTick(() => {
          this.calcBarLength();

          this.itemWrapper = this.$refs.rankBarWrapper;
          this.elemenmtList = this.$refs.rankBarItem;
          // this.autoScroll();
        })
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    TweenMax.staggerFrom(['.li-box', '.text1'], 1, {
      opacity: 0,
      // scale: 0,
      transformOrigin: '1% 0% -50'
    }, 0.2)
  },
  beforeDestroy() {
    TweenMax.staggerTo(['.text1', '.li-box'], 1, {
      opacity: 0,
      // scale: 0,
      transformOrigin: '0% 0% -50'
    }, 0.2)
    clearInterval(this.stepTimer1);
    clearInterval(this.stepTimer2);
    clearInterval(this.timer);
    this.stepTimer1 = null;
    this.stepTimer2 = null;
    this.timer = null;
  },
  methods: {
    // 计算bar的长度(不用computed的目的是为了实现动画效果)
    calcBarLength() {
      setTimeout(() => {
        // const maxData = Math.max.apply(null, this.dataset.data);
        const arr = [];
        this.dataset.data.forEach(item => {
          // arr.push(item.split('/')[0] / maxData * 100 || 0);
          // console.log();
          arr.push(item.split('/')[0] / item.split('/')[1] * 100 || 0);
        });
        this.barLengthList = arr;
      }, 300)
    },
    // 鼠标移入事件处理函数
    mouseoverFun(index) {
      const elemenmt = this.elemenmtList[index];
      // elemenmt.childNodes[0].style.fontWeight = '900';
      // elemenmt.childNodes[0].childNodes[2].style.fontWeight = '900';
      // console.log(elemenmt,);

      if (this.rankingNum === 'true') {
        if (index === 0) {
          elemenmt.style.color = this.colorList[0];
          elemenmt.childNodes[1].style.boxShadow = `0px 0px 12px 0px ${this.colorList[0]}`;
        } else if (index === 1) {
          elemenmt.style.color = this.colorList[1];
          elemenmt.childNodes[1].style.boxShadow = `0px 0px 12px 0px ${this.colorList[1]}`;
        } else if (index === 2) {
          elemenmt.style.color = this.colorList[2];
          elemenmt.childNodes[1].style.boxShadow = `0px 0px 12px 0px ${this.colorList[2]}`;
        } else {
          // elemenmt.style.color = '#fff';
          // elemenmt.childNodes[1].style.boxShadow = '0px 0px 12px 0px #fff';
          elemenmt.style.color = this.colorList[index];
          elemenmt.childNodes[1].style.boxShadow = `0px 0px 12px 0px ${this.colorList[index]}`;
        }
      } else {
        elemenmt.style.color = this.colorList[index];
        elemenmt.childNodes[1].style.boxShadow = `0px 0px 12px 0px ${this.colorList[index]}`;
      }

      // this.stopScroll();
    },
    // 鼠标移出事件处理函数
    mouseoutFun(index) {
      const elemenmt = this.elemenmtList[index];
      elemenmt.style.color = '#f1f2f3';
      elemenmt.childNodes[1].style.boxShadow = '';
      elemenmt.childNodes[0].style.fontWeight = '400';
      this.autoScroll();
    },
    // 点击向上滚动
    // handleUp() {
    //   this.rankingScroll();
    // },
    // 点击向下滚动
    // handleDown() {
    //   this.rankingScroll('down');
    // },
    // 排名滚动距离计算
    // rankingScroll(direction = 'up', rollingDistance = 60) {
    //   const ulHeight = this.itemWrapper.offsetHeight;
    //   const sumHeight = this.dataset.data.length * 60; // 因为每项的高度是60
    //   if (direction === 'up') {
    //     // scrollTop 滚动条距离容器顶部的距离   sumHeight - ulHeight 超出容器的距离  即滚动条滚动 sumHeight - ulHeight 这么高就到底部了
    //     if (sumHeight - ulHeight > this.itemWrapper.scrollTop) {
    //       // this.itemWrapper.scrollTop += rollingDistance; //一步到位,无滚动效果
    //       let flag = 0;
    //       clearInterval(this.stepTimer1);
    //       this.stepTimer1 = setInterval(() => {
    //         this.itemWrapper.scrollTop += 1; // 滚动的步幅
    //         flag++;
    //         if (flag >= 60) clearInterval(this.stepTimer1); // 60是每项的高度,即走完一大步之后就删除这个计时器
    //       }, 15); // 滚动的速度
    //     } else {
    //       this.itemWrapper.scrollTop = 0;
    //     }
    //   }
    //   if (direction === 'down') {
    //     if (this.itemWrapper.scrollTop > 0) {
    //       // this.itemWrapper.scrollTop -= rollingDistance; //一步到位,无滚动效果
    //       let flag = 0;
    //       clearInterval(this.stepTimer2);
    //       this.stepTimer2 = setInterval(() => {
    //         this.itemWrapper.scrollTop -= 1; // 滚动的步幅
    //         flag++;
    //         if (flag >= 60) clearInterval(this.stepTimer2); // 60是每项的高度,即走完一大步之后就删除这个计时器
    //       }, 15); //
    //     } else {
    //       this.itemWrapper.scrollTop = sumHeight - ulHeight;
    //     }
    //   }
    // },
    // 自动滚动
    autoScroll() {
    //   // 数据超过6条才滚动(因为图表可以显示6条),不足6条就不用滚动
    //   if (this.dataset.data.length > 6) {
    //     this.upIsDisabled = false;
    //     this.downIsDisabled = false;
    //     clearInterval(this.timer);
    //     this.timer = setInterval(() => {
    //       this.rankingScroll();
    //     }, 3000);
    //   } else {
    //     this.upIsDisabled = true;
    //     this.downIsDisabled = true;
    //   }
    }
    // 滚动停止
    // stopScroll() {
    //   clearInterval(this.timer);
    //   this.timer = null;
    // }
  }
}
</script>

<style lang='scss' scoped>
ul {
  height: 256px; // 60*5=256
  overflow: hidden;
  background-color: #0e1330;
  padding: 10px;
  // 每一项数据

  li:nth-child(1){
    .label-num {
      // color: #FA114F;
      // color: #aa1a90;
      background: repeating-linear-gradient(to right, #aa1a90, #aa1a9000);
      // background-color: #aa1a90;
    }
  }
  li:nth-child(2){
    .label-num {
      background: repeating-linear-gradient(to right, #3739ad, #aa1a9000);
      // color: #FF5712;
    }
  }
  // li:nth-child(3){
  //   .label-num {
  //     color: #FFE620;
  //   }
  // }
  li {
    color: #f1f2f3;
    position: relative;
    .label-num {
      padding: 1px 12px 3px;
      border-radius: 16px;
      background: repeating-linear-gradient(to right, #1f7ecd, #1f7fcd48, #1f7fcd00);
    }
    .text-wrapper {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC;
      font-weight: 400;
      line-height: 17px;
      .label {
        text-align: left;
      }
      .label-num {
        margin-right: 24px;
      }
      .number {
        float: right;
        text-align: right;
        font-weight: bold;
        .number-max {
          color: #d1d1d1a2;
        }
        .number-line {
          color: #2570b7;
        }
      }
    }
    .bar {
      height: 6px;
      margin: 7px 0 15px;
      background: #fff;
      border-radius: 6px;
      position: relative;
      z-index: 18;
      .vertex {
        position: absolute;
        top: 0;
        right: 0px;
        height: 6px;
        width: 6px;
        border-radius: 6px;
        background: #17b1f3;
        box-shadow: 0px 0px 10px 2px #5dceff;
      }
    }
    .bar-bgc {
      background-color: #173066B5;
      border-radius: 4px;
      width: 100%;
      height: 4px;
      position: absolute;
      // top: 0;
      bottom: 0;
      z-index: 9;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
// 按钮容器
.btn-wrapper {
  height: 32px;
  text-align: center;
  button {
    margin-top: 8px;
  }
}
</style>
