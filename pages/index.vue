<template>
  <div class="container">
    <calendar></calendar>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import calendar from '@/components/calendar/calendar.vue'

import { mapState } from 'vuex'

export default Vue.extend({
  components: {
    calendar,
  },
  // middleware: 'authenticated',
  async fetch({ $axios, store }) {
    try {
      $axios.defaults.headers.common.token = localStorage.getItem('token')
      const loaded = store.getters['user/loaded']
      if (loaded === false) {
        const id = localStorage.getItem('id')
        // Load user data
        await store.dispatch('user/profileData', `${location.origin}/user/${id}`)

        // Load tasks
        await store.dispatch('task/tasksDB', `${location.origin}/tasks/${id}`)
      }
    } catch(err) {
      if (err.response.data) {
        console.warn(err.response.data)
      } else {
        console.log(err)
      }
    }
  },
  created() {
    const firstDay = this.$store.state.user.weekStart
    this.$store.commit('calendar/changeWeekStart', firstDay)
  },
  beforeMount() {
    // this.openBirthdayModal()
  },
  methods: {
    // openBirthdayModal() {
    //   if (!this.$store.state.user.birthday || this.$store.state.user.birthday === '') {
    //     console.log('noo ai birdei', this.$store.state.user.birthday)
    //     this.$store.commit('modal/showModal')
    //   } else {
    //     console.log('si ai', this.$store.state.user.birthday)
    //   }
    // }
  }
})
</script>

<style lang="scss" scoped>
.container {
  padding: 0 1rem;
  padding-bottom: 1rem;
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
