<template>
  <div ref="map3d" class="map3d-box"></div>
</template>

<script>
import { renderer } from './index';
export default {
name: 'map3d',
data() {
  return {};
},
created: function () {
  // this.$refs.webgl.appendChild(renderer.domElement);//不可以
  // Three.js渲染结果Canvas画布插入到body元素中
  // document.body.appendChild(renderer.domElement);//可以访问body
},
mounted: function () {
  this.$refs.map3d.appendChild(renderer.domElement);
  // // Three.js渲染结果Canvas画布插入到body元素中
  // document.body.appendChild(renderer.domElement);
},
methods: {}
}
</script>

<style lang="scss" scoped>
.map3d-box {
  width: 100%;
  height: 100%;
  background-color: rgb(242, 255, 208);
}
</style>
