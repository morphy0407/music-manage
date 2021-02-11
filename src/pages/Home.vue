<template>
  <div>
    <LayoutHeader></LayoutHeader>
    <LayoutLeft></LayoutLeft>
    <div>后台首页</div>
    <router-view></router-view>
  </div>
</template>

<script>
import LayoutHeader from '../components/layout/Layout-header'
import LayoutLeft from '../components/layout/Layout-left'

export default {
  name: 'Home',
  components: {LayoutLeft, LayoutHeader},
}
</script>

<style scoped>

</style>
