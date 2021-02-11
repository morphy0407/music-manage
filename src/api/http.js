import axios from 'axios'
import router from 'vue-router'
// axios设置
// 超时时间5s
axios.defaults.timeout = 5000
// 允许跨域
axios.defaults.withCredentials = true
// 响应头Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// 基础url
axios.defaults.baseURL = 'http://localhost:8888/musicserver'

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 200说明访问接口成功，否则错误
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401: // 未登录
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}
          });
          break;
        case 404: // 没找到
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * 封装get方法
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  });
}

/**
 * 封装post方法
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  });
}

