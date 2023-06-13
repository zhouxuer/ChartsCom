<template>
  <div class="module-box">
    <div class="title-box1">
      <p class="title">{{ title }}</p>
      <div class="line-box">
        <div class="line-left"></div>
        <div class="line-center" :style="`width: calc(${width} - 29px - 178px)`"></div>
        <div class="line-right">
          <svg
            style="position: relative;top: -9px;"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="156px" height="4px"
          >
            <defs>
              <linearGradient id="PSgrad_0" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stop-color="rgb(121,66,45)" stop-opacity="0.23922" />
                <stop offset="79%" stop-color="rgb(134,76,25)" stop-opacity="0.86" />
                <stop offset="96%" stop-color="rgb(224,129,58)" stop-opacity="1" />
                <stop offset="100%" stop-color="rgb(244,141,66)" stop-opacity="1" />
              </linearGradient>
            </defs>
            <path fill-rule="evenodd"  fill-opacity="0" fill="rgb(152, 209, 255)"
            d="M52.000,4.000 L52.000,-0.000 L157.000,-0.000 L157.000,4.000 L52.000,4.000 ZM31.000,-0.000 L37.000,-0.000 L37.000,4.000 L31.000,4.000 L31.000,-0.000 ZM14.000,-0.000 L20.000,-0.000 L20.000,4.000 L14.000,4.000 L14.000,-0.000 ZM-0.000,-0.000 L6.000,-0.000 L6.000,4.000 L-0.000,4.000 L-0.000,-0.000 Z"/>
            <path fill="url(#PSgrad_0)"
            d="M52.000,4.000 L52.000,-0.000 L157.000,-0.000 L157.000,4.000 L52.000,4.000 ZM31.000,-0.000 L37.000,-0.000 L37.000,4.000 L31.000,4.000 L31.000,-0.000 ZM14.000,-0.000 L20.000,-0.000 L20.000,4.000 L14.000,4.000 L14.000,-0.000 ZM-0.000,-0.000 L6.000,-0.000 L6.000,4.000 L-0.000,4.000 L-0.000,-0.000 Z"/>
          </svg>
        </div>
      </div>
    </div>
    <!-- <div class="title-box2">
      <div class="icon-box">
        <div class="icon"></div>
      </div>
      <p class="title">{{ dataset.title }}</p>
      <div class="line-box">
        <div class="line-center" :style="`width: calc(${dataset.title}px - 120px)`"></div>
        <div class="line-right"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  props: {
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
      // required: false,
      // default: ''
    }
  },
  computed: {
  },
  watch: {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.module-box {
  width: 100%;
  height: 100%;
  .title-box1 {
    .title {
      font-size: 20px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #FFFFFF;
      margin-left: 24px;
      margin-bottom: 10px;
    }
    .line-box {
      width: 100%;
      display: flex;
      align-items: center;
      .line-left {
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 5px 5px 5px 5px;
        border-color: transparent transparent transparent #F8712D;
      }
      .line-center {
        margin-left: 14px;
        position: relative;
        height: 2px;
        background: linear-gradient(90deg, rgba(60,166,255,0.59), rgba(23,79,100,0.9), rgba(23,79,100,.5));
        &::after {
          content: '';
          width: 5px;
          height: 5px;
          background: rgba(60,166,255,0.59);
          position: absolute;
          left: -5px;
          top: -1px;
          box-shadow: 0px 0px 5px #6ef0ffa1,
                      0px 0px 10px #6ef0ff4d;
        }
      }
      .line-right {
        width: 178px;
        height: 10px;
        position: relative;
        right: -28px;
      }
    }
  }
}
p {
  margin: 0;
}
</style>
