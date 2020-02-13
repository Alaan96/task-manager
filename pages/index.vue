<template>
  <div class="container">
    <button class="toggle-view" @click="changeView()">
      Vista: {{buttonText}}
    </button>

    <date v-show="view === 'date'"></date>
    <calendar v-show="view === 'calendar'"></calendar>
    <task-list></task-list>

    <!-- <set-birthday></set-birthday> -->
  </div>
</template>

<script>
import date from '@/components/date'
import calendar from '@/components/calendar/calendar'
import list from '@/components/task/list'
import setBirthday from '@/components/set-birthday'

import { mapState } from 'vuex'

export default {
  components: {
    date,
    calendar,
    'task-list': list,
    'set-birthday': setBirthday
  },
  middleware: 'authenticated',
  async asyncData({ $axios, store }) {
  // async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    $axios.defaults.headers.common.token = localStorage.getItem('token')
    try {
      let loaded = store.getters['user/loaded']
      if (loaded === false) {
        // Load user data
        const userUrl = `${window.location.origin}/user/${localStorage.getItem('id')}`
        await store.dispatch('user/profileData', userUrl)

        // Load tasks
        const taskUrl = `${window.location.origin}/tasks/${localStorage.getItem('id')}`
        await store.dispatch('task/tasksDB', taskUrl)

        return {fetchMsg: 'Content loaded.'}
      } else {
        return {fetchMsg: 'Content was already loaded.'}
      }
    } catch(err) {
      console.warn(err)
      return {fetchMsg: `Error loading the content. Error: ${err}`}
    }
  },
  created() {
    const firstDay = this.$store.state.user.weekStart
    this.$store.commit('calendar/changeWeekStart', firstDay)
  },
  beforeMount() {
    this.userLogged()
    // this.openBirthdayModal()
  },
  methods: {
    userLogged() {
      if (!this.$store.state.user.logged) {
        this.$router.push('/login')
      } else {
        console.log('The user is logged.')
      }
    },

    changeView() {
      this.$store.commit('user/changeView')
    },
    // openBirthdayModal() {
    //   if (!this.$store.state.user.birthday || this.$store.state.user.birthday === '') {
    //     console.log('noo ai birdei', this.$store.state.user.birthday)
    //     this.$store.commit('modal/showModal')
    //   } else {
    //     console.log('si ai', this.$store.state.user.birthday)
    //   }
    // }
  },
  computed: {
		list() {
			return this.$store.getters['task/getFullList']
    },
    buttonText() {
      const view = this.view
      if (view === 'calendar') {
        return 'calendario'
      }
      if (view === 'date') {
        return 'diaria'
      }
    },
    ...mapState('user', {
      view: 'defaultView'
    })
	}
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 1rem;
  padding-bottom: 2rem;
}

button.toggle-view {
  width: 10em;
  height: 2rem;
  position: absolute;
  top: .5rem;
  right: .5rem;
  font-size: .75rem;
  font-family: $niramit;
  color: $light;
  border-radius: $radius;
  transition: .2s ease;
  &:hover {
    background: $line;
  }
}
</style>
