export const state = () => ({
  name: 'Nout',
  version: '1.0.1',
  status: 'Beta',
  description: '',
  
  author: 'Alan Jiménez Córdoba',
  // repository: 'https://github.com/Alaan96/task-manager',
  application: true,
})

export const getters = {
  name(state) {
    return state.name
  }
}