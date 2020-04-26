<template>
  <div class="date-info">
    <header>
      <span>{{this.selectedDate | formatedDate}}</span>
      <button class="close" @click="close()"><cross></cross></button>
    </header>
    <div class="content">
      <task-list></task-list>
    </div>
    <button class="add" @click="openTaskForm()">Agregar</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import task_list from './list.vue'

// Icons
import cross from '@/components/icons/cross.vue'

export default Vue.extend({
  components: {
    'task-list': task_list,
    cross
  },
  filters: {
    // Format dd/mm/aaaa to ddd 00 
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
  computed: {
    selectedDate(): string {
      return this.$store.state.date.selected
    }
  },
  methods: {
    openTaskForm(): void {
      this.$store.commit('modal/open', 'task')
    },
    close(): void {
      this.$store.commit('modal/close', 'date')
    }
  }
})
</script>

<style lang="scss" scoped>
  .date-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: $black;
    border-radius: .5rem;
  }

  header {
    width: 100%;
    height: 2em;
    flex: 0 1 2em;
    padding: 0 .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    border-bottom: 1px solid $line;

    & button.close {
      width: 1rem;
      height: 1rem;
    }
  }

  .content {
    width: 100%;
    min-height: 3rem;
    max-height: 100vmin;
    @include center;
    flex-direction: column;
    overflow-y: auto;
  }

  button.add {
    width: 100%;
    height: 2em;
    font-size: 1rem;
    font-weight: 600;
    color: $primary;
    border-top: 1px solid $line;
  }
</style>