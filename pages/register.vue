<template>
	<register-form></register-form>
</template>

<script lang="ts">
import Vue from 'vue'

import registerForm from "@/components/register.vue";

export default {
	layout: 'session',
	components: {
		"register-form": registerForm
	}
};
</script>

<style lang="scss" scoped>
</style>