<template>
  <div class="module-box">
    <div class="statistics-box" v-if="dataset1">
      <div
        class="stat-item"
        v-for="(item, i) in dataset1"
        :key="i"
      >
        <div class="stat-icon-bg"></div>
        <p class="stat-title">
          {{ item.title }}
        </p>
        <div class="stat-value-box">
          <p class="stat-value">
            {{ parseFloat(item.value).toLocaleString() }}
          </p>
          <span class="stat-unit">
            {{ item.unit }}
          </span>

          <!-- <div class="stat-value-box1 stat-value-box2" v-if="item.value1">
            <p class="stat-value">
              {{ parseFloat(item.value1).toLocaleString() }}
            </p>
            <span class="stat-unit">
              {{ item.unit1 }}
            </span>
          </div> -->
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
    width: 100%;
    height: 100px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    .stat-item {
      width: 218px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      // width: 100%;
      // &:nth-child(odd) {
      //   width: 308px;
      // }
      // &:nth-child(even) {
      //   padding-left: 10px;
      // }
      .stat-icon-bg {
        position: absolute;
        width: 218px;
        height: 100px;
        background-color: rgba(255, 172, 172, 0.566);
      }
      .stat-title {
        margin-top: 17px;
        font-size: 18px;
        font-family: Alibaba-PuHuiTi-Regular;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 25px;
      }
      .stat-value-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 7px;
        .stat-value {
          font-size: 32px;
          font-family: D-DIN;
          font-weight: bold;
          color: #44E2FF;
          line-height: 35px;
        }
        .stat-unit {
          margin-left: 23px;
          font-size: 18px;
          font-family: Alibaba-PuHuiTi-Regular;
          font-weight: 400;
          color: #44E2FF;
          line-height: 25px;
        }
        // .stat-value-box2 {
        //   margin-left: 6px;
        // }
      }
    }
  }
}
p {
  margin: 0;
}
</style>
