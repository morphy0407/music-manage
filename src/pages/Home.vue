<template>
  <div>
    <LayoutHeader></LayoutHeader>
    <LayoutLeft></LayoutLeft>
    <div class="content-box" :class="{'content-collapse': collapse}">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import LayoutHeader from '../components/layout/Layout-header'
import LayoutLeft from '../components/layout/Layout-left'
import bus from '../assets/js/bus';

export default {
  name: 'Home',
  data () {
    return {
      collapse: false
    }
  },
  components: {LayoutLeft, LayoutHeader},
  created () {
    // 通过bus进行组件间的通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
    })
  }
}
</script>

<style scoped>

</style>
