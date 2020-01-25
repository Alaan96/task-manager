export const helpers = {
  data() {
    return {
      url: 'http://localhost:3000'
    }
  },
  computed: {
    id() {
      return this.$store.getters['user/id']
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