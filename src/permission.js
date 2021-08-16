import router from './router'
import store from './store'
import { Message } from 'element-ui';
import Constant from './utils/limit'
import { httpPost } from './utils/httpService'
import VueCookies from 'vue-cookies'

const whiteList = ['/login', '/register', '/findPassword', '/privacyPolicy']

router.beforeEach(async (to, from, next) => {
  if (VueCookies.isKey("tokenWeb")) {
    if (to.path === '/login') {
      next('/project')
    }
    let userInfo = VueCookies.get("userInfo");
    if (userInfo && !userInfo.hasOwnProperty("ifLoginRI")) {
      httpPost("/user/permission", null).then(res => {
        if (res && res.code === 0) {
          userInfo.ifLoginRI = true;
          VueCookies.set("userInfo", userInfo);
        }
      })
    }
    const permissionList = store.state.permission
    const toPermissionId = to.meta.permissionId
    const projectId = to.query.id

    if (toPermissionId) { // 需要权限的页面
      if (!permissionList[projectId]) { // 调用接口从后端获取权限
        let targetProjectPermission = await getPermission(projectId)
        store.commit('setPermission', {
          id: projectId,
          permission: targetProjectPermission
        })
        setTimeout(() => {
        
        }, 1.5 * 1000)
      }
      if (permissionList[projectId].indexOf(Constant.R_ALL) != -1 || permissionList[projectId].indexOf(toPermissionId) != -1) {
        next()
      } else {
        next('/unauthorized')
      }
    } else { // 不需要权限的页面
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      Message({
        type: 'info',
        message: '登陆信息已失效,请重新登陆'
      })
      next('/login')
    }
  }
})

let getPermission = function (id) {
  // 调用接口获取项目权限,模拟获取数据
  return new Promise(resolve => {
    setTimeout(() => {
      let permissionList = []
      httpPost('/project/permission/' + id).then(res => {
        if (res.code == 0) {
          permissionList = res.data
          resolve(permissionList)
        } else if (res.code === 10001 || res.code === 10002 || res.code === 10003) {
          Message({
            type: 'error',
            message: res.message
          })
          router.push('/login')
        }
      }).catch(error => {
        router.push('/login')
      })
    }, 500)
  })
}
