<template>
  <div class="container">
    <div class="wrapper">
      <my-chart :options="options" fit></my-chart>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar'
export default {
 data() {
   return {
     options: {
        title: {
          text: 'ECharts柱状图'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
     }
   }
 }
}

</script>

<style lang="scss" scoped>
.container {
 width: 100%;
 height: 100%;
 min-height: 400px;
 position: relative;
}
.wrapper {
   position: absolute;
   width: 100%;
   height:100%;
}
</style>