<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
    @click="selectDate(fullDate)">
    <g :class="[{today}, {'visible': currentMonth}, {selected}]">
      <circle cx="24" cy="24" r="21" class="border"/>
      <circle cx="24" cy="24" r="16" class="fill" v-if="today"/>
      <text x="24" y="30" text-anchor="middle">{{number}}</text>
    </g>
  </svg>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    selectDate(fullDate) {
      this.selected = fullDate
    }
  },
  computed: {
    selected: {
      get() {
        let selected = this.$store.getters['date/selected']
        if (selected === this.fullDate) {
          return true
        } else {
          return false
        }
      },
      set(fullDate) {
        if (fullDate) {
          this.$store.commit('date/changeSelected', fullDate)
        }
      }
    },
    today() {
      // let currentDate = `${this.date}/${this.month + 1}/${this.year}`
      let currentDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
      if (currentDate === this.fullDate) {
        return true
      } else {
        return false
      }
    },
    currentMonth() {
      if (this.monthNumber) {
        if (this.month + 1 === this.monthNumber) {
          return true
        } else {
          return false
        }
      }
    },
    ...mapState('calendary', {
      year: 'year',
      month: 'month',
      date: 'date'
    })
  },
  props: {
    number: {
      type: [String, Number]
    },
    fullDate: {
      type: String
    },
    index: {
      type: Number
    },
    monthNumber: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
g {
  opacity: .4;
}

text {
  font-family: $lato;
  fill: $primary;
}
circle {
  fill: transparent;
}

.today {
  & text {
    fill: $black;
    font-weight: 700;
  }
  & .fill {
    fill: $primary;
  }
}

.visible {
  opacity: 1;
}


@keyframes new-selection {
  from {
    transform: scale(.6);
  }
  to {
    transform: scale(1);
  }
}
.selected {
  & .border {
    fill: transparent;
    stroke: $line;
    stroke-width: 2px;

    animation: new-selection .2s ease;
    transform-origin: center;
  }
}
</style>