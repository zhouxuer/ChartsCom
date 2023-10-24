<template>
  <div id="map3d3" ref="map3d3" class="map3d-box"></div>
</template>

<script>
import { renderer, labelRenderer } from './index';
export default {
name: 'map3d3',
data() {
  return {};
},
created: function () {
  // this.$refs.webgl.appendChild(renderer.domElement);//不可以
  // Three.js渲染结果Canvas画布插入到body元素中
  // document.body.appendChild(renderer.domElement);//可以访问body
},
mounted: function () {
  this.$refs.map3d3.appendChild(renderer.domElement);

  // console.log(labelRenderer.domElement, '==---');
  this.$refs.map3d3.appendChild(labelRenderer.domElement);
  // // Three.js渲染结果Canvas画布插入到body元素中
  // document.body.appendChild(renderer.domElement);
  // console.log(renderer, '==ssssss==', labelRenderer);
  // console.log(document.getElementById('myDiv'), '====----1111-');
},
methods: {}
}
</script>

<style lang="scss" scoped>
.map3d-box {
  width: 100%;
  height: 100%;
  background-color: rgb(242, 255, 208);
  position: relative;
}
</style>
