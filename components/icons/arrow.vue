<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${size} ${size / 2}`">
    <path
      :d="`
        M ${strokeWidth}, ${size / 2 - strokeWidth}
        L ${size / 2}, ${strokeWidth}
        L ${size - strokeWidth}, ${size / 2 - strokeWidth}`"
      :style="[{'stroke-width': strokeWidth}, {'transform': `rotate(${arrowDirection}deg)`}]"
    />
  </svg>
</template>

<script>
export default {
  computed: {
    arrowDirection() {
      switch(this.direction) {
        case 'right':
          return 270
        case 'down':
          return 180
        case 'left':
          return 90
        default:
          return 0
      }
    }
  },
  props: {
    size: {
      type: Number,
      default: 20
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    direction: {
      type: String,
      // default: 'up'
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

  transform-origin: center;
}
</style>