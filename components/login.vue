<template>
  <login-form
    title="Ingresá a tu cuenta"
    :fields="fields"
    button="Ingresar"
    endpoint="login"
    @send="login($event)">

    <template v-slot:options>
      <div class="options">

        <check type="checkbox" id="keep-session" :val="keepSession" v-model="keepSession">
          <div class="keep-session">
            <check-icon :checked="keepSession" />
            <label for="keep-session">Mantener sesión</label>
          </div>
        </check>
  
        <button class="password-reset">Olvidé la contraseña</button>
      </div>
    </template>

    <nuxt-link to="/register">Registrarse</nuxt-link>
  </login-form>
</template>

<script lang="ts">
import Vue from 'vue'

import loginForm from '@/components/form.vue'
import check from "@/components/inputs/radio-field.vue";
import checkIcon from "@/components/icons/checkbox.vue";

export default Vue.extend({
  components: {
    'login-form': loginForm,
    check,
    
    'check-icon': checkIcon
  },
  data() {
    return {
      fields: [
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

      keepSession: false as boolean,
    }
  },
  beforeMount() {
    const savedKeepSession: string | null = localStorage.getItem('keepSession') || ''
    if (savedKeepSession !== '') {
      const keepSession: boolean = JSON.parse(savedKeepSession)
      this.keepSession = keepSession
    }
  },
  methods: {
    saveSession(session: boolean): void {
      if (session) {
        localStorage.setItem('keepSession', 'true')
      } else {
        localStorage.removeItem('keepSession')
      }
    },
    login(res: any): void {
      console.log(res);
      if (res.status === 'success') {
				localStorage.setItem('token', res.token)
				localStorage.setItem('id', res.user._id)
				this.saveSession(this.keepSession)
				this.$store.commit('user/login')
				this.$router.push('/')
			}
    }
  }
})
</script>

<style lang="scss" scoped>

.options {
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.keep-session {
  flex: 1 0 auto;
  // display: flex;
  align-items: center;
  & svg {
    width: 1.5rem;
  }
  & label {
    margin-left: .5rem;
    font-size: .75rem;
    color: $primary;
  }
}

.password-reset {
  font-size: .75rem;
  color: $secondary;
}
</style>