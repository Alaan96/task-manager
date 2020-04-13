<template>
  <button :class="{'active': value[id]}">
    <label :for="id">{{value[id] ? texts[1] : texts[0]}}</label>
    <input type="checkbox" :id="id" v-model="value[id]">
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
      type: Object,
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