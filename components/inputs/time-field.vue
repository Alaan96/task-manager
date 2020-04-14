<template>
  <div>
    <label for="time">Horario</label>
    <input type="text"
      id="time"
      name="time"
      placeholder="--:--"
      pattern="^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$"
      :value="value"
      @input="$emit('input', $event.target.value)"
      autocomplete="off"
      @keyup.self="formatTime('time')"
      ref="time">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      required: true
    }
  },
  methods: {
    // Format nnnn to nn:nn
    formatTime(name: string): any {
      const field: any = this.$refs[name]
      const ev: any = event
      if (ev.key === 'Backspace' || ev.key === 'Delete') {
        return null
      } else if (field.value.length === 2) {
          field.value += ':'
      }
    },
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
    padding: 0;
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