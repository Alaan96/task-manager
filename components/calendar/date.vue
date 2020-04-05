<template>
  <g class="date" :data-full-date="fullDate"
    :class="[{isToday}, {visible}]"
    :transform="`translate(${x}, ${y})`">
    <circle class="today" cx="24" cy="24" r="14" v-if="isToday" />
    <circle class="selected" cx="24" cy="24" r="21" v-show="selected" />
    <text x="24" y="30"
      text-anchor="middle">
      <slot><!-- Number --></slot>
    </text>
    <g class="points" :data-full-date="fullDate" v-if="points.length > 0">
      <circle class="orbit" cx="24" cy="24" r="21" />
      <!-- <circle class="point" cx="36" cy="42" r="4" fill="#F16D6D" /> -->
      <circle class="point" v-for="(point, index) in points" :key="point._id"
        :cx="pointPosition[index].x" :cy="pointPosition[index].y" r="4" :fill="point.tag.color" />
    </g>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

// Mixins
import { datesFunctions } from '@/assets/mixins/format-functions'

export default Vue.extend({
  data() {
    return {
      pointPosition: [
        {x: 36, y: 42},
        {x: 44, y: 24},
        {x: 36, y: 8},
      ] as object[]
    }
  },
  mixins: [datesFunctions],
  methods: {
    // selectDate(fullDate) {
    //   this.selected = fullDate
    // },
  },
  computed: {
    selected(): boolean {
      const dateSelected: any = this.$store.getters['date/selected']
      if (dateSelected === this.fullDate) {
        return true
      } else {
        return false
      }
    },
    isToday(): boolean {
      if (this.fullDate === this.$store.getters['date/todayFullDate']) {
        return true
      } else {
        return false
      }
    },
    visible(): boolean {
      const currentMonth: number = this.calendarMonth + 1
      const dateMonth: number = parseInt(this.fullDate.slice(3, -5))
      if (dateMonth === currentMonth) {
        return true
      } else {
        return false
      }
    },
    points(): object[] {
      const points: object[] = this.$store.getters['task/list']
          .filter( (task: any) => task.date === this.fullDate)
      return points
    },
    ...mapState('calendar', {
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
    calendarMonth: {
      type: Number
    },
  }
})
</script>

<style lang="scss" scoped>

.date {
  opacity: .3;
  & text {
    // font-family: $lato;
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
    // font-family: $lato;
    fill: $tertiary;
    font-weight: 700;
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
  0% {
    opacity: 0;
    r: 0;
  }
  50% {
    r: 6;
  }
  100% {
    opacity: 1;
    r: 4;
  }
}

.orbit {
  fill: transparent;
  stroke-width: 1px;
  stroke: $line;
}
.point {
  animation: create-point .4s ease-out;
  box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.2);
}
</style>