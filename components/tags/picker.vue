<template>
  <!-- <div v-if="preview"
    class="preview">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" :fill="this.tags[0].color" />
    </svg>
  </div> -->

  <section class="tag-list">
    <radio-field
      v-for="tag in tags"
      :key="tag.text"
      :text="tag.text"
      name="tag"
      :id="tag.text"
      :val="tag"
      :value="value"
      @input="$emit('input', tag)">
    </radio-field>

    <!-- <button v-for="tag in tags"
      :key="tag.color"
      class="tag">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="4" :fill="tag.color" />
      </svg>
      <input type="radio"
        name="tag"
        :id="tag.text"
        :value="tag"
        @change="$emit('input', tag)">
      <label :for="tag.text">{{tag.text}}</label>
    </button> -->
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import radioField from '@/components/inputs/radio-field.vue'

interface Tag {
  text: string,
  color: string
}

export default Vue.extend({
  components: {
    'radio-field': radioField
  },
  props: {
    value: {
      type: Object
    },
    display: {
      type: String,
      required: false,
      validator: value => {
        return ['small', 'medium'].includes(value)
      }
    }
  },
  computed: {
    tags(): Tag[] {
      return this.$store.getters['user/tags']
    }
  }
})
</script>

<style lang="scss" scoped>
// .preview svg {
//   width: 1rem;
// }

section.tag-list {
  width: 100%;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}

.tag {
  padding: .25rem .5rem;
  margin: .25rem;
  display: flex;
  align-items: center;
  font-size: .75rem;
  color: $primary;
  background: transparent;
  border: 1px solid $line;
  border-radius: 1rem;
  transition: .2s ease;
  opacity: .5;
  
  &:first-child {
    margin-left: 0;
  }
  & svg {
    width: .5rem;
  }
  & label {
    margin-left: .5rem;
  }
  & input[type="radio"] {
    width: 1rem;
    // display: none;
  }
}

// button.tag.selected {
//   opacity: 1;
// }
</style>