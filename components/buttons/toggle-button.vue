<template>
  <button :class="{'active': value === true}">
    <label :for="id">{{value === true ? texts[1] : texts[0]}}</label>
    <input type="checkbox" :id="id" :checked="value" @input="$emit('input', $event.target.checked)">
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      required: true
    },
    texts: {
      type: Array,
      required: false,
      default: () => ['Desactivado', 'Activado']
    },
  },
  inheritAttrs: false
})
</script>

<style lang="scss" scoped>
  button {
    width: 6rem;
    padding: .25rem 0;
    background: transparent;
    border: 1px solid $line;
    border-radius: 1rem;
    transition: .2s ease;
    & label {
      width: 100%;
      height: inherit;
      color: $primary;
      cursor: pointer;
    }
    & input[type="checkbox"] {
      display: none;
    }
  }

  .active {
    background: $secondary;
    border: none;
  }
</style>