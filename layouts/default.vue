<template>
  <main>
    <nav-menu></nav-menu>

    <nuxt class="content"/>

    <!-- Notifications -->
    <notify></notify>
  </main>
</template>

<script>
import menu from '@/components/menu'
import notify from '@/components/notify'

import { helpers } from '@/assets/mixins/api-helpers' // Mixin

export default {
  components: {
    'nav-menu': menu,
    notify
  },
  mixins: [helpers],
  created() {
    this.setTokenInHeaders()

    this.loadTasksList()
    this.loadUserData()

    // this.setUserSettings()

  },
  methods: {
    async loadUserData() {
      let url = `${this.url}/user/${localStorage.getItem('id')}`
      await this.$store.dispatch('user/profileData', url)

      this.setUserSettings()
    },
    loadTasksList() {
      let url = `${this.url}/tasks/${localStorage.getItem('id')}`
      this.$store.dispatch('task/tasksDB', url)
    },
    setUserSettings() {
      let firstDay = this.$store.state.user.weekStart
      this.$store.commit('calendary/changeWeekStart', firstDay)
    }
  }
}
</script>

<style lang="scss" scoped>
	main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-x: hidden;
    & .nav-menu {
      flex: 0 1 4rem;
    }
    & .content {
      flex: 1;
    }
	}
</style>
