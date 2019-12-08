export const state = () => ({
  // Order of the week
  days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  date: new Date().getDate(),
})

export const mutations = {
  // changeMonth(state, orientation) {
  //   if (orientation) {
  //     if (orientation === 'previous') {
  //       state.month -= 1
  //       if (state.month < 0) {
  //         state.month = 11
  //         state.year -= 1
  //       }
  //     } else if (orientation === 'next') {
  //       state.month += 1
  //       if (state.month > 11) {
  //         state.month = 0
  //         state.year += 1
  //       }
  //     }
  //     console.log(`Go to ${orientation} month`)
  //   } else {
  //     console.log('Orientation undefined')
  //   }
  // },
  //	chageWeekOrder(state) {
  //		
  //	}
}

export const getters = {
  dates(state) {
    return new Date(state.year, state.month + 1, 0).getDate()
  }
}

export const actions = {
  // loadCalendary(state) {
    //		let date = new Date()
    //		state.year = date.getFullYear()
    //		state.month = date.getMonth()
    //		console.log(state.year)
    //		console.log(state.month)
  // }
}