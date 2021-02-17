<template>
  <div id="user-avator">
    <img src="../assets/img/user.jpg"/>
    <el-dropdown class="user-name" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'User-avator',
  computed: {
    username () {
      return localStorage.getItem('username');
    }
  },
  methods: {
    handleCommand (command) {
      if (command == 'logout') {
        localStorage.removeItem('username');
        this.$router.push('/');
      }
    }
  }

}
</script>

<style scoped>
.user-avator img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-name {
  margin-left: 10px;
  /*margin-bottom: 10px;*/
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
