export const state = () => ({
  name: 'Nout',
  version: '1.1.0',
  status: 'Beta',
  description: '',
  
  author: 'Alan Jiménez C.',
  repository: 'Proximamente', //'https://github.com/Alaan96/task-manager'
  application: true,
})

export const getters = {
  name(state) {
    return state.name
  }
}