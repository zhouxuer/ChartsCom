<template>
  <my-chart-bar :data="data" :settings="settings" :extend="extend"></my-chart-bar>
</template>

<script>
export default {
  name: 'bar',
  data() {
    return {
      data: {
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
        series: {
            data: [25, 75],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)',
              barBorderRadius: [20, 20, 20, 20]
            },
            itemStyle: { // 图形的形状
              barBorderRadius: [20, 20, 20, 20],
              color: '#37e9fc'
            },
            barCategoryGap: '50%',
            barWidth: '40%'
          // 设置柱间距离
          // backgroundColor: '#242526',
          // barCategoryGap: '20%',
          // barMaxWidth: 8,
          // itemStyle: {
          //   color: {
          //     type: 'linear',
          //     x: 0,
          //     y: 0,
          //     x2: 0,
          //     y2: 1,
          //     colorStops: [
          //       {
          //         offset: 0,
          //         color: '#111' // 0% 处的颜色
          //       },
          //       {
          //         offset: 1,
          //         color: '#fff'// 100% 处的颜色
          //       }
          //     ],
          //     global: false // 缺省为 false
          //   },
          //   borderRadius: 4
          // }
        },

        tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: '{b}:{c}%'
          },
          xAxis: {
            type: 'value',
            show: false,
            min: 0,
            max: 100
          },
          grid: {
            height: '60%',
            width: '75%',
            top: '20%'
          },
          yAxis: {
            position: 'right',
            type: 'category',
            data: ['博士', '硕士'],
            axisTick: {
              show: false
            },
            axisLine: { // 坐标轴 轴线
              show: false // 是否显示
            },
            axisLabel: {
              fontWeight: 'bold',
              color: '#37e9fc',
              fontSize: 16
            }
          }
        // tooltip: {
        //   trigger: 'axis',
        //   // 移入背景
        //   axisPointer: {
        //     type: 'shadow',
        //     snap: true,
        //     shadowStyle: {
        //       color: {
        //         type: 'linear',
        //         x: 0,
        //         y: 0,
        //         x2: 0,
        //         y2: 1,
        //         colorStops: [{
        //           offset: 0,
        //           color: 'rgba(15,150,150,0.3)' // 0% 处的颜色
        //         }, {
        //           offset: 1,
        //           color: 'rgba(15,150,150,0)' // 100% 处的颜色
        //         }]
        //       }
        //     }
        //   }
        // },

        // xAxis: {
        //   z: 99
        // },

        // yAxis: {
        //   type: 'value',
        //   // x轴默认线
        //   axisPointer: {
        //     value: '0',
        //     snap: true,
        //     lineStyle: {
        //       color: '#7581BD',
        //       width: 2
        //     },
        //     label: {
        //       show: true,
        //       formatter: function (params) {
        //         // console.log(params, '====');
        //         return params.value;
        //       },
        //       backgroundColor: '#7581BD'
        //     },
        //     handle: {
        //       show: true,
        //       color: '#7581BD'
        //     }
        //   }
        // }
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
</style>
