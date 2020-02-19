<template>
  <button :class="[{cancel}, {color: color}]" v-if="to">
    <nuxt-link :to="to">
      {{text}}
    </nuxt-link>
  </button>
  <button :class="[{cancel}, {color: color}]" v-else>
    {{text}}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    cancel: {
      type: Boolean,
      required: false
    },
    to: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    width: 8rem;
    height: 2rem;
    @include center;
    font-size: .75rem;
    font-weight: 700;
    // font-family: $niramit;
    color: $primary;
    background: $secondary;
    border-radius: $radius;
  }

  .cancel {
    background: $cancel;
  }
</style>