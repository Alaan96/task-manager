<template>
  <div>

    <header>
      <button class="month-handler">
        <label for="month-input">{{months[month]}}</label>
        <input type="radio" id="month-input" v-show="false"
          value="month" v-model="calendar">
      </button>

      <div class="controls">
        <button>
          <arrow></arrow>
        </button>
        <button>
          <arrow direction="down"></arrow>
        </button>
      </div>

      <button class="year-handler">
        <label for="year-input">{{year}}</label>
        <input type="radio" id="year-input" v-show="false"
          value="month" v-model="calendar">
      </button>
    </header>


    <div class="calendar"
      ref="calendar"
      @touchstart="calendarTouched"
      @touchmove.prevent="calendarLoad"
      @touchend="calendarChange">

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336 320" v-if="calendar === 'default'">

        <g class="week">
          <text v-for="(dayWeek, index) in days" :key="dayWeek"
            :x="48 * index + 24" y="24" text-anchor="middle">
            {{ dayWeek.slice(0, 1) }}
          </text>
          <line x1="0" x2="336" y1="32" y2="32" stroke-width="2" />
        </g>

        <g class="container">
          <g class="dates"
            :style="{transform: `translateY(-${positions[calendarMonth]}px)`}"
            @click="selectDate()">
            <date 
              v-for="(date, index) of yearDates" :key="index"
              :index="index"
              :x="date.x"
              :y="date.y"
              :day="date.day"
              :fullDate="date.fullDate">
              {{date.number}}
            </date>
          </g>
        </g>



          <!-- <circle cx="24" cy="24" r="21" class="border"/>
          <circle cx="24" cy="24" r="16" class="fill" v-if="today"/>
          <text x="24" y="30" text-anchor="middle">{{number}}</text> -->

          <!-- <circle v-for="(point, index) in points" :key="index" v-show="point.date === fullDate"
            :cx="pointPosition[index].x" :cy="pointPosition[index].y" r="4" :fill="point.tag.color"
            class="point"/> -->
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
      calendarPosition: 48 * 4, //parseInt(localStorage.getItem('calendar-position')) || 0


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
      let dateSelected = event.target.parentElement.attributes[2].value
      this.$store.commit('date/changeSelected', dateSelected)
    },


    loadYearDates(year) {
      // Reset datesList
      this.yearDates = []

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
          fullDate: ''
          // month: undefined,
          // monthNumber: undefined,
        })

        day++
      }

      this.months.forEach( (month, monthIndex) => {

        this.positions.push(y)

        for(let date = 1; date <= new Date(year, monthIndex + 1, 0).getDate(); date++) {
          if (day === 7) {
            week++
            day = 0
          }
          x = size * day
          y = size * (week - 1)

          this.yearDates.push({
            number: date,
            x: x,
            y: y,
            day: day,
            fullDate: `${this.formatDate(date)}/${this.formatDate(monthIndex + 1)}/${this.calendarYear}`
          })

          day++
        }
      })

      // this.months.forEach( (month, index) => {
        // Load dates of the year
        // for(let date = 1; date <= 30; date++) {
        // for(let date = 1; date <= new Date(this.year, index + 1, 0).getDate(); date++) {
          // let tags = this.tasks.filter( task => task.date.length > 0 )
          // x = size * (date - 1) + 24

          // this.yearDates.push({
          //   number: date,
          //   x: x,
          //   y: undefined
            // number: this.formatNumber(date, true),
            // month: `${this.months[index]}`,
            // monthNumber: index + 1,
            // fullDate: `${this.formatNumber(date)}/${this.formatNumber(index + 1)}/${this.year}`,
            // tags: tags
          // })
        // }
      // })
    },

    setTodayAsSelected() {
      let today = this.$store.getters['date/todayFullDate']
      this.$store.commit('date/changeSelected', today)
    },



    saveEveryFirstDay(year) {
      let savedYear = localStorage.getItem(`${year}`)
      console.log(this.$refs.calendar)
      let calendarTop = this.$refs.calendar.getBoundingClientRect().top
      console.log(calendarTop)
      if (!savedYear) {
        this.months.forEach( (month, index) => {
          this.firstDays.push({
            top: document.querySelector(`svg[data-date="1/${index + 1}/${this.year}"]`).getBoundingClientRect().top - calendarTop,
            month: this.months[index]
          })
        })
        localStorage.setItem(`${year}`, JSON.stringify(this.firstDays))
      }
      this.firstDays = JSON.parse(savedYear)
    },

    saveCalendarPosition() {
      let savedPosition = localStorage.getItem('calendar-position')
      if (!savedPosition) {
        localStorage.setItem('calendar-position', this.firstDays[this.month].top)
      }
    },

    adjustCalendar(month) {
      let position = this.firstDays[month].top
      if (this.calendarPosition !== position) {
        this.calendarPosition = position
      }
    },

    changeMonth(orientation) {
      this.$store.commit('calendary/changeMonth', orientation)
      this.adjustCalendar(this.month)
    },

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
        this.changeMonth('previous')
      } else if(this.touch.swype >= this.touch.threshold) {
        this.changeMonth('next')
      }
      this.touch.swype = 0
    }
  },
  beforeMount() {
    this.loadYearDates(this.calendarYear)

    this.setTodayAsSelected()
    // this.loadDatesList(this.year)
    // this.calendarYear = this.year
  },
  mounted() {
    // this.saveEveryFirstDay(this.year)
    // this.saveCalendarPosition()
  },
  // beforeUpdate() {
  //   if (this.year !== this.calendarYear) {
  //     this.loadDatesList(this.year)
  //     this.calendarYear = this.year
  //   } else {
  //   }
  // },
  computed: {
    dates() {
      return this.$store.getters['calendary/dates']
    },
    day() {
      if (this.days[0] === 'Lunes') {
        let day = new Date(this.year, this.month, 1).getDay() - 1
        if (day < 0) {
          day = 6
        }
        return day
      } else if (this.days[0] === 'Domingo') {
        return new Date(this.year, this.month, 1).getDay()
      }
    },
    tasks() {
      return this.$store.getters['task/getFullList']
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
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
    flex: 0 1 1rem;
    & button {
      width: 1.5rem;
      margin: 0 .5rem;
    }
  }

}

.calendar {
  width: 100%;
  & .container {
    max-height: 3rem * 6;
    overflow-y: hidden;
  }
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