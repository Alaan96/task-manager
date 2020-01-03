export const state = () => ({
  list: [
    // Ordenar los mails
    {
      title: 'Ordenar los mails',
      description: '',
      list: {
        title: '',
        items: [],
      },
      important: false,
      urgent: false,
      time: {
        initial: {
          hour: '09:00',
          active: false
        },
        final: {
          hour: '13:00',
          active: false
        }
      },
      date: {
        string: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        active: false
      },
      tag: {
        text: 'Tarea',
        color: '#66BBD1'
      }
    },
    // Pagar facturas
    {
      title: 'Pagar facturas',
      description: '',
      list: {
        title: '',
        items: [
          {
            text: 'Obra social',
            complete: false
          },
          {
            text: 'Celular',
            complete: true
          },
          {
            text: 'Internet',
            complete: false
          },
          {
            text: 'Alquiler',
            complete: false
          },
        ],

      },
      important: true,
      urgent: false,
      time: {
        initial: {
          hour: '09:00',
          active: false
        },
        final: {
          hour: '13:00',
          active: false
        }
      },
      date: {
        string: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        active: false
      },
      tag: {
        text: 'Servicios',
        color: '#E9B786'
      }
    },
    // Festejar Navidad
    {
      title: 'Festejar Navidad',
      description: '',
      list: {
        title: '',
        items: [],
      },
      important: false,
      urgent: false,
      time: {
        initial: {
          hour: '09:00',
          active: false
        },
        final: {
          hour: '13:00',
          active: false
        }
      },
      date: {
        string: `25/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        active: true
      },
      tag: {
        text: 'Evento',
        color: '#BC78D8'
      }
    },
  ]
})

export const mutations = {
  addTask(state, task) {
    let isIncluded = state.list.includes(task)
    if (task && !isIncluded) {
      state.list.unshift(task)
      console.log('Task added correctly.')
    }
    console.log('Task already exist in the list.')
  }
}

export const getters = {
  getFullList(state) {
    return state.list
  }
}