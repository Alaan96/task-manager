<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
    @click="selectDate(fullDate)">
    <g :class="[{today}, {'visible': currentMonth}, {selected}]">
      <circle cx="24" cy="24" r="21" class="border"/>
      <circle cx="24" cy="24" r="16" class="fill" v-if="today"/>
      <text x="24" y="30" text-anchor="middle">{{number}}</text>

      <circle v-for="(point, index) in points" :key="index" v-show="point.date === fullDate"
        :cx="pointPosition[index].x" :cy="pointPosition[index].y" r="4" :fill="point.tag.color"
        class="point"/>
    </g>
  </svg>
</template>

<script>
import { mapState } from 'vuex'

// Mixins
import { numberFunctions } from '@/assets/mixins/number-format'

export default {
  data() {
    return {
      pointPosition: [
        {x: 38, y: 40},
        {x: 44, y: 25},
        {x: 39, y: 10},
      ]
    }
  },
  mixins: [numberFunctions],
  methods: {
    selectDate(fullDate) {
      this.selected = fullDate
    },
  },
  computed: {
    selected: {
      get() {
        let dividedDate = this.$store.getters['date/selected'].split('/')
        let selected = `${this.formatNumber(dividedDate[0])}/${this.formatNumber(dividedDate[1])}/${dividedDate[2]}`
        console.log(dividedDate, selected)
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
      let currentDate = `${this.formatNumber(new Date().getDate())}/${this.formatNumber(new Date().getMonth() + 1)}/${new Date().getFullYear()}`
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
    },
    points: {
      type: Array
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
circle:not(.point) {
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

@keyframes create-point {
  from {
    transform: scale(.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.point {
  animation: create-point 1s ease-out;
  transform-origin: right;
  box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.2);
}
</style>