<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${size} ${size / 2}`">
    <path
      :d="`
        M ${strokeWidth}, ${size / 2 - strokeWidth}
        L ${size / 2}, ${strokeWidth}
        L ${size - strokeWidth}, ${size / 2 - strokeWidth}`"
      :style="{'stroke-width': strokeWidth}"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 20
    },
    strokeWidth: {
      type: Number,
      default: 2
    }
  }
}
</script>

<style lang="scss" scoped>

path {
  stroke: $light;
  fill: transparent;
  stroke-linejoin: round;
  stroke-linecap: round;
}
</style>