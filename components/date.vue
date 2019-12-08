<template>
  <div>
    <div class="days">
      <span
        v-for="day in days"
        :keys="day"
        class="task-title"
        :class="{'today': today(day)}">
        {{day.slice(0, 1)}}
      </span>
    </div>
    <span class="date">{{date}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {

    }
  },
  methods: {
    today(day) {
      console.log(day == this.dia)
      if(day === this.days[this.day]) {
        return true
      } else {
        return false
      }
    },
  },
  computed: {
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

      // if (this.startsOnSunday) {
      //   return this.days[this.day]
      // } else {
      //   if (this.day === 0) {
      //     this.day = 7
      //     return this.days[this.day]
      //   }
      // }
    },
    ...mapState('calendary', {
      year: 'year',
      month: 'month',
      days: 'days',
      date: 'date',
    })
  }
};
</script>

<style lang="scss" scoped>
.days {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  & span {
    margin: 0 .4rem;
    opacity: .2;
  }
}

.date {
  display: flex;
  justify-content: center;
  font-size: 6rem;
  font-weight: 400;
  font-family: $lato;
}

span.today {
  opacity: 1;
}
</style>