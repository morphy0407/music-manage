<template>
  <div class="sidebar">
    <!--isCollpse属性控制折叠侧边栏-->
    <Menu :is-collapse="collapse"></Menu>
  </div>
</template>

<script>
import Menu from '../Menu';
import bus from '../../assets/js/bus';


export default {
  name: 'Layout-left',
  data () {
    return {
      collapse: false
    }
  },
  components: {Menu},
  created () {
    // 通过bus进行组件间的通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
    })
  }

}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  background-color: #334256;
  /*侧边栏滚动*/
  /*overflow-y: scroll;*/
}

.sidebar::-webkit-scrollbar {
  width: 0;
}
</style>
