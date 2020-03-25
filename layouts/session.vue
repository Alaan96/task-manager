<template>
	<main>
		<logo></logo>
    <nuxt/>
    <!-- Notifications -->
    <!-- <notify></notify> -->
	</main>
</template>

<script lang="ts">
import Vue from 'vue'

import logo from '@/components/app-logo.vue'
// import notify from '@/components/notify'

export default Vue.extend({
  components: {
    logo,
    // notify
  }
})
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