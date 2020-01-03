<template>
  <div>
    <date v-if="view === 'date'"></date>
    <calendary v-else-if="view === 'calendar'"></calendary>

    <task form></task>

    <task 
      v-for="task in list"
      :key="task.title"
      :content="task">
    </task>

    <div v-if="list.length === 0"
      class="no-tasks">
      No se encuentran tareas o eventos. 
    </div>
  </div>
</template>

<script>
import date from '@/components/date'
import calendary from '@/components/calendary'
import task from '@/components/task/task'

export default {
  components: {
    date,
    calendary,
    task,
  },
  middleware: 'authenticated',
  beforeMount() {
    console.log(this.$store.state.user.logged)
    // if (!this.$store.state.user.logged) {
    //   this.$router.push('/login')
    // }
  },
  data() {
    return {
      view: 'date'
    }
  },
  computed: {
		list() {
			return this.$store.getters['task/getFullList']
		}
	},
}
</script>

<style lang="scss" scoped>
  .no-tasks {
    width: 100%;
    @include center;
  }
</style>
