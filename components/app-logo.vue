<template>
  <svg :width="width" :viewBox="`0 0 ${width} ${size}`" xmlns="http://www.w3.org/2000/svg"
    class="logo">
    <text :x="size" :y="size * .75" text-anchor="middle">
      {{name}}
    </text>
    <circle :cx="size * .88" :cy="size * .54" r="20" :fill="firstTagColor" />
  </svg>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  props: {
    size: {
      type: Number,
      default: 80
    }
  },
  computed: {
    width(): number {
      return this.size * 2
    },
    name(): string {
      return this.$store.getters['app/name']
    },
    firstTagColor(): string {
      const tags: any = this.$store.getters['user/tags']
      let color: string = '#8BDDF2'
      if (tags.length > 0) {
        color = tags[0].color
      }
      return color
    }
  }
})
</script>

<style lang="scss" scoped>
  .logo {
    margin: 6rem auto;
    & text {
      fill: $primary;
      font-size: 4rem;
      font-weight: 700;
      letter-spacing: .2rem
    }
  }
</style>
