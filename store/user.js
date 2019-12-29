export const state = () => ({
  logged: false
})

export const mutations = {
  login(state) {
    state.logged = true
  }
}