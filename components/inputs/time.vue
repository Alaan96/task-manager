<template>
  <div>
    <label for="time">Horario</label>
    <input type="text"
      id="time"
      name="time"
      placeholder="-- : --"
      pattern="^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$"
      v-model="value.time"
      autocomplete="off"
      @keyup.self="formatTime('time')"
      ref="time">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  filters: {
    formatTime(value: string): string {
      let formatedValue: string = value
      if (value.length === 2) {
        formatedValue.concat(':')
      }
      return formatedValue
    }
  },
  data() {
    return {
      // time: {} as any,
      // validated: {} as any
    }
  },
  methods: {
    formatTime(name: string): any {
      const field: any = this.$refs[name]
      const ev: any = event
      if (ev.key === 'Backspace' || ev.key === 'Delete') {
        return null
      } else if (field.value.length === 2) {
          field.value += ':'
      }
    },
  },
  props: {
    value: {
      type: Object
    }
  }
})
</script>

<style lang="scss" scoped>
  div {
    width: 100%;
    display: flex;
    align-items: center;
  }

  label {
    margin-right: .5rem;
    font-size: .75rem;
  }

  input {
    max-width: 5em;
    padding: 0 .5rem;
    height: 1.5rem;
    text-align: center;
    font-weight: 600;
    letter-spacing: .25em;
  }

  span {
    margin: 0 .25rem;
    font-size: 1rem;
    font-weight: 600;
  }
</style>