<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${size} ${size}`">
    <circle :cx="size / 2" :cy="size / 2" :r="size / 8" class="center" />
    <circle :cx="size / 2" :cy="size / 2" :r="size / 2.5" class="border" />
  </svg>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  props: {
    size: {
      type: Number,
      required: false,
      default: 16
    },
    value: {
    }
  },
  updated(): void {
    console.log(this.value);
  }
})
</script>

<style lang="scss" scoped>
  .center {
    fill: $primary;
  }

  .border {
    fill: transparent;
    stroke: $line;
    stroke-width: 2px;
  }
</style>