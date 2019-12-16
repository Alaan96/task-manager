<template>
  <button :style="{'font-size': fontSize + 'rem'}">
    {{conditionalText}}
  </button>
</template>

<script>
export default {
  computed: {
    conditionalText() {
      if (typeof this.text === 'string') {
        return this.text
      } else if (typeof this.text === 'object') {
        if (this.condition) {
          return this.text[0]
        } else {
          return this.text[1]
        }

      }
    }
  },
  props: {
    text: {
      type: [String, Array],
      default: 'Enviar'
    },
    condition: {
      type: Boolean,
      required: false
    },
    fontSize: {
      type: Number,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  font-family: $niramit;
  color: $light;
}
</style>