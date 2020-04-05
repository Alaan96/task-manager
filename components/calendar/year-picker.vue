<template>
  <section>
    <button class="year"
      v-for="(year, index) in years"
      :key="year"
      :class="{'selected': index === yearSelected}">
      <input type="radio"
        :id="year"
        :value="index"
        @change="setMonth(index)"
        v-model="yearSelected">
      <label :for="year">{{year}}</label>
    </button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      years: [] as number[],
      yearSelected: '' as string
    }
  },
  methods: {
    setYears(year: number): void {
      this.years = []

      const maxYear: number = this.year + 3
      const yearsSelection: any = 12

      for(let year in yearsSelection) {
        this.years.push(maxYear - yearsSelection)
      }
      console.log(this.years);
    }
  },
  mounted() {
    
  },
  computed: {
    ...mapState('calendar', {
      year: 'year'
    })
  }
})
</script>

<style lang="scss" scoped>
$btn-height: 5rem;

  section {
    width: 100%;
    // padding: 0 .5rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(6.5rem, 1fr));
    grid-auto-rows: 5rem;
    grid-gap: .5rem;

    & button {
      // width: 100%;
      // height: 100%;
      @include center;
      // font-family: $niramit;
      font-size: 1rem;
      font-weight: 600;
      background: $line;
      color: $primary;
      border-radius: .2rem;
      opacity: .6;

      // transition: .2s ease;

      @for $i from 1 through 12 {
        &:nth-child(#{$i}) {
          // animation: load-months
          // .5s
          // cubic-bezier(.44,.44,.58,.89)
          // #{$i * 0.075}s
          // backwards;
        }
      }

      & input {
        display: none;
      }

      & label {
        width: 100%;
        height: $btn-height;
        @include center;
      }
    }
  }

  .selected {
    opacity: 1;
  }

  @keyframes load-months {
    from {
      transform: scale(.2);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: .6;
    }
  }
</style>