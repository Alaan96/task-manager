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

export default {
  components: {
    'nav-menu': menu,
    notify
  },
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
