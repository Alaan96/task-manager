export const numberFunctions = {
  methods: {
    formatNumber(number, int = false) {
      if (number) {
        if (int) {
          return number
        } else if (!int) {
          if (number >= 10) {
            return `${number}`
          } else if (!number.toString().indexOf('0') === 0) {
            return `0${number}`
          }
        }
      }
    }
  }
}