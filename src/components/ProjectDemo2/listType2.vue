<template>
  <div class="module-box">
    <div class="statistics-box" v-if="dataset1">
      <div
        class="stat-item"
        v-for="(item, i) in dataset1"
        :key="i"
      >
        <div class="icon-box">
          <div class="stat-icon">
            {{ item.icon }}
          </div>
          <div class="stat-value-box">
            <p class="stat-value">
              {{ parseFloat(item.value).toLocaleString() }}
            </p>
            <span class="stat-unit">
              {{ item.unit }}
            </span>
          </div>
        </div>

        <div class="stat-title-box">
          <p class="title">
            {{ item.title }}
          </p>
          <p class="subtitle">
            {{ item.subtitle }}
          </p>
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
  .statistics-box {
    width: 100%;
    height: 150px;
    padding: 30px 24px 10px;
    display: flex;
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:nth-child(odd) {
        width: 308px;
      }
      &:nth-child(even) {
        padding-left: 10px;
      }
      .icon-box {
        position: relative;
        width: 80px;
        height: 80px;
        .stat-icon {
          width: 80px;
          height: 80px;
          background-color: rgba(255, 172, 172, 0.566);
        }
        .stat-value-box {
          display: flex;
          position: absolute;
          top: 50%;
          left: 50%;
          // transform: translateX(-50%) translateY(-50%);
          transform: translateX(-50%);
          .stat-value {
            font-size: 16px;
            font-family: D-DIN;
            font-weight: 400;
            color: #00DDED;
          }
          .stat-unit {
            font-size: 16px;
            font-family: Alibaba-PuHuiTi-Regular;
            font-weight: 400;
            color: #00DDED;
            margin-left: 4px;
          }
        }

      }
      .stat-title-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 18px;
        font-family: Alibaba-PuHuiTi-Regular;
        font-weight: 400;
        color: #A6CBE6;
        line-height: 24px;
        margin-top: 5px;
        // .title {
        // }
        // .subtitle {
        // }
      }
    }
  }
}
p {
  margin: 0;
}
</style>
