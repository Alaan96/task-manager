<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${width} ${size}`"
    :class="{fill}">
    <path :d="`
      M ${strokeWidth / 2}, ${strokeWidth / 2}
      L ${width / 3}, ${size / 2}
      V ${size - strokeWidth / 2}
      H ${width / 1.5}
      V ${size / 2}
      L ${width - strokeWidth / 2}, ${strokeWidth / 2}
      Z`" 
      :stroke-width="strokeWidth" />
      
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 16
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    fill: {
      type: Boolean
    }
  },
  computed: {
    width() {
      return this.size / .875
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  fill: transparent;
  stroke: $primary;
}
.fill {
  fill: $primary;
  stroke-width: 0;
}
</style>