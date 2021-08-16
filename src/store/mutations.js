/* eslint-disable */
const mutations = {
  setPermission (state, payload) {
    state.permission[payload.id] = payload.permission
  }
}

export default mutations
