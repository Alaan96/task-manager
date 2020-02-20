<template>
	<main>
		<!-- <logo></logo> -->
    <nuxt/>
    <!-- Notifications -->
    <notify></notify>
	</main>
</template>

<script>
// import logo from '@/components/logo'
import notify from '@/components/notify'

export default {
  components: {
    // logo,
    notify
  }
}
</script>

<style lang="scss" scoped>
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    position: relative;
  }
</style>