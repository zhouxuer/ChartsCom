<template>
  <div class="module-box">
    <div class="statistics-box" v-if="dataset1">
      <div class="stat-icon-bg"></div>
      <div
        class="stat-item"
        v-for="(item, i) in dataset1"
        :key="i"
      >
        <p class="stat-title">
          {{ item.title }}
        </p>
        <div class="stat-value-box">
          <div class="stat-value-box1">
            <p class="stat-value">
              {{ parseFloat(item.value).toLocaleString() }}
            </p>
            <span class="stat-unit">
              {{ item.unit }}
            </span>
          </div>

          <div class="stat-value-box1 stat-value-box2" v-if="item.value1">
            <p class="stat-value">
              {{ parseFloat(item.value1).toLocaleString() }}
            </p>
            <span class="stat-unit">
              {{ item.unit1 }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  props: {
    dataset1: {
      type: Array,
      required: true
    },
    dataset2: {
      type: Array,
      required: false
    },
    type: {
      type: Boolean,
      required: false
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
  padding-top: 64px;
  .statistics-box {
    width: 386px;
    height: 86px;
    margin: auto;
    display: flex;
    position: relative;
    justify-content: space-around;
    .stat-icon-bg {
      position: absolute;
      width: 386px;
      height: 86px;
      background-color: rgba(255, 172, 172, 0.566);
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      // width: 100%;
      // &:nth-child(odd) {
      //   width: 308px;
      // }
      // &:nth-child(even) {
      //   padding-left: 10px;
      // }
      .stat-title {
        font-size: 18px;
        font-family: Alibaba-PuHuiTi-Regular;
        font-weight: 400;
        color: #A6CBE6;
        line-height: 24px;
      }
      .stat-value-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 8px;
        .stat-value-box1 {
          display: flex;
          flex-direction: row;
          align-items: center;
          .stat-value {
            margin-left: 9px;
            font-size: 24px;
            font-family: D-DIN;
            font-weight: bold;
            color: #44E2FF;
            line-height: 26px;
            text-shadow: 0px 0px 5px rgba(68,226,255,0.52);
          }
          .stat-unit {
            margin-left: 9px;
            font-size: 24px;
            font-family: Alibaba-PuHuiTi-Regular;
            font-weight: bold;
            color: #44E2FF;
            line-height: 26px;
            text-shadow: 0px 0px 5px rgba(68,226,255,0.52);
          }
        }
        .stat-value-box2 {
          margin-left: 6px;
        }
      }
    }
  }
}
p {
  margin: 0;
}
</style>
