<template>
  <svg :width="width" :viewBox="`0 0 ${width} ${size}`" xmlns="http://www.w3.org/2000/svg"
    class="logo">
    <text :x="size" :y="size * .75" text-anchor="middle">
      {{name}}
    </text>
    <circle :cx="size * .88" :cy="size * .54" r="20" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 80
    }
  },
  computed: {
    width() {
      return this.size * 2
    },
    name() {
      return this.$store.getters['app/name']
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    margin: 6rem auto 2rem auto;
    & text {
      fill: $primary;
      font-size: 4rem;
      font-weight: 700;
      letter-spacing: .2rem
    }
    & circle {
      fill: $cancel;
    }
  }
</style>
