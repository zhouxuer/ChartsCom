<template>
  <div class="module-box">
    <div class="statistics-box">
      <div
        class="stat-item"
        v-for="(item, i) in dataset1"
        :key="i"
      >
        <div class="stat-icon">
          {{ item.icon }}
        </div>
        <div class="stat-content">
          <p class="stat-title">
            {{ item.title }}
          </p>
          <div class="stat-data">
            <p class="stat-name">
              {{ item.name }}
            </p>
            <p class="stat-value">
              {{ item.value1 }}
            </p>
            <span class="stat-unit">
              {{ item.unit1 }}
            </span>
            <p class="stat-value">
              {{ item.value2 }}
            </p>
            <span class="stat-unit">
              {{ item.unit2 }}
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
      required: true
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
    padding: 24px 14px 10px;
    display: flex;
    flex-wrap: wrap;
    .stat-item {
      color: #fff;
      display: flex;
      align-items: center;
      flex-direction: row;
      width: 50%;
      margin-bottom: 22px;
      .stat-icon {
        width: 76px;
        height: 76px;
        background-color: rgba(255, 172, 172, 0.566);
      }
      .stat-content {
        text-align: center;
        width: calc(100% - 76px);
        .stat-title {
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #26C5FF;
          margin-bottom: 14px;
        }
        .stat-data {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          justify-content: center;
          .stat-value {
            padding: 0 4px 0 8px;
            font-size: 24px;
            font-family: DINPro;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
                         0 0 20px rgba(255, 255, 255, 0.4);
          }
          .stat-unit {
            font-size: 18px;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
                         0 0 20px rgba(255, 255, 255, 0.4);
          }
        }
      }
    }
  }
}
p {
  margin: 0;
}
</style>
