<template>
  <div class="module-box">
    <div class="statistics-box" v-if="dataset1">
      <div
        class="stat-item"
        v-for="(item, i) in dataset1"
        :key="i"
        @mouseenter="showTooltip(item)"
        @mouseleave="hideTooltip"
      >
        <div class="stat-icon">
          {{ item.icon }}
        </div>

        <div class="stat-content">
          <p class="stat-title">
            {{ item.title }}
          </p>

          <div class="stat-data">
            <div class="stat-data-value">
              <p class="stat-value">
                {{ parseFloat(item.value).toLocaleString() }}
              </p>
              <p class="stat-unit">
                {{ item.unit }}
              </p>
            </div>
            <div class="stat-data-value stat-data-value1" v-if="item.value1">
              <p class="stat-value">
                {{ parseFloat(item.value1).toLocaleString() }}
              </p>
              <p class="stat-unit">
                {{ item.unit1 }}
              </p>
            </div>

            <div class="stat-percentage-box" v-if="item.percentage">
              <i
                v-if="item.percentage"
                :class="+item.percentage > 50 ?
                'el-icon-top' : 'el-icon-bottom'"
                :style="+item.percentage > 50 ?
                'color: #3AFF97 ' : 'color: #FF3A3A '"
              ></i>
              <span
                class="stat-percentage"
                v-if="item.percentage"
                :style="+item.percentage > 50 ?
                'color: #3AFF97 ' : 'color: #FF3A3A '"
              >
                {{ item.percentage }} %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- tooltip-->
    <div
      class="tooltip-box"
      v-if="tooltip"
      :style="`top: ${this.tooltipY}px;left: ${this.tooltipX}px;`"
    >
      <div v-for="(item,i) in tooltipData" :key="i" class="tooltip-list">
        <p class="tooltip-title">{{ item.title }}: </p>
        <p class="tooltip-value"> {{ parseFloat(item.value).toLocaleString() }}</p>
        <p class="tooltip-unit">{{ item.unit }}</p>
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
  data() {
    return {
      tooltip: false,
      tooltipX: 0,
      tooltipY: 0,
      tooltipData: []
    };
  },
  mounted() {
  },
  beforeDestroy() {
  },
  watch: {},
  methods: {
    showTooltip(data) {
      if (data.children) {
        this.tooltip = true
        this.tooltipData = data.children
        // 监听鼠标移动
        window.addEventListener('mousemove', this.tooltipPosition)
      }
    },
    hideTooltip() {
      this.tooltip = false
      window.removeEventListener('mousemove', this.tooltipPosition)
    },
    tooltipPosition(e) {
      this.tooltipX = e.clientX
      this.tooltipY = e.clientY
    }
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
      align-items: center;
      flex-direction: row;
      background-color: rgb(194, 255, 177);
      position: relative;
      z-index: 9;
      &:nth-child(odd) {
        width: 280px;
      }
      &:nth-child(even) {
        padding-left: 10px;
      }
      .stat-icon {
        width: 68px;
        height: 68px;
        background-color: rgba(255, 172, 172, 0.566);
      }
      .stat-content {
        margin-left: 10px;
        .stat-title {
          font-size: 18px;
          font-family: Alibaba-PuHuiTi-Regular;
          font-weight: 400;
          color: #A6CBE6;
          line-height: 28px;
        }
        .stat-data {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          margin-top: 6px;
          .stat-data-value {
            display: flex;
            flex-direction: row;
            align-items: baseline;
            .stat-value {
              font-size: 24px;
              font-family: D-DIN;
              font-weight: bold;
              color: #44E2FF;
              line-height: 26px;
              text-shadow: 0px 0px 5px rgba(68,226,255,0.52);
            }
            .stat-unit {
              font-size: 18px;
              font-family: Alibaba-PuHuiTi-Regular;
              font-weight: 500;
              color: #44E2FF;
              line-height: 25px;
              text-shadow: 0px 0px 5px rgba(68,226,255,0.52);
              margin-left: 9px;
            }
          }
          .stat-data-value1 {
            margin-left: 10px;
          }
          .stat-percentage-box {
            margin-left: 9px;
            .stat-percentage {
              font-size: 18px;
              font-family: D-DIN;
              font-weight: bold;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
.tooltip-box {
  position: fixed;
  width: 227px;
  height: 223px;
  background-color: rgb(124, 175, 227);
  z-index: 99;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2px 36px;
  .tooltip-list {
    display: flex;
    align-items: baseline;
    margin-top: 30px;
    .tooltip-title {
      font-size: 18px;
      font-family: Alibaba-PuHuiTi-Regular;
      font-weight: 400;
      color: #1EDCFF;
      line-height: 25px;
    }
    .tooltip-value {
      font-size: 22px;
      font-family: D-DIN;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 30px;
      margin-left: 10px;
    }
    .tooltip-unit {
      font-size: 16px;
      font-family: Alibaba-PuHuiTi-Regular;
      font-weight: 500;
      color: #A6CBE6;
      line-height: 30px;
      margin-left: 2px;
    }
  }
}
p {
  margin: 0;
}
</style>
