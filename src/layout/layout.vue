<template>
  <!-- <my-wrapper fit title="项目模板首页示例">
  </my-wrapper> -->
  <el-container>
    <el-header>
      <el-menu
        router
        :default-active="this.$router.currentRoute.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="(item, i) in menuList"
          :key="i"
          :index="item.path"
        >{{ item.title }}</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <!-- <transition name="fade" mode="in-out"> -->
      <transition name="fade" mode="out-in">
        <router-view ></router-view>
      </transition>
      <!-- <router-view></router-view> -->
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      menuList: this.$router.options.routes[0].children
    };
  },
  created() {},
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter {
 opacity:0;
}
.fade-leave{
 opacity:1;
}
.fade-enter-active{
 transition:opacity 1s;
}
.fade-leave-active{
 transition:opacity 1s;
}
.el-header {
  color: rgb(0, 0, 0);
  text-align: center;
  line-height: 60px;
  padding: 0;
  .el-menu-demo {
    background-color: rgb(234, 250, 254);
    .el-menu-item {
      color: rgb(74, 74, 74);
    }
    .is-active {
      background-color: rgb(255, 255, 255);
      color: rgb(0, 0, 0);
    }
  }
}
.el-main {
  color: #333;
  text-align: center;
  height: calc(100vh - 60px);
}
</style>
