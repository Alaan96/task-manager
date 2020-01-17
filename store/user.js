export const state = () => ({
  logged: localStorage.getItem('keepSession') || false,

  // id: '',
  name: '',
  email: '',
  birthday: '',
  tags: [
    {text: 'Tarea', color: '#66BBD1'},
    {text: 'Salud', color: '#F16D6D'},
    {text: 'Estudios', color: '#72D9A2'},
    { text: 'Eventos', color: '#E9B786'},
  ]
})

export const mutations = {
  login(state) {
    state.logged = true
  },
  logout(state) {
    state.logged = false
  },

  // setId(state, id) {
  //   state.id = id
  // },
  setUserData(state, user) {
    if (user) {
      state.name = user.name
      state.email = user.email
      state.birthday = user.birthday
      console.log('User data loaded correctly.')
    }
  }
}

export const getters = {
  // id(state) {
  //   return state.id
  // },
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