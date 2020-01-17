<template>
  <button :class="{cancel}">
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
    font-family: $niramit;
    color: $primary;
    background: $secondary;
    border-radius: $radius;
  }

  .cancel {
    background: $cancel;
  }
</style>