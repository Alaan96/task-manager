<template>
  <div>
    <header>
      <div class="month">
        <span @click="changeCalendaryTo('months')">{{months[month]}}</span>
        <div v-if="calendary === 'default'">
          <button @click="changeMonth('previous')">
            <arrow></arrow>
          </button>
          <button @click="changeMonth('next')">
            <arrow direction="down"></arrow>
          </button>
        </div>
      </div>

      <span class="year">{{year}}</span>
    </header>

    <month-picker
      v-if="calendary === 'months'">
    </month-picker>

    <section v-else-if="calendary === 'default'">
      <div
        class="week">
        <span
          v-for="dayWeek in days"
          :key="dayWeek">
          {{dayWeek.slice(0, 1)}}
        </span>
      </div>

      <div class="container">
        <div
          class="dates"
          ref="calendary"
          :style="{transform: `translateY(-${calendaryPosition}px)`}"
          @touchstart="calendaryTouched"
          @touchmove.prevent="calendaryLoad"
          @touchend="calendaryChange">
          <number
            v-for="(date, index) in datesList"
            :key="index"
            :number="date.number"
            :fullDate="date.fullDate"
            :index="index"
            :monthNumber="date.monthNumber"
            :data-date="date.fullDate"
            :points="date.tags">
          </number>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import number from '@/components/number'
import monthPicker from '@/components/month-picker'

// Mixins
import { numberFunctions } from '@/assets/mixins/number-format'

// Icons
import arrow from '@/components/icons/arrow'

export default {
  data() {
    return {
      calendary: 'default',

      // Dates of the year
      datesList: [],

      // Every first day of the year (used to move the calendary)
      firstDays: [],

      // Number that defines which month the user is in
      calendaryPosition: 0, //parseInt(localStorage.getItem('calendary-position')) || 0

      calendaryYear: 0,

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
    number,
    'month-picker': monthPicker,
    arrow // Icon
  },
  mixins: [numberFunctions],
  methods: {
    loadDatesList(year) {
      // Reset datesList
      this.datesList = []

      let firstDay
      if (this.days[0] === 'Lunes') {
        firstDay = new Date(year, 0, 1).getDay() - 1
      } else if (this.days[0] === 'Domingo') {
        firstDay = new Date(year, 0, 1).getDay()
      }

      // Load previous dates
      for(let date = 1; date <= firstDay; date++) {
        this.datesList.push({
          number: '',
          month: undefined,
          monthNumber: undefined,
          fullDate: undefined
        })
      }


      this.months.forEach( (month, index) => {
        // Load dates of the year
        for(let date = 1; date <= new Date(this.year, index + 1, 0).getDate(); date++) {
          let tags = this.tasks.filter( task => task.date.length > 0 )

          this.datesList.push({
            number: this.formatNumber(date, true),
            month: `${this.months[index]}`,
            monthNumber: index + 1,
            fullDate: `${this.formatNumber(date)}/${this.formatNumber(index + 1)}/${this.year}`,
            tags: tags
          })
        }
      })
    },

    saveEveryFirstDay(year) {
      let savedYear = localStorage.getItem(`${year}`)
      let calendaryTop = this.$refs.calendary.getBoundingClientRect().top
      console.log(calendaryTop)
      if (!savedYear) {
        this.months.forEach( (month, index) => {
          this.firstDays.push({
            top: document.querySelector(`svg[data-date="1/${index + 1}/${this.year}"]`).getBoundingClientRect().top - calendaryTop,
            month: this.months[index]
          })
        })
        localStorage.setItem(`${year}`, JSON.stringify(this.firstDays))
      }
      this.firstDays = JSON.parse(savedYear)
    },

    saveCalendaryPosition() {
      let savedPosition = localStorage.getItem('calendary-position')
      if (!savedPosition) {
        localStorage.setItem('calendary-position', this.firstDays[this.month].top)
      }
    },

    adjustCalendary(month) {
      let position = this.firstDays[month].top
      if (this.calendaryPosition !== position) {
        this.calendaryPosition = position
      }
    },

    changeMonth(orientation) {
      this.$store.commit('calendary/changeMonth', orientation)
      this.adjustCalendary(this.month)
    },

    // Change the calendar mode between normal, months, years
    changeCalendaryTo(mode) {
      this.calendary = mode
    },

    // Touch functions
    calendaryTouched() {
      this.touch.start = event.touches[0].screenY
    },
    calendaryLoad() {
      this.touch.end = event.touches[0].screenY
      this.touch.swype = this.touch.start - this.touch.end
    },
    calendaryChange() {
      if (this.touch.swype <= -this.touch.threshold) {
        this.changeMonth('previous')
      } else if(this.touch.swype >= this.touch.threshold) {
        this.changeMonth('next')
      }
      this.touch.swype = 0
    }
  },
  beforeMount() {
    this.loadDatesList(this.year)
    this.calendaryYear = this.year
  },
  mounted() {
    this.saveEveryFirstDay(this.year)
    this.saveCalendaryPosition() // Testing
  },
  beforeUpdate() {
    if (this.year !== this.calendaryYear) {
      this.loadDatesList(this.year)
      this.calendaryYear = this.year
    } else {
    }
  },
  computed: {
    today() {
      return this.$store.getters['today/today']
    },
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
  padding: 1rem;
  padding-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    font-size: 1.3rem;
    font-weight: 700;
    color: $primary;
  }

  & .month {
    display: flex;
    align-items: center;
    & span {
      width: 7rem;
      display: inline-block;
    }

    & button {
      width: 1.3rem;
      margin: 0 .25rem;
    }
  }
  & .year {
    font-family: $lato;
  }

}

section {
  width: 100%;
  & .week {
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-bottom: 1px solid $line;

    & * {
      width: 100%;
    }
  }

  & .container {
    $date-size: 1fr;
    max-height: 3rem * 6;
    width: 100%;
    overflow-y: hidden;

    & .dates {
      display: grid;
      grid-template-columns: repeat(7, $date-size);
      grid-template-rows: repeat(6, $date-size);

      transition: .4s ease;

      & * {
        width: 100%;
      }
    }
  }
}
</style>