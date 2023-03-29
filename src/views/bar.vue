<template>
  <my-chart-bar
    class="chart-box"
    :data="data"
    :settings="settings"
    :extend="extend"
  ></my-chart-bar>
</template>

<script>
export default {
  name: 'bar',
  data() {
    return {
      data: {
        color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        columns: ['渠道', '访问量', '第二个'],
        // 一个数据为一个柱子[x轴标题, 第一个柱子值, 第二个柱子值], settings
        rows: [
          ['直接访问', 320, 308],
          ['邮件营销', 302, 308],
          ['联盟广告', 334, 308],
          ['视频广告', 390, 308],
          ['搜索引擎', 330, 308]
        ]
      },
      extend: {
        series: [
          {
            // 设置柱间距离
            // backgroundColor: '#242526',
            // barCategoryGap: '20%',
            // 柱子宽度
            name: '访问量',
            type: 'bar',
            barGap: 2,
            barMaxWidth: 2,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#3895e0' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#3895E01F' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              },
              borderRadius: 4
            }
          },
          {
            // 设置柱间距离
            // backgroundColor: '#242526',
            // barCategoryGap: '20%',
            // 柱子宽度
            name: '第二个',
            barMaxWidth: 2,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#236bb8' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#236BB833' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              },
              borderRadius: 4
            }
          }
        ],

        tooltip: {
          trigger: 'axis',
          // 移入背景
          axisPointer: {
            type: 'shadow',
            snap: true,
            shadowStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#BEDDFF52' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#95C8FF00' // 100% 处的颜色
                }]
              }
            }
          }
        },

        xAxis: {
          z: 99
        },

        yAxis: {
          type: 'value',
          // x轴默认线
          axisPointer: {
            value: '0',
            snap: true,
            lineStyle: {
              color: '#7581BD',
              width: 2
            },
            label: {
              show: true,
              formatter: function (params) {
                // console.log(params, '====');
                return params.value;
              },
              backgroundColor: '#7581BD'
            },
            handle: {
              show: true,
              color: '#7581BD'
            }
          }
        }
      },
      settings: {
        // 设置label
        // label: 'top',
        // show: true,
        backgroundColor: '#111',
        color: '#111',
        fontSize: '24px',
        fontWeight: 600,
        padding: [5, 0, 0, 0]
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.chart-box {
  width: 1000px !important;
  height: 400px !important;
  background-color: #131c3c;
}
</style>
