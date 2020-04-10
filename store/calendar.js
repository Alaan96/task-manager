export const state = () => ({
  year: new Date().getFullYear(),
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  month: new Date().getMonth(),
  // Order of the week
  days: [
    // 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  date: new Date().getDate(),
})

export const mutations = {
  changeMonth(state, orientation) {
    if (orientation === 'up') {
      state.month -= 1
      if (state.month < 0) {
        state.month = 11
        state.year -= 1
      }
    } else if (orientation === 'down') {
      state.month += 1
      if (state.month > 11) {
        state.month = 0
        state.year += 1
      }
    }
  },
  setMonth(state, month) {
    if (month) {
      const index = state.months.indexOf(month)
      state.month = index
    }
  },
  changeYear(state, orientation) {
    if (orientation === 'up') {
      state.year -= 1
    } else if (orientation === 'down') {
      state.year += 1
    }
  },
  changeWeekStart(state, firstDay) {
    if (firstDay === 'Lunes') {
      state.days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    } else if (firstDay === 'Domingo') {
      state.days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    }
  },
  // showTasksOf(state, date) {
  //   console.log(`Showing tasks dated ${date}`);
  // }
}

export const getters = {
  dates: state => new Date(state.year, state.month + 1, 0).getDate(),
  days: state => state.days,
  firstDay: state => state.days[0],
}