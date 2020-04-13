export const state = () => ({
  task: false,
  date: false,
  tags: false
})

export const mutations = {
  open(state, modal) {
    state[modal] = true
  },
  close(state, modal) {
    state[modal] = false
  }
}

// export const getters = {
//   some_active(state) {
//     const modals = Object.values(state)
//     const active = modals.some( (modal) => modal === true)
//     if (active === true) {
//       console.log('Hay ventanas activas');
//       return true
//     }
//     return false
//   }
// }