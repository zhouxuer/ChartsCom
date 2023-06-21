<template>
  <div class="module-box">
    <div class="statistics-box" v-if="dataset">
      <div class="dialog-title">
        {{ dataset.title }}
      </div>
      <div class="dialog-list-box">
        <div
          class="dialog-list"
          v-for="(item,i) in dataset.list"
          :key="i"
          :class="item.percentage ? 'dialog-list-h' : ''"
        >
          <p class="list-name">{{ item.name }}</p>

          <div class="list-data-box">
            <div class="list-data">
              <div class="list-data-top">
                <p>{{ parseFloat(item.value).toLocaleString() }}</p>
                <span>{{ item.unit }}</span>
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
                  'color: #3AFF97' : 'color: #FF3A3A'"
                >
                  {{ item.percentage }} %
                </span>
              </div>
            </div>

            <div class="list-data list-data1" v-if="item.value1">
              <div class="list-data-top">
                <p>{{ parseFloat(item.value1).toLocaleString() }}</p>
                <span>{{ item.unit1 }}</span>
              </div>
              <div class="stat-percentage-box" v-if="item.percentage1">
                <i
                  v-if="item.percentage1"
                  :class="+item.percentage1 > 50 ?
                  'el-icon-top' : 'el-icon-bottom'"
                  :style="+item.percentage1 > 50 ?
                  'color: #3AFF97' : 'color: #FF3A3A'"
                ></i>
                <span
                  class="stat-percentage"
                  v-if="item.percentage"
                  :style="+item.percentage1 > 50 ?
                  'color: #3AFF97 ' : 'color: #FF3A3A '"
                >
                  {{ item.percentage1 }} %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dialog-progress-box">
        <div
          class="dialog-progress"
          v-for="(item,i) in dataset.progress"
          :key="i"
        >
          <div class="dialog-progress-list">
            <div class="progress-list-title">
              {{ item.name }}
            </div>
            <div class="progress-list-percentage">
              {{ item.percentage }}%
            </div>
            <div class="progress-list-other" v-if="item.unsettled">
              <p class="other-text">未结</p>
              <span class="other-value">{{ item.unsettled }}</span>
              <p class="other-text">件</p>
              <span class="other-value">{{ item.peopleNum }}</span>
              <p class="other-text">人</p>
            </div>
          </div>
          <el-progress :percentage="item.percentage" :color="item.customColor"></el-progress>
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
      type: Object,
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
    width: 321px;
    height: 357px;
    background: #074576;
    .dialog-title {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #21E2FF;
      line-height: 28px;
    }
    .dialog-list-box {
      margin-top: 20px;
      .dialog-list-h {
        .list-name {
          position: relative;
          top: -8px;
        }
      }
      .dialog-list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        .list-name {
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 25px;
        }
        .list-data-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          .list-data {
            display: flex;
            align-items: center;
            flex-direction: column;
            .list-data-top {
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-left: 20px;
              p {
                font-size: 22px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 30px;
              }
              span {
                font-size: 18px;
                color: #A6CBE6;
                margin-left: 4px;
              }
            }
          }
        }
      }
    }
    .dialog-progress-box {
      .dialog-progress {
        margin-top: 14px;
        ::v-deep .el-progress  {
          .el-progress-bar {
            padding-right: 0;
            .el-progress-bar__outer {
              // width: 241px;
              height: 4px !important;
              background: #8C9195;
            }
          }
          .el-progress__text {
            display: none;
          }
        }
        .dialog-progress-list {
          display: flex;
          justify-content: space-between;
          .progress-list-title {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 22px;
          }
          .progress-list-percentage {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 22px;
          }
          .progress-list-other {
            display: flex;
            .other-text {
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 22px;
            }
            .other-value {
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 22px;
            }
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
