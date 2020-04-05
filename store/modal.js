export const state = () => ({
  date: false,
  task: false
})

export const mutations = {
  open(state, modal) {
    state[modal] = true
  },
  close(state, modal) {
    state[modal] = false
  }
}