// 数据列表页面的数据滚动按钮
<template>
  <button
    :class="{
      'up-btn': type === 'up',
      'down-btn': type === 'down',
      disabled,
    }"
    v-on="$listeners"
  ></button>
</template>

<script>
export default {
  name: 'BiListButton',
  props: {
    // 按钮类型  up:上  down:下
    type: {
      type: String,
      default: 'up'
    },
    // 是否禁用  默认不禁用
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
// 公共样式
button {
  width: 60px;
  height: 16px;
  margin-right: 12px;
  border: none;
  border-radius: 8px;
  background-color: #3A3B3C;
}
// 上箭头按钮
.up-btn {
  background: #3A3B3C url(~@/assets/images/icon/icon_listup_nor.png)
    no-repeat center center;
  background-size: 16px 12px;
  // hover样式
  &:hover {
    cursor: pointer;
    background: #4A4B4D url(~@/assets/images/icon/icon_listup_hover.png)
      no-repeat center center;
    background-size: 16px 12px;
  }
  // 按下的样式
  &:active {
    background-color: #18191A;
  }
}
// 下箭头按钮
.down-btn {
  cursor: pointer;
  background: #3A3B3C url(~@/assets/images/icon/icon_listdown_nor.png)
    no-repeat center center;
  background-size: 16px 12px;
  // hover样式
  &:hover {
    background: #4A4B4D url(~@/assets/images/icon/icon_listdown_hover.png)
      no-repeat center center;
    background-size: 16px 12px;
  }
  // 按下的样式
  &:active {
    background-color: #18191A;
  }
}
// 上箭头按钮禁用
.up-btn.disabled {
  cursor: no-drop;
  background: #3A3B3C url(~@/assets/images/icon/icon_listup_dis.png)
    no-repeat center center;
  background-size: 16px 12px;
}
// 下箭头按钮禁用
.down-btn.disabled {
  cursor: no-drop;
  background: #3A3B3C url(~@/assets/images/icon/icon_listdown_dis.png)
    no-repeat center center;
  background-size: 16px 12px;
}
</style>
