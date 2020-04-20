<template>
  <div>
    <header>
      <button class="month-handler"
        @click="changeCalendarTo('months')"
        >
        {{months[month]}}
      </button>

      <div class="controls">
        <button>
          <arrow @click.native="calendarGo('up')"></arrow>
        </button>
        <button>
          <arrow direction="down" @click.native="calendarGo('down')"></arrow>
        </button>
      </div>

      <button class="year-handler">
        {{year}}
      </button>
    </header>

    <div class="calendar"
      ref="calendar"
      @touchstart="calendarTouched"
      @touchmove.prevent="calendarSwype"
      @touchend="calendarChange">

      <template v-if="calendar === 'default'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336 326">
          <g v-if="highlightDays">
            <rect :x="highlightDayColumn('Sábado', 336)" y="0"  width="48" height="100%" rx="2" />
            <rect :x="highlightDayColumn('Domingo', 336)" y="0"  width="48" height="100%" rx="2" />
          </g>
          <g class="week">
            <text v-for="(dayWeek, index) in days" :key="dayWeek"
              :x="48 * index + 24" y="24" text-anchor="middle">
              {{ dayWeek.slice(0, 1) }}
            </text>
            <line x1="0" x2="336" y1="36" y2="36" stroke-width="2" />
          </g>

          <g class="dates"
            :style="[{'transform': `translateY(-${positions[month]}px)`}, 
                    {'clip-path': `inset(${positions[month] - 16}px -16px 0px -16px)`}]"
            @click="selectDate()">
            <date 
              v-for="(date, index) of yearDates" :key="index"
              :index="index"
              :x="date.x"
              :y="date.y"
              :day="date.day"
              :fullDate="date.fullDate"
              :calendarMonth="month">
              {{date.number}}
            </date>
          </g>
        </svg>
      </template>

      <template v-else-if="calendar === 'months'">
        <picker by="month"></picker>
      </template>
      
      <template v-else-if="calendar === 'years'">
        <!-- <picker by="years"></picker> -->
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import date from './date.vue'
import picker from './picker.vue'

// Icons
import arrow from '@/components/icons/arrow.vue'

