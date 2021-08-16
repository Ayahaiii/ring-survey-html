import Vue from 'vue'
import Constant from './utils/limit'
import store from './store'
import { httpPost } from './utils/httpService'

Vue.directive('permission', {
  async inserted (el, binding) {
    const permissionList = store.state.permission
    const projectId = binding.value.projectId
    const permissionId = binding.value.permissionId

    if (!permissionList[projectId]) {
      let targetProjectPermission = await getPermission(projectId)
      store.commit('setPermission', {
        id: projectId,
        permission: targetProjectPermission
      })
    }

    if (permissionList[projectId].indexOf(Constant.R_ALL) == -1 && permissionList[projectId].indexOf(permissionId) == -1) {
      el.remove()
    }
  }
})

let getPermission = function(id) {
  // 调用接口获取项目权限,模拟获取数据
  return new Promise(resolve => {
    setTimeout(() => {
      let permissionList = []
      httpPost('/project/permission/' + id).then(res => {
        permissionList = res.data
        resolve(permissionList)
      })
    }, 500)
  })
}
