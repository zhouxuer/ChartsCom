<template>
  <div class="rotationBg-box">
    <img class="rotationBg" src="../../assets/true.png" />
  </div>
</template>

<script>
export default {
name: 'ProjectDemo2',
data() {
  return {};
},
created() {},
methods: {}
}
</script>

<style lang="scss" scoped>
.rotationBg-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .rotationBg {
    width: 60%;
    // -webkit-animation: rotation 15s linear infinite;
    // animation: rotation 10s linear infinite;
    animation: rotation 6s linear infinite;
  }
  @keyframes rotation {
    0% {
      // -webkit-transform: rotate(0deg);
      transform: rotateX(65deg) rotateZ(0deg);
      opacity: 0.8;
    }

    50% {
      // -webkit-transform: rotate(0deg);
      transform: rotateX(65deg) rotateZ(-180deg);
      opacity: 1;
    }

    100% {
      // -webkit-transform: rotate(360deg);
      transform: rotateX(65deg) rotateZ(-360deg);
      opacity: 0.8;
    }
  }
}
</style>
