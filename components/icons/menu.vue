<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${size} ${size / 1.5}`">
    <line
      :x1="`${strokeWidth}`"
      :x2="`${size - strokeWidth}`"
      :y1="`${strokeWidth}`"
      :y2="`${strokeWidth}`"
      :style="{'stroke-width': strokeWidth}"/>
    <line
      :x1="`${strokeWidth}`"
      :x2="`${size / 1.25}`"
      :y1="`${(size / 1.5) / 2}`"
      :y2="`${(size / 1.5) / 2}`"
      :style="{'stroke-width': strokeWidth}"/>
    <line
      :x1="`${strokeWidth}`"
      :x2="`${size - strokeWidth}`"
      :y1="`${(size / 1.5) - strokeWidth}`"
      :y2="`${(size / 1.5) - strokeWidth}`"
      :style="{'stroke-width': strokeWidth}"/>
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
  }
}
</script>

<style lang="scss" scoped>
line {
  stroke: $primary;
}
</style>