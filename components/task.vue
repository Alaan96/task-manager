<template>
  <form @submit.prevent>
    <input type="text" :placeholder="task.title">
  </form>
</template>

<script>
  export default {
    data() {
      return {
        task: {
          title: 'Agregar nueva tarea o evento...',
          detail: 'Detalle de la tarea',
          list: {
            title: 'Lista',
            items: [
              {
                item: '',
              }
            ]
          },
          important: false,
          urgent: false,
          time: {
            initial: {
              hour: 9,
              active: true
            },
            final: {
              hour: 13,
              active: true
            }
          },
          date: null,
          tags: []
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
// form {

// }


// .active {

// }
</style>