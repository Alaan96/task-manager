<template>
  <div>

    <header>
      <button class="month-handler">
        <label for="month-input">{{months[calendarMonth]}}</label>
        <input type="radio" id="month-input" v-show="false"
          value="month" v-model="calendar">
      </button>

      <div class="controls">
        <button>
          <arrow @click.native="calendaryTo('up')"></arrow>
        </button>
        <button>
          <arrow direction="down" @click.native="calendaryTo('down')"></arrow>
        </button>
      </div>

      <button class="year-handler">
        <label for="year-input">{{calendarYear}}</label>
        <input type="radio" id="year-input" v-show="false"
          value="month" v-model="calendar">
      </button>
    </header>


    <div class="calendar"
      ref="calendar"
      @touchstart="calendarTouched"
      @touchmove.prevent="calendarLoad"
      @touchend="calendarChange">

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336 38" v-if="calendar === 'default'">
        <g class="week">
          <text v-for="(dayWeek, index) in days" :key="dayWeek"
            :x="48 * index + 24" y="24" text-anchor="middle">
            {{ dayWeek.slice(0, 1) }}
          </text>
          <line x1="0" x2="336" y1="36" y2="36" stroke-width="2" />
        </g>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336 288" v-if="calendar === 'default'">
        <g class="dates"
          :style="{transform: `translateY(-${positions[calendarMonth]}px)`}"
          @click="selectDate()">
          <date 
            v-for="(date, index) of yearDates" :key="index"
            :index="index"
            :x="date.x"
            :y="date.y"
            :day="date.day"
            :fullDate="date.fullDate"
            :calendarMonth="calendarMonth"
            :points="date.points">
            {{date.number}}
          </date>
        </g>
      </svg>


      <month-picker
        v-else-if="calendar === 'month'">
      </month-picker>

    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

import date from './date'
import monthPicker from './month-picker'

// Mixins
import { datesFunctions } from '@/assets/mixins/format-functions'

// Icons
import arrow from '@/components/icons/arrow'

