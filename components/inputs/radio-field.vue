<template>
  <div :class="{focus}">
    <input :type="type"
      :id="id"
      :name="name"
      :value="val"
      @change="$emit('input', $event.target.checked)"
      @focus="focus = true"
      @blur="focus = false">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      required: true
    },
    type: {
      type: String,
      default: 'radio',
      validator: value => {
        return ['radio', 'checkbox'].includes(value)
      }
    },
    name: {
      type: String
    },
    id: {
      type: String,
      required: true
    },
    val: {
      required: true
    },
    text: {
      type: String,
      required: false
    }
  },
  inheritAttrs: false,
  data() {
    return {
      focus: false
    }
  }
})
</script>

<style lang="scss" scoped>
div {
  flex: 0 1 auto;
  @include center;
  position: relative;
  transition: opacity .1s ease;
  opacity: .75;
  &:hover {
    opacity: 1;
  }
  & svg {
    width: 100%;
  }
  & input {
    position: absolute;
    opacity: 0;
    z-index: 25;
  }
}

.focus {
  opacity: 1;
}
</style>