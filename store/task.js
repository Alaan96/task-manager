export const state = () => ({
  list: []
})

export const mutations = {
  addTask(state, task) {
    let isIncluded = state.list.includes(task)
    if (task && !isIncluded) {
      state.list.unshift(task)
      console.log('Task added correctly.')
    }
    console.log('Task already exist in the list.')
  },

  setList(state, list) {
    state.list = list
  },
  addLast(state, task) {
    state.list.push(task)
  },
  deleteOne(state, index) {
    state.list.splice(index, 1)
  }
}

export const getters = {
  list(state) {
    return state.list
  }
}

export const actions = {
  async tasksDB(context, url) {
    const data = await this.$axios.$get(url)
    if (data.status === 'success') {
      console.log(data)
      context.commit('setList', data.tasks)
    } else {
      console.log('Unable to load task list.')
    }
  },
  async lastSaved(context, url) {
    const data = await this.$axios.$get(url)
    if (data.status === 'success') {
      context.commit('addLast', data.task)
      console.log('Last task added correctly.')
    } else {
      console.log('Task not found.')
    }
  }
}