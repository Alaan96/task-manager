<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${size} ${size}`">
    <path
      :d="`
        M ${size / 2},  ${strokeWidth}
        V ${size - strokeWidth}
        V ${size / 2}
        H ${strokeWidth}
        H ${size - strokeWidth}`"
      :class="{rotate}"
      :style="{'stroke-width': strokeWidth}"/>
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
    },
    rotate: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
path {
  fill: transparent;
  stroke: $light;
  stroke-linejoin: round; 
  stroke-linecap: round;
  transform-origin: center;
  transform: rotate(45deg);
}

.rotate {
  transform: rotate(0);
}
</style>