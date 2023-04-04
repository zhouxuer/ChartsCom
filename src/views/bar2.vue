<template>
  <div class="box0">
    <div class="box box-1">
      <p class="text1">sssssssssss</p>
    </div>
    <div class="box box-2"></div>
    <div class="box box-3"></div>
    <div class="box box-4"></div>
    <div class="box box-5"></div>
  </div>
</template>

<script>
import {
  TweenMax,
  gsap
  // Back
} from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
gsap.registerPlugin(CSSRulePlugin); // 引入css插件,完成某些css动画

export default {
  data() {
    return {}
  },

  created() {
  },

  mounted() {
    // staggerFrom操作方法
    // '.box'指定对象
    // 1 持续时长
    // {opacity: 0} 进行动画的css属性
    TweenMax.staggerFrom('.box', 1, {
      opacity: 0
      // y: 200,
      // rotation: '360deg'
    }, 0.2)
    TweenMax.staggerFrom('.text1', 0.8, {
      opacity: 0,
      scale: 0,
      // y: 80,
      // rotationX: 180,
      transformOrigin: '0% 50% -50'
      // ease: Back.easeOut
    }, 0.5);
  },

  beforeDestroy() {
    TweenMax.staggerTo('.box', 1, {
      opacity: 0
      // y: 200,
      // rotation: '360deg'
    }, 0.2)
  },

  methods: {}
}
</script>
<style lang="scss" scoped>
.box0 {
  display: flex;
}
  .box {
    width: 100px;
    height: 100px;
    margin: 8px 8px;
  }
  .box-1 {
    background-color: rgb(255, 177, 177);
  }
  .box-2 {
    background-color: rgb(255, 246, 177);
  }
  .box-3 {
    background-color: rgb(206, 255, 177);
  }
  .box-4 {
    background-color: rgb(177, 252, 255);
  }
  .box-5 {
    background-color: rgb(177, 178, 255);
  }
</style>