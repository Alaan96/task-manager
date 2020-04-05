<template>
  <div class="date-info">
    <header>
      <span>{{this.date | formatedDate}}</span>
      <!-- <button><cross></cross></button> -->
    </header>
    <div class="content">
      <template v-if="tasks.length > 0">
        <task v-for="(task, index) in tasks"
          :key="index"
          :content="task"
          :index="index">

        </task>
      </template>
      <span v-else>Sin tareas en esta fecha.</span>
    </div>
    <button class="add" @click="newTask()">
      Agregar
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import task from './task.vue'

// Icons
import cross from '@/components/icons/cross.vue'

export default Vue.extend({
  data() {
    return {
      // open: true as boolean,
      todayTask: [] as any[]
    }
  },
  filters: {
    formatedDate(fullDate: string): string {
      let formatedDate: string = ''
      if (fullDate) {
        const splitedDate: string[] = fullDate.split('/')
        const date: any = {
          year: parseInt(splitedDate[2]),
          month: parseInt(splitedDate[1]) - 1,
          day: parseInt(splitedDate[0])
        }
        const day = new Date(date.year, date.month, date.day).getDay()
        const week: string[] = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb']
        formatedDate = `${week[day]} ${date.day}`
      }
      return formatedDate
    }
  },
  methods: {
    close(): void {
      this.$store.commit('calendar/closeModal')
    },
    newTask(): void {
      this.$store.commit('modal/open', 'task')
    }
  },
  computed: {
    open(): boolean {
      return this.$store.state.calendar.modalActive
    },
    date(): string {
      return this.$store.state.date.selected
    },
    tasks(): object[] {
      const fullList: any[] = this.$store.getters['task/list']
      const tasks: any[] = fullList.filter(task => task.date === this.date)
      return tasks
    },
  },
  components: {
    task,
    cross
  }
})
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    @include center;
    position: absolute;
    top: 0;
    left: 0;
  }
  .date-info {
    width: 100%;
    background: $black;
    border-radius: .5rem;
  }

  header {
    width: 100%;
    height: 2em;
    padding: 0 .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    border-bottom: 1px solid $line;
    & svg {
      width: 1rem;
    }
  }

  .content {
    width: 100%;
    min-height: 3rem;
    @include center;
  }

  button.add {
    width: 100%;
    height: 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: $primary;
    border-top: 1px solid $line;
  }
</style>