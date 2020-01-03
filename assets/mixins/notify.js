export const notify = {
  methods: {
    notify(status, message) {
      let data = {
        status: status,
        message: message
      }

      this.$store.commit('notify/showInfo', data)
      setTimeout(() => {
        this.$store.commit('notify/hideInfo')
      }, 2000)
    }
  }
}