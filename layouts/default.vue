<template>
  <main>
    <div class="content">
      <nuxt />
  
      <reminder :items="reminders"></reminder>
      <modal id="task"
        title="Nueva tarea">
        <task-form></task-form>
      </modal>
      <!-- Notifications -->
      <!-- <notify></notify> -->
    </div>
    <nav-menu :pages="pages"></nav-menu>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import menu from '@/components/menu.vue'
import notify from '@/components/notify.vue'
import reminder from '@/components/reminder.vue'
import modal from '@/components/modal.vue'
import taskForm from '@/components/task/form.vue'

export default Vue.extend({
  components: {
    'nav-menu': menu,
    notify,
    reminder,
    modal,
    'task-form': taskForm
  },
  data() {
    return {
      pages: [
        {
          icon: '',
          route: '/settings',
          text: 'Config'
        },
        {
          route: '/',
          text: 'Calendario'
        },
        {
          route: '/tasks',
          text: 'Tareas'
        }
      ] as any[],
      reminders: [
        {
          text:'Beber agua'
        },
        {
          text:'Hacer ejercicio'
        },
        {
          text:'Cuidado personal'
        },
      ] as any[]
    }
  }
})
</script>

<style lang="scss" scoped>
	main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    & .content {
      width: 100%;
      flex: 1 1 auto;
      overflow-y: auto;
    }
    & nav {
      flex: 0 1 4rem;
    }
	}
</style>
