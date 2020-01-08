<template>
  <main>
    <nav-menu></nav-menu>

    <nuxt />

    <!-- Notifications -->
    <notify></notify>
  </main>
</template>

<script>
import menu from '@/components/menu'
import notify from '@/components/notify'

export default {
  components: {
    'nav-menu': menu,
    notify
  }
}
</script>

<style lang="scss" scoped>
	main {
    margin: 0 .5rem;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
	}
</style>
