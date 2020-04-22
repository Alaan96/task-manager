import { Plugin } from '@nuxt/types'
import { User } from '@/assets/interfaces.ts'

declare module 'vue/types/vue' {
  interface Vue {
    $user: User
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $user: User
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $user: User
  }
}


const user: Plugin = (context: any, inject) => {
  inject('user', {
    _id: localStorage.getItem('id') || '' as string,
    token: localStorage.getItem('token') || '' as string,
    // settings: context.store.getters['user/settings'] as object
  } as User)
}

export default user