<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${size} ${size}`"
    :class="{checked}">
    <circle :cx="size / 2" :cy="size / 2" :r="size / 6" class="center" />
    <circle :cx="size / 2" :cy="size / 2" :r="size / 2.5" class="border" />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    size: {
      type: Number,
      required: false,
      default: 16
    },
    checked: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.center {
  fill: $primary;
  transform-origin: center;
  transform: scale(.5);
  opacity: 0;
  transition: .2s ease;
}

.border {
  fill: transparent;
  stroke: $line;
  stroke-width: 1px;
}

svg.checked {
  & .center {
    transform: scale(1);
    opacity: 1;
  }
}
</style>