<template>
  <select :name="name" :value="value" @input="$emit('input', $event.target.value)">
    <option v-for="option in options"
      :key="option.text"
      :value="option.value">
      {{option.text}}
    </option>
  </select>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'


import { Option } from '@/assets/interfaces.ts'

export default Vue.extend({
  props: {
    value: {
      // type: Object,
      required: true
    },
    options: {
      type: Array,
      required: true
    } as PropOptions<Option[]>,
    name: {
      type: String,
      // required: true
    }
  },
  inheritAttrs: false
})
</script>