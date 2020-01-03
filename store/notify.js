export const state = () => ({
  text: 'Notifications',
  status: '',
  active: false
})

export const mutations = {
  showInfo(state, data) {
    if (data) {
      state.status = data.status
      state.text = data.message
      state.active = true
    }
  },
  hideInfo(state) {
    state.active = false
  }
}