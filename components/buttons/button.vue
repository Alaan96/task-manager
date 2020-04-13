<template>
  <button :class="[{simple}, {small}]"
    :style="[{display: inline ? 'inline' : ''},
            {backgroundColor: bgColor ? bgColor : ''},
            {color: color}]">
    {{text}}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    },
    to: {
      type: String
    },
    simple: {
      type: Boolean
    },
    small: {
      type: Boolean
    },
    color: {
      type: String
    },
    bgColor: {
      type: String
    },
    inline: {
      type: Boolean
    }
    // cancel: {
    //   type: Boolean,
    //   required: false
    // },
  }
})
</script>

<style lang="scss" scoped>
  button {
    width: 10em;
    height: 2em;
    // margin: 0 auto 1rem auto;
    @include center;
    font-size: 1rem;
    font-weight: 600;
    color: $primary;
    background: $tertiary;
    border-radius: 1rem;
    &:hover, &:focus {
      filter: brightness(1.15);
    }
  }

  .simple {
    background: transparent;
    // margin: 0 auto;
  }

  .small {
    width: 6em;
    height: 1.5em;
    font-size: .75rem;
  }

  // .cancel {
  //   background: $cancel;
  // }
</style>