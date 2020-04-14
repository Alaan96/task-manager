import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $api(httpMethod: string, endpoint: string, content: any): any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api(httpMethod: string, endpoint: string, content: any): any
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api(httpMethod: string, endpoint: string, content: any): any
  }
}


const api: Plugin = (context: any, inject) => {
  inject('api', (httpMethod: string, endpoint: string, content: any = null) => {
    console.log('Plugin funcionando');
    if (httpMethod === '' || endpoint === '') {
      const url = `${location.origin}/${endpoint}`
      console.log(url);
  
      context.$axios[`$${httpMethod}`](url, content)
        // .then((res: any) => {
        //   console.log(res)
        //   return res
        // })
        // .catch((err: { response: { data: any } }) => {
        //   console.warn(err.response.data)
        //   return err.response.data
        // })
    }
  })
}

export default api