export default {
  data() {
    return {
      // Defines the calendar mode
      calendar: 'default',

      // Dates of the year
      yearDates: [],

      calendarYear: new Date().getFullYear(),
      calendarMonth: new Date().getMonth(),

      // Y position to change between months
      positions: [],

      // Every first day of the year (used to move the calendar)
      firstDays: [],

      // Number that defines which month the user is in
      // calendarPosition: 48 * 4, //parseInt(localStorage.getItem('calendar-position')) || 0


      // Initialization vars for touch events
      touch: {
        start: 0,
        end: 0,
        threshold: 85,
        swype: 0
      }
    }
  },
  components: {
    date,
    'month-picker': monthPicker,
    arrow // Icon
  },
  mixins: [datesFunctions],
  methods: {
    selectDate() {
      let dateSelected = event.target.parentElement.attributes['data-full-date'].value
      this.$store.commit('date/changeSelected', dateSelected)
    },


    loadYearDates(year) {
      // Reset yearDates
      this.yearDates = []

      // Get tasks with date
      let tasks = this.tasks

      // Get first day of the year
      let firstDay
      if (this.days[0] === 'Lunes') {
        firstDay = new Date(year, 0, 1).getDay() - 1
      } else if (this.days[0] === 'Domingo') {
        firstDay = new Date(year, 0, 1).getDay()
      }

      let week = 1
      let day = 0
      let x = 0
      let y = 0
      let size = 48

      // Load previous dates
      for(let date = 1; date <= firstDay; date++) {
        if (day === 7) {
          week++
          day = 0
        }
        x = size * day
        y = size * (week - 1)

        this.yearDates.push({
          number: '',
          x: x,
          y: y,
          day: day,
          fullDate: '',
          points: []
        })

        day++
      }

      // Reset positions
      this.positions = []

      // Load yearDates
      this.months.forEach( (month, monthIndex) => {
        this.positions.push(y)

        for(let date = 1; date <= new Date(year, monthIndex + 1, 0).getDate(); date++) {
          if (day === 7) {
            week++
            day = 0
          }
          x = size * day
          y = size * (week - 1)

          let fullDate = `${this.formatDate(date)}/${this.formatDate(monthIndex + 1)}/${this.calendarYear}`
          // let points = tasks.filter( task => task.date === fullDate)

          this.yearDates.push({
            number: date,
            x: x,
            y: y,
            day: day,
            fullDate: fullDate,
            points: []
            // points: points ? points : []
          })

          day++
        }
      })

      // this.loadTasks()
    },

    setTodayAsSelected() {
      let today = this.$store.getters['date/todayFullDate']
      this.$store.commit('date/changeSelected', today)
    },

    // loadTasks() {
    //   console.log('Load tasks')
    //   let tasks = this.tasks

    //   tasks.forEach( task => {
    //     let taskDate = task.date
    //     this.yearDates.filter( date => {
    //       if (date.fullDate === taskDate) {
    //         date.points.push(task)
    //       }
    //     })
    //   })
    // },

    calendaryTo(direction) {
      if (this.calendar === 'default') {
        this.changeMonth(direction)
      }
    },

    changeMonth(direction) {
      if (direction === 'up') {
        this.calendarMonth--
        if (this.calendarMonth < 0) {
          this.calendarMonth = 11
          this.calendarYear -= 1
          this.loadYearDates(this.calendarYear)
        }
      } else if (direction === 'down') {
        this.calendarMonth++
        if (this.calendarMonth > 11) {
          this.calendarMonth = 0
          this.calendarYear += 1
          this.loadYearDates(this.calendarYear)
        }
      }
    },

    // saveCalendarPosition() {
    //   let savedPosition = localStorage.getItem('calendar-position')
    //   if (!savedPosition) {
    //     localStorage.setItem('calendar-position', this.firstDays[this.month].top)
    //   }
    // },

    // Change the calendar mode between normal, months, years
    changeCalendarTo(mode) {
      this.calendar = mode
    },

    // Touch functions
    calendarTouched() {
      this.touch.start = event.touches[0].screenY
    },
    calendarLoad() {
      this.touch.end = event.touches[0].screenY
      this.touch.swype = this.touch.start - this.touch.end
    },
    calendarChange() {
      if (this.touch.swype <= -this.touch.threshold) {
        this.calendaryTo('up')
      } else if(this.touch.swype >= this.touch.threshold) {
        this.calendaryTo('down')
      }
      this.touch.swype = 0
    }
  },
  beforeMount() {
    this.loadYearDates(this.calendarYear)

    this.setTodayAsSelected()
    this.setTasks
  },
  mounted() {
    // this.saveCalendarPosition()
  },
  computed: {
    reloadCalendar() {
      let reload = this.$store.getters['calendary/reload']
      console.log(reload)
      if (reload === true) {
        console.log('ASdasd')
        this.loadYearDates(this.calendarYear)
        this.$store.commit('calendary/updated')
        return 'Reload calendar.'
      } else {
        return 'Calendar updated.'
      }
    },
    dates() {
      return this.$store.getters['calendary/dates']
    },
    // day() {
    //   if (this.days[0] === 'Lunes') {
    //     let day = new Date(this.year, this.month, 1).getDay() - 1
    //     if (day < 0) {
    //       day = 6
    //     }
    //     return day
    //   } else if (this.days[0] === 'Domingo') {
    //     return new Date(this.year, this.month, 1).getDay()
    //   }
    // },
    setTasks() {
      let tasks = this.$store.getters['task/getFullList'].filter( task => task.date !== '' )
      tasks.forEach( task => {
        let taskDate = task.date
        this.yearDates.filter( date => {
          if (date.fullDate === taskDate) {
            date.points.push(task)
          }
        })
      })
      return tasks
    },
    ...mapState('calendary', {
      year: 'year',
      months: 'months',
      month: 'month',
      days: 'days',
      date: 'date',
    })
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  // padding: 1rem;
  padding-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  & button {
    font-size: 1.5rem;
    font-family: $niramit;
    font-weight: 700;
    color: $primary;
    &.year-handler {
      font-family: $lato;
    }
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
    // stroke-width: 2px;
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



// section {
//   width: 100%;
//   & .week {
//     width: 100%;
//     text-align: center;
//     display: grid;
//     grid-template-columns: repeat(7, 1fr);
//     border-bottom: 1px solid $line;

//     & * {
//       width: 100%;
//     }
//   }

//   & .container {
//     $date-size: 1fr;
//     max-height: 3rem * 6;
//     width: 100%;
//     overflow-y: hidden;

//     & .dates {
//       display: grid;
//       grid-template-columns: repeat(7, $date-size);
//       grid-template-rows: repeat(6, $date-size);

//       transition: .4s ease;

//       & * {
//         width: 100%;
//       }
//     }
//   }
// }
</style>