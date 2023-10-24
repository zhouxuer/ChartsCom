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
        <!--将子菜单抽取出来，做为一个子组件-->
        <!-- <nav-menu-item v-for="(item,index)  in menuData" :key="index" :datas="item"/> -->
        <nav-menu-item v-for="(item,i)  in menuList" :key="i" :datas="item"/>
      </el-menu>
      <!-- <el-menu
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
      </el-menu> -->
    </el-header>
    <el-main>
      <!-- <transition name="fade" mode="in-out"> -->
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <!-- <router-view></router-view> -->
    </el-main>
  </el-container>
</template>

<script>
import NavMenuItem from './NavMenuItem.vue';
export default {
  name: 'index',
  components: {
    NavMenuItem
  },
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
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  .el-menu-demo {
    display: flex;
    background-color: rgb(234, 250, 254);
    ::v-deep .el-menu-item {
      color: rgb(99, 92, 92);
    }
    ::v-deep .el-submenu {
      .el-submenu__title {
        color: rgb(99, 92, 92);
      }
    }
    ::v-deep .is-active {
      background-color: #bae7ff;
      color: rgb(0, 0, 0);
      .el-submenu__title {
        background-color: #bae7ff;
        color: rgb(0, 0, 0);
      }
    }
  }
}
.el-main {
  color: #333;
  text-align: center;
  position: fixed;
  top: 60px;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
