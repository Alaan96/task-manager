<template>
  <section>
    <button class="month"
      v-for="(monthText, index) in months"
      :key="monthText"
      :class="{'selected': index === monthSelected}">
      <input type="radio"
        :id="monthText"
        :value="index"
        @change="setMonth(index)"
        v-model="monthSelected">
      <label :for="monthText">{{monthText}}</label>
    </button>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      monthSelected: 0
    }
  },
  mounted() {
    this.monthSelected = this.month
  },
  methods: {
    setMonth(month) {
      this.$store.commit('calendary/setMonth', month),
      this.monthSelected = month
    }
  },
  computed: {
    ...mapState('calendary', {
      months: 'months',
      month: 'month'
    })
  }
}
</script>

<style lang="scss" scoped>
  $btn-height: 5rem;

  section {
    width: 100%;
    padding: 0 .5rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(6.5rem, 1fr));
    grid-auto-rows: 5rem;
    grid-gap: .5rem;

    & button {
      // width: 100%;
      // height: 100%;
      @include center;
      font-size: 1rem;
      background: $line;
      color: $primary;
      border-radius: .2rem;
      opacity: .6;

      transition: .2s ease;

      @for $i from 1 through 12 {
        &:nth-child(#{$i}) {
          animation: load-months
          .5s
          cubic-bezier(.44,.44,.58,.89)
          #{$i * 0.075}s
          backwards;
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