export default Vue.extend({
  components: {
    date,
    picker,

    // Icons
    arrow
  },
  data() {
    return {
      // Defines the calendar mode between default, months & years
      calendar: 'default' as string,

      // Dates of the year
      yearDates: [] as any[],

      // Y position to change between months
      positions: [] as number[],

      currentYear: new Date().getFullYear() as number,

      // Initialization vars for touch events
      touch: {
        start: 0,
        end: 0,
        threshold: 85,
        swype: 0
      } as any
    }
  },
  computed: {
    dates(): number {
      return this.$store.getters['calendar/dates']
    },
    highlightDays(): boolean {
      return this.$store.getters['user/settings'].calendar_highlight_weekend
    },
    ...mapState('calendar', {
      year: 'year',
      months: 'months',
      month: 'month',
      days: 'days',
      date: 'date',
    })
  },
  beforeMount() {
    this.loadYearDates(this.year, this.months)
  },
  beforeUpdate() {
    this.reRunYearDates(this.year, this.currentYear)
  },
  methods: {
    // Principal function
    loadYearDates(year: number, months: string[]): void {
      // Reset yearDates
      this.yearDates = []

      let week: number = 1
      let day: number = 0
      let x: number = 0
      let y: number = 0
      let size: number = 48
      let newMonth: number = 0

      // Load previous dates
      for(let date: number = 1; date <= this.firstDay(this.year); date++) {
        if (day === 7) {
          week++
          day = 0
        }
        x = size * day
        y = size * (week - 1) + 38

        this.yearDates.push({
          number: '',
          x: x,
          y: y,
          day: day,
          fullDate: '',
        })

        day++
      }

      // Reset positions
      this.positions = []

      // Load yearDates
      months.forEach( (month, monthIndex) => {
        this.positions.push(newMonth)
        for(let date: number = 1; date <= new Date(year, monthIndex + 1, 0).getDate(); date++) {
          if (day === 7) {
            week++
            day = 0
          }
          x = size * day
          y = size * (week - 1) + 38

          let fullDate: string = `${this.formatDate(date)}/${this.formatDate(monthIndex + 1)}/${this.year}`

          this.yearDates.push({
            number: date,
            x: x,
            y: y,
            day: day,
            fullDate: fullDate,
          })

          day++
        }
        // Fix positions
        if (day === 7) {
            newMonth = size * week
        } else {
          newMonth = size * (week - 1)
        }
      })
    },

    reRunYearDates(updatedYear: number, calendarYear: number): void {
      if (updatedYear === calendarYear) {
        return undefined
      } else if (updatedYear < calendarYear) {
        this.loadYearDates(updatedYear, this.months)
        this.currentYear -= 1
      } else if (updatedYear > calendarYear) {
        this.loadYearDates(updatedYear, this.months)
        this.currentYear += 1 
      }
      // this.loadYearDates(this.year, this.months)
    },

    // Return the first day of the week in January as a number [0-6]
    firstDay(year: number): number {
      if (year) {
        const firstDay: string = this.days[0]

        if (firstDay === 'Lunes') {
          return new Date(year, 0, 1).getDay() - 1
        } else if (firstDay === 'Domingo') {
          return new Date(year, 0, 1).getDay()
        }
      } 
      return -1
    },

    selectDate(): void {
      const ev: any = event
      const date: string = ev.target.parentElement.attributes['data-full-date'].value

      this.$store.commit('date/changeSelected', date)
      this.$store.commit('modal/open', 'date')
    },

    // Goes up or down
    calendarGo(direction: string): void {
      const mode: string = this.calendar

      switch (mode) {
        case 'default':
          this.$store.commit('calendar/changeMonth', direction)
          break;
        case 'month':
          this.$store.commit('calendar/changeYear', direction)
          break;
        // case 'year':
        //   this.$store.commit('calendar/changeYears', direction)
        //   break;
      }
    },

    // Change the calendar mode between default, months, years
    changeCalendarTo(mode: string): void {
      if (mode && this.calendar) {
        if (mode !== this.calendar) {
          this.calendar = mode
        } else {
          this.calendar = 'default'
        }
      }
    },

    // Format function
    formatDate(number: number): string {
      if (number && number < 10) {
        return `0${number}`
      } else {
        return number.toString()
      }
    },

    // Details
    highlightDayColumn(day: string, vbWidth: number): number {
      const days: string[] = Array.from(this.days)
      const firstDay: string = days[0]
      const columnWidth: number = vbWidth / days.length
      const dayIndex: number = days.reverse().indexOf(day) + 1
      return vbWidth - columnWidth * dayIndex
    },

    // Touch functions
    calendarTouched(): void {
      let ev: any = event
      this.touch.start = ev.touches[0].screenY
    },
    calendarSwype(): void {
      let ev: any = event
      this.touch.end = ev.touches[0].screenY
      this.touch.swype = this.touch.start - this.touch.end
    },
    calendarChange(): void {
      if (this.touch.swype <= -this.touch.threshold) {
        this.calendarGo('up')
      } else if(this.touch.swype >= this.touch.threshold) {
        this.calendarGo('down')
      }
      this.touch.swype = 0
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  & button {
    font-size: 1.25rem;
    font-family: $quicksand;
    font-weight: 700;
    color: $primary;
  }

  & .controls {
    position: absolute;
    left: 42%;
    & button {
      width: 1.5rem;
      margin: 0 .25rem;
    }
  }
}

.calendar {
  width: 100%;
  & line {
    stroke: $line;
  }
}

g.week {
  & text {
    fill: $primary;
    font-weight: 700;
  }
}

g.dates {
  transition: .2s ease;
}

rect {
  fill: $line;
}
</style>