<template>
  <div :class="[{focus},{'selected': value === val}]"
    :style="{'border-color': value === val ? val : 'transparent'}">
    <label :for="id" v-if="text">{{text}}</label>
    <input type="radio"
      :id="id"
      :name="name"
      :value="val"
      @change="$emit('input', val)"
      @focus="focus = true"
      @blur="focus = false">
    <slot>
    </slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      // type: Object
      required: true
    },
    name: {
      type: String
      // required: true
    },
    id: {
      type: String,
      required: true
    },
    val: {
      // type: String,
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
  flex: 0 1 1.5rem;
  padding-bottom: .5rem;
  @include center;
  position: relative;
  border-bottom: .1rem solid transparent;
  opacity: .6;
  transition: opacity .1s ease;
  &:hover {
    opacity: .8;
  }
  & svg {
    width: 100%;
  }
  & input {
    position: absolute;
    opacity: 0.2;
  }
}

.focus {
  opacity: .8;
}

div.selected {
  opacity: 1;
}
</style>