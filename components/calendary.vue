<template>
  <div>
    <header>
      <button @click="changeMonth('previous')">previous</button>
      <span @click="changeMonth">{{months[month]}}</span>
      <button @click="changeMonth('next')">next</button>
    </header>

    <section>
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
          :style="{transform: `translateY(-${calendaryPosition}px)`}"
          @touchstart="calendaryTouched"
          @touchmove="calendaryLoad"
          @touchend="calendaryEnd">
          <number
            v-for="(date, index) in datesList"
            :key="index"
            :number="date.number"
            :fullDate="date.fullDate"
            :index="index"
            :monthNumber="date.monthNumber"
            :data-date="date.fullDate"
            @click.native="selectDate(date.number)"
            >
          </number>
  
        </div>
      </div>
      {{$store.state.date.selected}}
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import number from '@/components/number'

export default {
  data() {
    return {
      datesList: [],
      firstDays: [],
      calendaryPosition: parseInt(localStorage.getItem('calendary-position')) || 0,

      // Touch
      touch: {
        start: 0,
        end: 0,
        threshold: 85,
        swype: 0
      }
    }
  },
  components: {
    number
  },
  methods: {
    loadDatesList() {
      let firstDay
      if (this.days[0] === 'Lunes') {
        firstDay = new Date(this.year, 0, 1).getDay() - 1
      } else if (this.days[0] === 'Domingo') {
        firstDay = new Date(this.year, 0, 1).getDay()
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
          this.datesList.push({
            number: date,
            month: `${this.months[index]}`,
            monthNumber: index + 1,
            fullDate: `${date}/${index + 1}/${this.year}`
          })
        }
      })
    },

    saveEveryFirstDay(year) {
      let savedYear = localStorage.getItem(`${year}`)
      if (!savedYear) {
        this.months.forEach( (month, index) => {
          this.firstDays.push({
            top: document.querySelector(`svg[data-date="1/${index + 1}/${this.year}"]`).getBoundingClientRect().top - 99,
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

    selectDate(number) {
      // console.log('Hola jejox', number)
    },

    // Touch functions
    calendaryTouched() {
      this.touch.start = event.touches[0].screenY
    },
    calendaryLoad() {
      this.touch.end = event.touches[0].screenY
      this.touch.swype = this.touch.start - this.touch.end
    },
    calendaryEnd() {
      if (this.touch.swype <= -this.touch.threshold) {
        this.changeMonth('previous')
      } else if(this.touch.swype >= this.touch.threshold) {
        this.changeMonth('next')
      }
      this.touch.swype = 0
    }
  },
  beforeMount() {
    this.loadDatesList()
  },
  mounted() {
    this.saveEveryFirstDay(this.year)
    this.saveCalendaryPosition()
  },
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
  padding: 1rem 0;
  @include center;
  & span {
    font-size: 1.3rem;
    font-weight: 700;
    color: $primary;
  }
}

section {
  width: 100%;
  & .week {
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(7, 3rem);
    border-bottom: 1px solid $line;

    & * {
      width: 100%;
    }
  }

  & .container {
    $date-size: 3rem;
    max-height: $date-size * 6;
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