<template>
  <div>
    <ul class="rankBar-wrapper" ref="rankBarWrapper">
      <li
        ref="rankBarItem"
        class="rankBar-item"
        v-for="(item, index) in dataset.data"
        :key="index"
        @mouseover="mouseoverFun(index)"
        @mouseout="mouseoutFun(index)"
      >
        <div class="text-wrapper">
          <span v-show="rankingNum === 'true'" class="label-num">{{ `No.${index+1}` }}</span>
          <span class="label">{{ dataset.label[index] }}</span>
          <span class="number">{{ `${Number(item).toLocaleString()}${unit ? unit : ""}` }}</span>
        </div>
        <div
          class="bar"
          :style="{
            background: colorList[index],
            width: `${barLengthList[index] < 50 ? barLengthList[index] + 2 : barLengthList[index]}%`,
            transition: `all 1.5s`,
          }"
        >
        </div>
      </li>
    </ul>
    <div class="btn-wrapper" v-if="dataset.data.length > listLength">
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
    </div>
  </div>
</template>

<script>
import ListButton from '@/components/BiListButton'
export default {
  name: 'BiRankingChart',
  components: {
    ListButton
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
        return ['#00B7FF', '#A6FE00', '#FA114F', '#FFE620', '#BF5AF2', '#FE9F0A', '#3AE9E6', '#A28BFE', '#FF5712', '#5E5CE6', '#FF453A'];
      }
    },
    // 是否是排名格式
    rankingNum: {
      type: String,
      default: () => {
        return 'flase';
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
          this.autoScroll();
        })
      },
      deep: true,
      immediate: true
    }
  },
  beforeDestroy() {
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
        const maxData = Math.max.apply(null, this.dataset.data);
        const arr = [];
        this.dataset.data.forEach(item => {
          arr.push(item / maxData * 100 || 0);
        });
        this.barLengthList = arr;
      }, 300)
    },
    // 鼠标移入事件处理函数
    mouseoverFun(index) {
      const elemenmt = this.elemenmtList[index];
      // elemenmt.childNodes[0].style.fontWeight = '900';
      // elemenmt.childNodes[0].childNodes[2].style.fontWeight = '900';

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
          elemenmt.style.color = '#fff';
          elemenmt.childNodes[1].style.boxShadow = '0px 0px 12px 0px #fff';
        }
      } else {
        elemenmt.style.color = this.colorList[index];
        elemenmt.childNodes[1].style.boxShadow = `0px 0px 12px 0px ${this.colorList[index]}`;
      }

      this.stopScroll();
    },
    // 鼠标移出事件处理函数
    mouseoutFun(index) {
      const elemenmt = this.elemenmtList[index];
      elemenmt.style.color = '#B0B3B8';
      elemenmt.childNodes[1].style.boxShadow = '';
      elemenmt.childNodes[0].style.fontWeight = '400';
      this.autoScroll();
    },
    // 点击向上滚动
    handleUp() {
      this.rankingScroll();
    },
    // 点击向下滚动
    handleDown() {
      this.rankingScroll('down');
    },
    // 排名滚动距离计算
    rankingScroll(direction = 'up', rollingDistance = 43) {
      const ulHeight = this.itemWrapper.offsetHeight;
      const sumHeight = this.dataset.data.length * 43; // 因为每项的高度是43
      if (direction === 'up') {
        // scrollTop 滚动条距离容器顶部的距离   sumHeight - ulHeight 超出容器的距离  即滚动条滚动 sumHeight - ulHeight 这么高就到底部了
        if (sumHeight - ulHeight > this.itemWrapper.scrollTop) {
          // this.itemWrapper.scrollTop += rollingDistance; //一步到位,无滚动效果
          let flag = 0;
          clearInterval(this.stepTimer1);
          this.stepTimer1 = setInterval(() => {
            this.itemWrapper.scrollTop += 1; // 滚动的步幅
            flag++;
            if (flag >= 43) clearInterval(this.stepTimer1); // 43是每项的高度,即走完一大步之后就删除这个计时器
          }, 15); // 滚动的速度
        } else {
          this.itemWrapper.scrollTop = 0;
        }
      }
      if (direction === 'down') {
        if (this.itemWrapper.scrollTop > 0) {
          // this.itemWrapper.scrollTop -= rollingDistance; //一步到位,无滚动效果
          let flag = 0;
          clearInterval(this.stepTimer2);
          this.stepTimer2 = setInterval(() => {
            this.itemWrapper.scrollTop -= 1; // 滚动的步幅
            flag++;
            if (flag >= 43) clearInterval(this.stepTimer2); // 43是每项的高度,即走完一大步之后就删除这个计时器
          }, 15); //
        } else {
          this.itemWrapper.scrollTop = sumHeight - ulHeight;
        }
      }
    },
    // 自动滚动
    autoScroll() {
      // 数据超过6条才滚动(因为图表可以显示6条),不足6条就不用滚动
      if (this.dataset.data.length > 6) {
        this.upIsDisabled = false;
        this.downIsDisabled = false;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.rankingScroll();
        }, 3000);
      } else {
        this.upIsDisabled = true;
        this.downIsDisabled = true;
      }
    },
    // 滚动停止
    stopScroll() {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
</script>

<style lang='scss' scoped>
ul {
  height: 258px; // 43*6=258
  overflow: hidden;
  // 每一项数据

  li:nth-child(1){
    .label-num {
      color: #FA114F;
    }
  }
  li:nth-child(2){
    .label-num {
      color: #FF5712;
    }
  }
  li:nth-child(3){
    .label-num {
      color: #FFE620;
    }
  }
  li {
    color: #B0B3B8;
    .text-wrapper {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC;
      font-weight: 400;
      line-height: 17px;
      .label {
        text-align: left;
      }
      .number {
        float: right;
        text-align: right;
        font-weight: bold;
      }
      .label-num {
        margin-right: 24px;
      }
    }
    .bar {
      height: 4px;
      margin: 7px 0 15px;
      background: #fff;
      border-radius: 2px;
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
