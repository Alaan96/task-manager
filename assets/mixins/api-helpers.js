export const helpers = {
  data() {
    return {
      url: 'http://localhost:3000',

      // headers: {
      //   token: localStorage.getItem('token') || null
      // }
    }
  },
  methods: {
    setTokenInHeaders() {
      if (!this.$axios.defaults.headers.common.token) {
        this.$axios.defaults.headers.common.token = localStorage.getItem('token')
      }
    }
  }
}