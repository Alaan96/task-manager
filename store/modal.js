export const state = () => ({
  active: true
})

export const mutations = {
  showModal(state) {
    state.active = true
  },
  hideModal(state) {
    state.active = false
  }
}

export const getters = {
  activeState(state) {
    return state.active
  }
}