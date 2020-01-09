<template>
  <div class="container">
    <!-- Ruta de cambio de contraseña con el token {{$route.params.token}} -->
    <password-change
      title="Nueva contraseña"
      :fields="fields"
      description='Si usted solicitó un cambio de contraseña llene el campo y haga click en "Cambiar".'
      button="Cambiar"
      context="new-password"
      :params="token">
      <nuxt-link to="/login">Volver a Login</nuxt-link>
    </password-change>
  </div>
</template>

<script>
import passChange from '@/components/password-reset'

export default {
  components: {
    'password-change': passChange
  },
  data() {
    return {
      token: '',
      fields: [
        {
          placeholder: "Nueva contraseña",
          name: "password",
          pattern:'^([a-zA-Z0-9-\S!#$%&() * +,/:;<=>?@^_`|~]{8,30})',
          type: 'password'
        },
      ]
    }
  },
  beforeMount() {
    let token = localStorage.getItem('token')
    if (!token) {
      console.log('Redireccionado lince.')
      // this.$router.push('/')
    }
    this.token = '/' + token
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include center;
}
a {
  color: $secondary;
}
</style>