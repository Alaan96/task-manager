<template>
  <div class="container">
    <password-change-form
      title="Ingresar nueva contraseña"
      :formFields="fields"
      btnText="Cambiar"
      context="new-password"
      :validate="false"
      :params="passToken">
      <nuxt-link to="/login">Volver a login</nuxt-link>
    </password-change-form>
  </div>
</template>

<script>
import logo from '@/components/logo'
// import passChange from '@/components/password-reset'
import passwordChangeForm from '@/components/form'

export default {
  components: {
    logo,
    'password-change-form': passwordChangeForm
  },
  layout: 'session',
  data() {
    return {
      passToken: '',
      fields: [
        {
          placeholder: "Contraseña",
          name: "password",
          pattern:'^([a-zA-Z0-9-\S!#$%&() * +,/:;<=>?@^_`|~]{8,30})',
          type: 'password'
        },
        {
          placeholder: "Repetir contraseña",
          name: "repeatPassword",
          pattern:'^([a-zA-Z0-9-\S!#$%&() * +,/:;<=>?@^_`|~]{8,30})',
          type: 'password'
        },
      ]
    }
  },
  beforeMount() {
    let passToken = localStorage.getItem('pass-token')
    if (!passToken) {
      console.log('Redireccionado lince.')
      this.$router.push('/')
    }
    this.passToken = '/' + passToken
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
}
a {
  font-weight: 600;
}
</style>