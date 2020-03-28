<template>
  <button :class="{simple}">
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
    to: {
      type: String,
    },
    simple: {
      type: Boolean,
    }
    // cancel: {
    //   type: Boolean,
    //   required: false
    // },
  }
}
</script>

<style lang="scss" scoped>
  button {
    width: 10rem;
    height: 2rem;
    margin: 0 auto 1.5rem auto;
    @include center;
    font-size: 1rem;
    font-weight: 600;
    color: $primary;
    background: $tertiary;
    border-radius: 1rem;
  }

  .simple {
    background: transparent;
  }

  // .cancel {
  //   background: $cancel;
  // }
</style>