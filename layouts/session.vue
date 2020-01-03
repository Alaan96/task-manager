<template>
	<main>
		<h1 class="app-title">{{title}}</h1>
    <nuxt/>
    <!-- Notifications -->
    <notify></notify>
	</main>
</template>

<script>
import notify from '@/components/notify'

export default {
	data() {
    return {
      title: "Apepé",
    }
  },
  components: {
    notify
  }
}
</script>

<style lang="scss" scoped>
  main {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    position: relative;
  }
</style>