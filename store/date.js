export const state = () => ({
  selected: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
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
  }
}