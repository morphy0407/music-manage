<template>
  <div if="menu">
    <el-menu
      :default-active="onRoutes"
      class="sidebar-el-menu"
      :collapse="isCollapse"
      background-color="#334256"
      text-color="#ffffff"
      active-text-color="#20a0ff"
      router>
      <template v-for="item in items">
        <el-menu-item :index="item.index" :key="item.index">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'Menu',
  props: ['isCollapse'],
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-document',
          index: 'info',
          title: '系统首页'
        },
        {
          icon: 'el-icon-document',
          index: 'user',
          title: '用户管理'
        },
        {
          icon: 'el-icon-document',
          index: 'singer',
          title: '歌手管理'
        },
        {
          icon: 'el-icon-document',
          index: 'songList',
          title: '歌单管理'
        }
      ]
    }
  },
  computed: {
    onRoutes: function () {
      return this.$route.path.replaceAll('/', '');
    }
  }
}

</script>

<style scoped>
.sidebar-el-menu:not(el-menu--collapse) {
  width: 150px;
}
</style>
