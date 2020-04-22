import { Plugin } from '@nuxt/types'
import { Api } from "@/assets/interfaces.ts";

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: Api
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: Api
  }
}


const api: Plugin = (context: any, inject) => {
  inject('api', {
    url: `${location.origin}` as string
  } as Api)
}

export default api