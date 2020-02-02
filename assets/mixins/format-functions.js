export const datesFunctions = {
  methods: {
    formatDate(number) {
      if (number && number < 10) {
        return `0${number}`
      } else {
        return number.toString()
      }
    }
  }
}