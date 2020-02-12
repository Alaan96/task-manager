export const state = () => ({
  logged: localStorage.getItem('keepSession') || false,

  id: '',
  name: '',
  email: '',
  birthday: '',
  tags: [
    {text: 'Tarea', color: '#66BBD1'},
    {text: 'Salud', color: '#F16D6D'},
    {text: 'Estudios', color: '#72D9A2'},
    {text: 'Eventos', color: '#E9B786'},
  ],

  // Settings
  defaultView: '',
  weekStart: '',

  loaded: false
})

export const mutations = {
  login(state) {
    state.logged = true
  },
  logout(state) {
    state.logged = false
  },
  setUserData(state, user) {
    if (user) {
      state.id = user._id
      state.name = user.name
      state.email = user.email

      state.weekStart = user.weekStart || 'Lunes'
      state.defaultView = user.defaultView || 'date'
      
      // Format birthday
      let bd = new Date(user.birthday)
      state.birthday = `${bd.getDate()}/${bd.getMonth() + 1}/${bd.getFullYear()}`

      state.loaded = true
      console.log('User data loaded correctly.')
    }
  },
  changeView(state) {
    if (state.defaultView === 'calendar') {
      state.defaultView = 'date'
    } else if (state.defaultView === 'date') {
      state.defaultView = 'calendar'
    }
  },
  addNewTag(state, tag) {
    state.tags.push(tag)
  }
}

export const getters = {
  id(state) {
    return state.id
  },
  loaded(state) {
    return state.loaded
  },
  tags(state) {
    return state.tags
  }
}

export const actions = {
  async profileData(context, url) {
    const data = await this.$axios.$get(url)
    if (data.status === 'success') {
      console.log(data)
      context.commit('setUserData', data.user)
    } else {
      console.log('Unable to load user data.')
    }
  }
}