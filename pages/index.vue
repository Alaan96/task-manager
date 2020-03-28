<template>
  <div class="container">
    <h1>Inicio</h1>

    <!-- <date v-show="view === 'date'"></date>
    <calendar v-show="view === 'calendar'"></calendar>
    <task-list></task-list> -->

    <!-- <set-birthday></set-birthday> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import date from '@/components/date.vue'
import calendar from '@/components/calendar/calendar.vue'
import list from '@/components/task/list.vue'
// import setBirthday from '@/components/set-birthday.vue'

import { mapState } from 'vuex'

export default Vue.extend({
  components: {
    date,
    calendar,
    'task-list': list,
    // 'set-birthday': setBirthday
  },
  middleware: 'authenticated',
  async fetch({ $axios, store }) {
    try {
      // $axios.defaults.headers.common.token = localStorage.getItem('token')
      let loaded = store.getters['user/loaded']
      if (loaded === false) {
        const id = localStorage.getItem('id')
        // Load user data
        // await store.dispatch('user/profileData', `${location.origin}/user/${id}`)

        // Load tasks
        // await store.dispatch('task/tasksDB', `${location.origin}/tasks/${id}`)

        // return {fetchMsg: 'Content loaded.'}
      } else {
        // return {fetchMsg: 'Content was already loaded.'}
      }
    } catch(err) {
      if (err.response.data.message) {
        console.warn(err.response.data.message)
      } else {
        console.log(err)
      }
      // return {fetchMsg: `Error loading the content. Error: ${err}`}
    }
  },
  created() {
    // const firstDay = this.$store.state.user.weekStart
    // this.$store.commit('calendar/changeWeekStart', firstDay)
  },
  beforeMount() {
    // this.userLogged()
    // this.openBirthdayModal()
  },
  methods: {
    // userLogged() {
    //   if (!this.$store.state.user.logged) {
    //     this.$router.push('/login')
    //   }
    // },

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
		list(): object[] {
			return this.$store.getters['task/getFullList']
    },
	}
})
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
  font-size: .875rem;
  font-family: $niramit;
  color: $light;
  border-radius: $radius;
  transition: .2s ease;
  &:hover {
    background: $line;
  }
}
</style>
