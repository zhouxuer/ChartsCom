<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div>
      <button @click="isShow=!isShow">toggle</button>
      <transition name="fade">
        <div class="sss" v-show="isShow">hello</div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Animation',
  props: {},
  data() {
    return {
      isShow: true
    };
  },
  watch: {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style lang='scss' scoped>
/* 显示和隐藏的过滤效果  opacity属性持续2秒*/
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
/*隐藏时候的样式*/
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* 偏移效果 */
/*进入持续时间2秒 针对所有样式*/
.fade-enter-active{
  transition: all 2s;
}

/*离开持续时间5秒 针对所有样式*/
.fade-leave-active{
  transition: all 5s;
}

/*初始全透明，2d移动*/
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform:translate(100px,100px)
}


.sss {
  width: 100px;
  height: 100px;
  background-color: rgb(255, 197, 197);
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
