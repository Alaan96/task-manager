<template>
  <div class="color-picker" v-if="mode === 'dots'">
    <radio-field
      v-for="dot in dots"
      :key="dot.color"
      name="color"
      :id="dot.color"
      :val="dot.color"
      :value="value"
      @input="$emit('input', $event)">
      <div class="dot"
        :style="{'border-color': dot.color === value ? dot.color : 'transparent'}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" :fill="dot.color" />
        </svg>
      </div>
    </radio-field>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import radioField from '@/components/inputs/radio-field.vue'

export default Vue.extend({
  components: {
    'radio-field': radioField
  },
  props: {
    value: {
      required: true
    },
    mode: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      dots: [
        {
          color: '#DE8EFF',
          selected: false
        },
        {
          color: '#FF80C4',
          selected: false
        },
        {
          color: '#F16D6D',
          selected: false
        },
        {
          color: '#FEC158',
          selected: false
        },
        {
          color: '#FFEA80',
          selected: false
        },
        {
          color: '#BFFF80',
          selected: false
        },
        {
          color: '#8BDDF2',
          selected: false
        },
        {
          color: '#80A2FF',
          selected: false
        },
      ] as any[]
    }
  }
})
</script>

<style lang="scss" scoped>
.color-picker {
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dot {
  padding-bottom: .5rem;
  border-bottom: .1rem solid transparent;
  opacity: 1;
}
</style>