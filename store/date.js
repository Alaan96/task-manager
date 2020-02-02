export const state = () => ({
  selected: '',
  today: new Date()
})

export const mutations = {
  changeSelected(state, date) {
    if (state.selected !== date) {
      state.selected = date
    }
  }
}

export const getters = {
  selected(state) {
    return state.selected
  },
  today(state) {
    return state.today
  },
  todayFullDate(state) {
    const formatDate = date => date < 10 ? `0${date}` : date
    return `${formatDate(state.today.getDate())}/${formatDate(state.today.getMonth() + 1)}/${state.today.getFullYear()}`
  }
}