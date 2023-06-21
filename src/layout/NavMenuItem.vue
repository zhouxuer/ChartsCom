<template>
  <div>
      <!-- 一级菜单 -->
    <el-menu-item v-if="!datas.children" :index="datas.path">
      <!-- <i :class="datas.icon"></i> -->
      <span slot="title">{{datas.title}}</span>
    </el-menu-item>
    <!-- 二级菜单 -->
    <el-submenu :index="datas.path" v-else >
        <template slot="title">
          <!-- <i :class="datas.icon"></i> -->
          <span>{{datas.title}}</span>
        </template>
       <!-- 多级菜单 -->
       <nav-menu-item  v-for="(item,i) in datas.children" :datas="item" :key="i"/>
      </el-submenu>
  </div>
</template>
<script>
export default {
  name: 'NavMenuItem',
  // 接收父组件传递的数据，进行渲染
  props: ['datas']
};
</script>