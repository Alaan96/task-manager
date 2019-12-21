export const state = () => ({
  today: new Date()
})

export const getters = {
  today(state) {
    return state.today
  },
  fullDate(state) {
    return `${state.today.getDate()}/${state.today.getMonth()}/${state.today.getFullYear()}`
  }
}