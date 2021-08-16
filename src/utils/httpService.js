import axios from 'axios';
import VueCookies from 'vue-cookies'
let qs = require('qs');

axios.defaults.withCredentials = true;

// let baseUrl = 'http://192.168.1.153:8069/ringinterviewapi';
let baseUrl = 'http://192.168.1.159:8069/ringinterviewapi';
// let baseAuthUrl = 'http://192.168.1.153:8065/auth';
let baseAuthUrl = `http://175.102.15.229:18900/uums`;

/**
 * get 请求
 */
const httpGet = function (url = '', data = {}) {
  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    headers: {
      'Accept': 'application/json;charset=UTF-8',
      'content-type': 'application/json',
      'Authorization': VueCookies.get("tokenWeb") ? 'Bearer ' + VueCookies.get("tokenWeb") : ""
    }
  });
  return instance.get(url, {
    params: data
  }).then((result) => {
    var res = result.data;
    if(res && res.code === 0) {
      return Promise.resolve(res);
    } else {
      if (res.code === 15000){
        this.$message({
          message: '系统异常',
          type: 'warning'
        });
        return res;
      } else if (res.code === 10000) {
        this.$message({
          message: res.message,
          type: 'warning'
        });
        return res;
      }
      return Promise.resolve(res);
    }
  }).catch((error) => {
    let res = error.response
    if (res.status === 400 || res.status === 401) {
      if (res.data) {
        this.$message({
          message: res.data.message,
          type: 'warning'
        });
        this.$cookies.remove("tokenWeb");
        this.$cookies.remove("userInfo");
      } else {
        this.$message({
          message: '登陆信息已失效,请重新登陆',
          type: 'warning'
        });
      }
      this.$router.push('/login');
      return res;
    } else if (res.status === 500) {
      this.$router.push('/500');
    }
    res = {
      code: -1,
      message: '网络请求异常，请稍后再试或联系客服！'
    }
    console.log('网络请求错误');
    return res;
  })
}

/**
 * post 请求
 */
const httpPost = function (url = '', data = {}) {
  let tempUrl = url.indexOf("centerAuth") != -1 ? baseAuthUrl : baseUrl;
  const instance = axios.create({
    baseURL: tempUrl,
    withCredentials: false,
    headers: {
      'Accept': 'application/json;charset=UTF-8',
      'content-type': 'application/json',
      'Authorization': VueCookies.get("tokenWeb") ? 'Bearer ' + VueCookies.get("tokenWeb") : ""
    }
  });
  return instance.post(url, JSON.stringify(data)).then((result) => {
    var res = result.data;
    if(res && res.code === 0) {
      return Promise.resolve(res);
    } else {
      if (res.code === 15000){
        this.$router.push('/stop');
        return res;
      } else if (res.status === 1000) {
        this.$router.push('/unauthorized');
        return res;
      }else {
        this.$message({
          message: res.message,
          type: 'warning'
        });
        return Promise.resolve(res);
      }

    }
  }).catch((error) => {
    let res = error.response
    if (!res) {
      this.$router.push('/500');
      this.$cookies.remove("tokenWeb");
      this.$cookies.remove("userInfo");
      return
    }
    if (res.status === 400 || res.status === 401) {
      if (res.data) {
        this.$message.closeAll()
        this.$message({
          message: '登陆信息已失效,请重新登陆',
          type: 'warning'
        });
        this.$cookies.remove("tokenWeb");
        this.$cookies.remove("userInfo");
      } else {
        this.$message({
          message: '登陆信息已失效,请重新登陆',
          type: 'warning'
        });
      }
      this.$router.push('/login');
      return res;
    }
    res = {
      code: -1,
      message: '网络请求异常，请稍后再试或联系客服！'
    }
    console.log('网络请求错误');
    return res;
  })
}

/**
 * post 请求 uums
 */
const httpPostIsAnonymous = function (url = '', data = {}) {
  const instance = axios.create({
    baseURL: baseAuthUrl,
    withCredentials: false,
    headers: {
      'Accept': 'application/json;charset=UTF-8',
      'content-type': 'application/json'
    }
  });
  return instance.post(url, JSON.stringify(data)).then((result) => {
    var res = result.data;
    if(res && res.code === 0) {
      return Promise.resolve(res);
    } else {
      if (res.code === 15000){
        this.$message({
          message: '网络请求异常，请稍后再试或联系客服！',
          type: 'warning'
        });
        return res;
      }
      return Promise.resolve(res);
    }
  }).catch(() => {
    let res = {
      code: -1,
      message: '网络请求异常，请稍后再试或联系客服！'
    }
    console.log('网络请求错误');
    return res;
  })
}

/**
 * 认证请求
 */
const httpPostToken = function (url = '', data) {
  const instance = axios.create({
    baseURL: baseAuthUrl,
    withCredentials: false,
    headers: {
      'Authorization': 'Basic bW9uZXR3YXJlOm1vbmV0d2FyZTIwMTkuQHNoLmNvbQ==',
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  });
  return instance.post(url, data).then((result) => {
    var res = result.data;
    if(result && result.status === 200) {
      if (res != null && res.access_token != null && res.access_token != '') {
        this.$cookies.set("tokenWeb", res.access_token, 2 * 60 * 60);
        this.$cookies.set("userInfo", JSON.stringify(res.userInfo), 2 * 60 * 60);
        res = {
          code: 0,
          message: '登录成功'
        }
        return Promise.resolve(res);
      } else {
        res = {
          code: -1,
          message: '认证失败，请稍后再试或联系客服！'
        }
        return res;
      }
    }
  }).catch((error) => {
    let res = error.response
    if (res.status === 400 || res.status === 401 || res.status ===500) {
      res = {
        code: res.data.code,
        message: res.data.message
      }
      return res;
    }
    res = {
      code: -1,
      message: '网络请求异常，请稍后再试或联系客服！'
    }
    console.log('网络请求错误');
    return res;
  })
}

export {
  baseUrl,
  baseAuthUrl,
  httpGet,
  httpPost,
  httpPostIsAnonymous,
  httpPostToken,
}
