<template>
  <div id="layout-header" class="el-menu-vertical">
    <div class="btn-collapse" @click="collapseChange">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">music后台管理</div>
    <div class="layout-header-right">
      <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip :content="fullscreen ? '取消全屏' : '全屏'" placement="bottom">
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <div class="user-avator">
        <user-avator></user-avator>
      </div>
    </div>

  </div>
</template>

<script>
import bus from '../../assets/js/bus'
import UserAvator from '../User-avator';

export default {
  name: 'Layout-header',
  components: {UserAvator},
  data () {
    return {
      isCollapse: false,
      fullscreen: false
    }
  },
  methods: {
    // 侧边栏折叠
    collapseChange () {
      this.isCollapse = !this.isCollapse
      bus.$emit('collapse', this.isCollapse)
    },
    // 全屏事件
    handleFullScreen () {
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webKitCancleFullScreen) { // safari、chrome
          document.webKitCancleFullScreen()
        } else if (document.mozCancleFullScreen) { // firefox
          document.mozCancleFullScreen()
        } else if (document.msExitFullScreen) { // ie
          document.msExitFullScreen()
        }
      } else {
        let element = document.documentElement
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webKitRequestFullscreen) { // safari、chrome
          element.webKitRequestFullscreen()
        } else if (element.mozRequestFullscreen) { // firefox
          element.mozRequestFullscreen()
        } else if (element.msRequestFullscreen) { // ie
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }

}
</script>

<style scoped>
#layout-header {
  position: relative;
  background-color: #253041;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #ffffff;
}

.btn-collapse {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}

.logo {
  position: relative;
  float: left;
  line-height: 70px;
}

.layout-header-right {
  float: right;
  height: 70px;
  padding-right: 50px;
  align-items: center;
  display: flex;

}

.btn-fullscreen {
  margin-right: 5px;
  font-size: 24px;
  transform: rotate(45deg);
}

.user-avator {
  margin-left: 20px;
}

</style>
