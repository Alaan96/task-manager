<template>
  <select :name="name" v-model="value[name]">
    <option v-for="option in options"
      :key="option.text"
      :value="option.value">
      {{option.text}}
    </option>
  </select>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

interface Option {
  text: string,
  value: string
}

export default Vue.extend({
  props: {
    value: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    } as PropOptions<Array<Option>>
  },
  inheritAttrs: false
})
</script>