<template>
  <div class="module-box">
    <div class="statistics-box" v-if="dataset1">
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
            <p class="stat-value">
              {{ item.value }}
            </p>
            <span class="stat-unit">
              {{ item.unit }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="list-box">
      <div
        class="list-item"
        v-for="(item, i) in dataset2"
        :key="i"
        :style="type ? 'width: 50%;' : ''"
      >
        <i class="list-icon">
          {{ item.icon }}
        </i>
        <p class="list-title">
          {{ item.title }}
        </p>
        <p class="list-value">
          {{ item.value1 }}
        </p>
        <span class="list-unit">
          {{ item.unit1 }}
        </span>
        <i
          v-if="item.percentage1"
          :class="+item.percentage1 > 50 ?
          'el-icon-top' : 'el-icon-bottom'"
          :style="+item.percentage1 > 50 ?
          'color: #3AFF97 ' : 'color: #FF3A3A '"
        ></i>
        <span class="list-percentage" v-if="item.percentage1">
          {{ item.percentage1 }}%
        </span>
        <p class="list-value" v-if="item.value2">
          {{ item.value2 }}
        </p>
        <span class="list-unit" v-if="item.unit2">
          {{ item.unit2 }}
        </span>
        <i
          v-if="item.percentage2"
          :class="+item.percentage2 > 50 ?
          'el-icon-top' : 'el-icon-bottom'"
          :style="+item.percentage2 > 50 ?
          'color: #3AFF97;font-size: 18px;' : 'color: #FF3A3A;font-size: 18px;'"
        ></i>
        <span class="list-percentage" v-if="item.percentage2">
          {{ item.percentage2 }}%
        </span>
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
      color: #fff;
      display: flex;
      align-items: center;
      flex-direction: row;
      &:nth-child(odd) {
        width: 308px;
      }
      &:nth-child(even) {
        padding-left: 10px;
      }
      .stat-icon {
        width: 90px;
        height: 68px;
        background-color: rgba(255, 172, 172, 0.566);
      }
      .stat-content {
        margin-left: 10px;
        .stat-title {
          font-size: 18px;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: #BFC8D7;
          margin-bottom: 12px;
        }
        .stat-data {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          .stat-value {
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
  .list-box {
    width: 100%;
    height: 110px;
    padding: 0 24px 45px;
    display: flex;
    flex-wrap: wrap;
    .list-item {
      color: #fff;
      display: flex;
      flex-wrap: nowrap;
      align-items: baseline;
      height: 26px;
      margin-bottom: 16px;
      &:nth-child(odd) {
        width: 308px;
      }
      &:nth-child(even) {
        padding-left: 10px;
      }
      .list-icon {
        width: 22px;
        height: 24px;
        background: linear-gradient(180deg, #ABD6FF, #48DCFF);
      }
      .list-title {
        margin-left: 6px;
      }
      .list-unit {
        margin: 0 6px 0 4px;
      }
      .list-percentage {
        margin: 0 0 0 4px;
      }
      .list-title,
      .list-unit,
      .list-percentage {
        font-size: 18px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
      }
      .list-value {
        margin-left: 8px;
        font-size: 34px;
        font-family: DINPro;
        font-weight: bold;
        text-shadow: 0 0 10px rgba(59, 99, 220, 0.3),
                     0 0 20px rgba(59, 99, 220, 0.4);
      }
      .list-unit,
      .list-percentage {
        color: #8F9CB2;
      }
    }
  }
}
p {
  margin: 0;
}
</style>
