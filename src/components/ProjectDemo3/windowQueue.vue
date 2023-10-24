<template>
  <div class="module-box">
    <div
      class="module-list-box"
      v-for="(item,i) in dataset"
      :key="i"
    >
      <div class="window-title">
        {{ item.title }}
      </div>

      <div class="window-list-box">
        <div
          class="window-list"
          v-for="(window,i) in item.window"
          :key="i"
        >
          <p class="window-name">{{ window.name }}</p>

          <div class="list-data-box">
            <div class="people-list-acquiesce">
              <i
                class="el-icon-user-solid"
                v-for="people in new Array(10)"
                :key="people"
              ></i>
            </div>
            <div class="people-list">
              <i
                class="el-icon-user-solid"
                v-for="people in new Array(computeShowPeople(window.value))"
                :key="people"
              ></i>
            </div>
            <div class="people-num">
              {{ window.value }}
            </div>
            <div class="people-num">
              {{ window.value ? (window.value / 50 * 100).toFixed(0) : 0 }}%
            </div>
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
    dataset: {
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
    // 计算显示人数
    computeShowPeople(val) {
      const peopleNumP = (val / 50 * 100).toFixed(0)
      const peopleNum1 = peopleNumP.slice(0, 1)
      const peopleNum2 = peopleNumP.slice(1, 2) >= 5 ? 1 : 0
      const peopleNum = +peopleNum1 + +peopleNum2
      return peopleNum
    }
  }
};
</script>

<style lang="scss" scoped>
.module-box {
  width: 100%;
  height: 100%;
  display: flex;
  .module-list-box {
    height: 357px;
    background: #074576;
    margin: 10px 0 10px 10px;
    text-align: center;
    .window-title {
      margin-top: 20px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #21E2FF;
      line-height: 28px;
    }
    .window-list-box {
      display: flex;
      padding: 20px;
      .window-list {
        margin: 0 10px;
        text-align: center;
        .window-name {
          color: rgb(255, 255, 255);
          font-weight: bold;
          text-align: center;
          margin-bottom: 6px;
        }
        .list-data-box {
          width:  28px;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          text-align: initial;
          .people-list-acquiesce {
            .el-icon-user-solid {
              color: rgba(182, 182, 182, 0.477);
            }
          }
          .people-list {
            position: absolute;
            .el-icon-user-solid {
              color: rgb(234, 234, 234);
            }
          }
          .people-num {
            width: 28px;
            margin-top: 20px;
            color: rgb(255, 255, 255);
            font-weight: bold;
            text-align: center;
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
