export const state = () => ({
  list: [],
  edit: '',
  // update: false
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
  },
  setForEdition(state, id) {
    if (id) {
      state.edit = id
    }
  },
  edited(state, changes) {
    if (changes) {
      const id = state.edit
      const properties = Object.keys(changes)
      const index = state.list.findIndex( task => task._id === id)
      
      if (index !== -1) {
        properties.forEach( prop => {
          state.list[index][prop] = changes[prop]
        })
        console.log(state.list[index]);
        // state.update = true
        state.edit = ''
      }
    }
  },
  // listUpdated(state) {
  //   // state.update = false
  // }
}

export const getters = {
  list: state => state.list,
  forEdition: state => state.list.find( (task) => task._id === state.edit )
}

export const actions = {
  async download(context, url) {
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