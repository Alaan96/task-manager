<template>
	<login-form
		context="login"
		title="Ingresá a tu cuenta"
		storeModule="login"
		btnText="Ingresar">
		<nuxt-link to="/signin">Registrarse</nuxt-link>
	</login-form>
</template>

<script>
import loginForm from "@/components/form";

export default {
	data() {
		return {

		};
	},
	layout: 'session',
	components: {
		"login-form": loginForm
	}
};
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	width: 100%;
}
</style>