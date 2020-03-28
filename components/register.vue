<template>
  <register-form
    title="Completá con tus datos"
    :fields="fields"
    button="Registrarse"
    endpoint="register"
    @send="register($event)">
    <nuxt-link to="/login">Voler al login</nuxt-link>
  </register-form>
</template>

<script lang="ts">
import Vue from 'vue'

import registerForm from '@/components/form.vue'

export default Vue.extend({
  components: {
    'register-form': registerForm,
  },
  data() {
    return {
      fields: [
        {
          name: 'name',
          placeholder: 'Nombre',
          pattern: '^([a-zA-ZáÁéÉíÍóÓúÚñÑ]+)( [a-zA-ZáÁéÉíÍóÓúÚñÑ]+)?$',
          type: 'text'
        },
        {
          name: 'email',
          placeholder: 'Email',
          pattern: '^([a-zA-ZñÑ0-9-\S._]+)@([a-zA-ZñÑ0-9-\S_]+).([a-z]{2,8})(.[a-z]{2,8})?$',
          type: 'email'
        },
        {
          name: 'password',
          placeholder: 'Contraseña',
          pattern: '^([a-zA-Z0-9-\S!#$%&()*+,/:;<=>?@^_`|~]{8,30})',
          type: 'password'
        }
      ] as object[],
    }
  },
  methods: {
    register(res: any): void {
      console.log(res);
      if (res.status === 'success') {
				this.$router.push('/login')
			}
    }
  }
})
</script>

<style lang="scss" scoped>

</style>