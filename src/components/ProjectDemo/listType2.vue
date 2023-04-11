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
    padding: 30px 24px 10px;
    display: flex;
    padding-top: 20px;
    .stat-item {
      color: #fff;
      display: flex;
      align-items: center;
      flex-direction: row;
      width: 50%;
      .stat-icon {
        width: 68px;
        height: 68px;
        background-color: rgba(255, 172, 172, 0.566);
      }
      .stat-content {
        margin-left: 10px;
        .stat-title {
          font-size: 18px;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: #FFFFFF;
          margin-bottom: 22px;
          text-shadow: 0 0 10px rgba(59, 99, 220, 0.3),
                       0 0 20px rgba(59, 99, 220, 0.4);
        }
        .stat-data {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          .stat-name {
            font-size: 18px;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: #FFFFFF;
          }
          .stat-value {
            padding: 0 4px 0 8px;
            font-size: 34px;
            font-family: DINPro;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(59, 99, 220, 0.3),
                         0 0 20px rgba(59, 99, 220, 0.4);
          }
          .stat-unit {
            font-size: 18px;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: #8F9CB2;
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
