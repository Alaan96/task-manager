export const fetch = {
  async fetch(context: any) {
    try {
      const _id: string | null = localStorage.getItem('id')
      const token: string | null = localStorage.getItem('token')
      
      const loaded: boolean = context.store.getters['user/loaded']
      if (loaded === false) {
        const axiosHeaders: object = context.$axios.defaults.headers.common
        if (!axiosHeaders.hasOwnProperty('token')) {
          context.$axios.setHeader('token', token)
        }
        
        // Load user data
        await context.store.dispatch('user/download', `${context.app.$api.url}/user/${_id}`)

        // Load tasks
        await context.store.dispatch('task/download', `${context.app.$api.url}/tasks/${_id}`)
      }
    } catch (err) {
      console.log(err.response.data)
    }
  },
}