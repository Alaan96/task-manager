<template>
  <section @change="setItem()">
    <button v-for="(item, index) in items"
      :key="index"
      :class="[{'selected': selection === item}]">
      <input type="radio"
        :id="item"
        :value="item"
        v-model="selection">
      <label :for="item">{{item}}</label>
    </button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    by: {
      type: String
    },
    // items: {
    //   type: Array,
    //   // required: true
    // },
  },
  data() {
    return {
      selection: '' as string,
      items: [] as string[]
    }
  },
  computed: {
    ...mapState('calendar', [
      'months',
      'month'
    ])
  },
  beforeMount() {
    this.generateItems(this.by)
  },
  methods: {
    // Generate the picker
    generateItems(param: string): void {
      switch (param) {
        case 'month':
          this.items = this.months
          this.selection = this.months[this.month]
          break;
        // case 'years':
        //   break;
      }
    },
    setItem() {
      let mutation: string = this.by
      mutation = mutation.charAt(0).toUpperCase() + mutation.slice(1)
      this.$store.commit(`calendar/set${mutation}`, this.selection)
    }
  },
})
</script>

<style lang="scss" scoped>
  section {
    width: 100%;
    margin-bottom: .5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: .5rem;
  }

  button {
    width: 100%;
    @include center;
    font-size: 1rem;
    font-weight: 600;
    color: $primary;
    background: $line;
    border-radius: .25rem;
    transition: .2s ease;
    opacity: .6;
    & input {
      display: none;
    }
    & label {
      width: 100%;
      height: 4em;
      @include center;
    }
  }

  .selected {
    opacity: 1;
  }
</style>