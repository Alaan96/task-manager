<template>
	<login-form></login-form>
</template>

<script lang="ts">
import Vue from 'vue'

import login from '@/components/login.vue'

export default Vue.extend({
	layout: 'session',
	components: {
		"login-form": login,
	},
})
</script>

<style lang="scss" scoped>
</style>