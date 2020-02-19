<template>
	<login-form
		context="login"
		title="Ingresá a tu cuenta"
		storeModule="login"
		btnText="Ingresar">
		<nuxt-link to="/signin">Registrarse</nuxt-link>
		<span @click="$store.commit('modal/showModal')">No recuerdo la contrseña</span>

		<password-reset
			title="Cambio de contraseña"
			:fields="fields"
			description="Se enviará un mail con el link para hacer el cambio de contraseña."
			button="Enviar"
			ctx="password-reset">
			<!-- <span @click="$store.commit('modal/hideModal')">Cancelar cambio</span> -->
		</password-reset>
	</login-form>
</template>

<script>
import form from '@/components/form'
import passReset from '@/components/password-reset'

export default {
	layout: 'session',
	components: {
		"login-form": form,
		'password-reset': passReset
	},
	data() {
		return {
			fields: [
        {
          placeholder: "Email",
          name: "email",
          pattern:
            "^([a-zA-ZñÑ0-9-\S._]+)@([a-zA-ZñÑ0-9-\S_]+).([a-z]{2,8})(.[a-z]{2,8})?$",
          type: 'email'
        },
      ]
		}
	},
}
</script>

<style lang="scss" scoped>
a {
	font-weight: 600;
}

span {
	margin-top: 2rem;
	// font-size: .875rem;
	font-weight: 600;
	color: $secondary;
}
</style>