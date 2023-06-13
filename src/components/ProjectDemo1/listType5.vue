<template>
  <div class="module-box">
    <div class="list-box">
      <div
        class="list-item"
        v-for="(item, i) in dataset1"
        :key="i"
      >
        <div class="list-content">
          <div class="list-title-box">
            <div class="list-icon">
              {{ item.icon }}
            </div>
            <p class="list-title">
              {{ item.title }}
            </p>
          </div>
          <div class="list-data">
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
  .list-box {
    width: 100%;
    height: 100%;
    padding: 26px 24px 20px;
    display: flex;
    flex-direction: column;
    .list-item {
      color: #fff;
      display: flex;
      align-items: center;
      flex-direction: row;
      // margin-bottom: 18px;
      padding: 14px 8px 14px;
      border-left: 1px solid #6ef0ff00;
      cursor: pointer;
      &:hover {
        position: relative;
        border-left: 1px solid #6EF0FF;
        background: linear-gradient(90deg, rgba(60,166,255,0.59), rgba(23,79,100,0.4), rgba(23,79,100,0));
        &::before,
        &::after {
          content: '';
          width: 5px;
          height: 5px;
          background: #6EF0FF;
          position: absolute;
          left: -3px;
        }
        &::before {
          top: -3px;
        }
        &::after {
          bottom: -3px;
        }
      }
      .list-content {
        width: 100%;
        margin-left: 10px;
        .list-title-box {
          display: flex;
          margin-bottom: 16px;
          .list-icon {
            width: 20px;
            height: 20px;
            background-color: rgba(255, 172, 172, 0.566);
          }
          .list-title {
            font-size: 18px;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: #FFFFFF;
            margin-left: 10px;
          }
        }
        .list-data {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          margin-left: 30px;
          .list-value {
            font-size: 30px;
            font-family: DINPro;
            font-weight: bold;
            color: #FFFFFF;
            text-shadow: 0 0 10px rgba(59, 99, 220, 0.3),
                         0 0 20px rgba(59, 99, 220, 0.4);
          }
          .list-unit,
          .list-percentage {
            font-size: 18px;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: #8F9CB2;
          }
          .list-unit {
            padding: 0 5px;
          }
          .list-percentage {
            padding: 0 4px;
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
