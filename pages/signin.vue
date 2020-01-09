<template>
	<signin-form
		context="signin"
		title="Completá con tus datos"
		storeModule="signin"
		btnText="Registrarse">
		<nuxt-link to="/login">Volver a Login</nuxt-link>
	</signin-form>
</template>

<script>
import signinForm from "@/components/form";

export default {
	data() {
		return {

		};
	},
	layout: 'session',
	components: {
		"signin-form": signinForm
	}
};
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	width: 100%;
}
</style>