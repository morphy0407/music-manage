<template>
  <div class="login-wrap">
    <div class="ms-title">music 后台管理登录</div>
    <div id="login-content">
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item id="login-btn">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getLoginStatus} from '../api/index'
import {mixin} from '../mixins/index'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        username: 'admin',
        password: '123'
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空!', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空!', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!');
      let params = new URLSearchParams();
      params.append('username', this.form.username);
      params.append('password', this.form.password);
      getLoginStatus(params)
        .then(res => {
          if (res.code == 1) {
            // 存用户名
            localStorage.setItem('username', this.form.username);
            this.notify('登录成功', 'success');
            this.$router.push('/info');
          } else {
            this.notify('登录失败', 'error');
          }
        });
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  background: url("../assets/img/background.jpg");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}

#login-btn {
  text-align: center;
}

#login-content {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin-left: -190px;
  margin-top: -150px;
  padding: 40px;
  border-radius: 5px;
  background: white;
}
</style>
