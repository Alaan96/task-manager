export const state = () => ({
  logged: localStorage.getItem('keepSession') || false,

  id: '',
  name: '',
  email: '',
  birthday: '',
  tags: [
    // {text: 'Tarea', color: '#66BBD1'},
    // {text: 'Salud', color: '#F16D6D'},
    // {text: 'Estudios', color: '#72D9A2'},
    // {text: 'Eventos', color: '#E9B786'},
  ],

  settings: {
  //   calendar_week_start: '',
  //   calendar_highlight_weekend: false,
  //   default_view: '',
  //   work_offline: false,
  //   dark_mode: false,
  },

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
      state.tags = user.tags

      state.settings = user.settings

      if (user.birthday) {
        // Format birthday
        let bd = new Date(user.birthday)
        state.birthday = `${bd.getDate()}/${bd.getMonth() + 1}/${bd.getFullYear()}`
      }

      state.loaded = true
      // console.log('User data loaded correctly.')
    }
  },
  addNewTag(state, tag) {
    state.tags.push(tag)
  },
  removeTag(state, tagRef) {
    const index = state.tags.findIndex(tag => tag.text === tagRef.text)
    state.tags.splice(index, 1)
  },
  updateTag(state, data) {
    if (data) {
      const index = state.tags.findIndex(tag => tag.text === data.old_tag.text)
      console.log(index);
      state.tags.splice(index, 1, data.tag)
      console.log(state.tags);
    }
  },
  setSettings(state, settings) {
    if (settings) {
      state.settings = settings
    }
  }
}

export const getters = {
  id: state => state.id,
  logged: state => state.logged,
  loaded: state => state.loaded,
  tags: state => state.tags,
  settings: state => state.settings
}

export const actions = {
  async download(context, url) {
    const data = await this.$axios.$get(url)
    if (data.status === 'success') {
      console.log(data)
      context.commit('setUserData', data.user)
    } else {
      console.log('Unable to load user data.')
    }
  },

  async fetchSettings({ commit }, url) {
    const data = await this.$axios.$get(url)
    if (data.status === 'success') {
      console.log(data)
      commit('setSettings', data.user.settings)
    } else {
      console.log('Settings not found.');
    }
  }
}