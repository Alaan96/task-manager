<template>
  <!-- <g> -->
    <g class="date" :data-full-date="fullDate"
      :class="[{isToday}, {visible}]"
      :transform="`translate(${x}, ${y})`">
      <circle class="today" cx="24" cy="24" r="14" v-if="isToday" />
      <circle class="selected" cx="24" cy="24" r="21" v-show="selected" />
      <text x="24" y="30"
        text-anchor="middle">
        <slot><!-- Number --></slot>
      </text>
      <g class="points" v-if="false">
        <circle class="point" cx="36" cy="42" r="4" fill="#F16D6D" />
      </g>
    </g>
  <!-- </g> -->
  <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
    @click="selectDate(fullDate)">
    <g :class="[{today}, {'visible': currentMonth}, {selected}]">
      <circle cx="24" cy="24" r="21" class="border"/>
      <circle cx="24" cy="24" r="16" class="fill" v-if="today"/>
      <text x="24" y="30" text-anchor="middle">{{number}}</text>

      <circle v-for="(point, index) in points" :key="index" v-show="point.date === fullDate"
        :cx="pointPosition[index].x" :cy="pointPosition[index].y" r="4" :fill="point.tag.color"
        class="point"/>
    </g>
  </svg> -->
</template>

<script>
import { mapState } from 'vuex'

// Mixins
import { datesFunctions } from '@/assets/mixins/format-functions'

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
  mixins: [datesFunctions],
  methods: {
    selectDate(fullDate) {
      this.selected = fullDate
    },
  },
  computed: {
    positionDates() {
      let week = 0
      if ((this.index + 1) % week * 7 !== 0) {
        return 48 * week
      } else {
        week++
        return 48 * week
      }
    },
    selected() {
      let dateSelected = this.$store.getters['date/selected']
      if (dateSelected === this.fullDate) {
        return true
      } else {
        return false
      }
      // get() {
      //   let dividedDate = this.$store.getters['date/selected'].split('/')
      //   let selected = `${this.formatNumber(dividedDate[0])}/${this.formatNumber(dividedDate[1])}/${dividedDate[2]}`
      //   console.log(dividedDate, selected)
      //   if (selected === this.fullDate) {
      //     return true
      //   } else {
      //     return false
      //   }
      // },
      // set(fullDate) {
      //   if (fullDate) {
      //     this.$store.commit('date/changeSelected', fullDate)
      //   }
      // }
    },
    isToday() {
      if (this.fullDate === this.$store.getters['date/todayFullDate']) {
        return true
      } else {
        return false
      }
    },
    visible() {
      let currentMonth = this.$store.getters['date/today'].getMonth() + 1
      let dateMonth = this.fullDate.slice(3, -5)
      if (dateMonth == currentMonth) {
        return true
      } else {
        return false
      }
    },
    ...mapState('calendary', {
      year: 'year',
      month: 'month',
      date: 'date'
    })
  },
  props: {
    index: {
      type: Number
    },
    x: {
      type: Number
    },
    y: {
      type: Number
    },
    day: {
      type: Number
    },
    fullDate: {
      type: String
    },
    // number: {
    //   type: [String, Number]
    // },
    // index: {
    //   type: Number
    // },
    // monthNumber: {
    //   type: Number
    // },
    // points: {
    //   type: Array
    // }
  }
}
</script>

<style lang="scss" scoped>

.date {
  opacity: .6;
  & text {
    font-family: $lato;
    fill: $primary;
  }
  & circle.today {
    fill: $primary;
  }
  & circle.selected {
    fill: transparent;
    stroke: $light;
    stroke-width: 2px;

    animation: new-selection .2s ease;
    transform-origin: 8% 8%; // idk
  }
}

.isToday {
  & text {
    font-family: $lato;
    fill: $tertiary;
  }
  & circle.selected {
    fill: transparent;
    stroke: $light;
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