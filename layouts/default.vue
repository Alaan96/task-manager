<template>
  <main>
    <nuxt />

    <!-- Notifications -->
    <notify></notify>
  </main>
</template>

<script>
import notify from '@/components/notify'

export default {
  components: {
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
