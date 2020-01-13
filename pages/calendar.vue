<template>
  <div class="container">
    <calendary></calendary>

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
import calendary from '@/components/calendary'
import task from '@/components/task/task'

export default {
  components: {
    calendary,
    task,
  },
  middleware: 'authenticated',
  beforeMount() {
    if (!this.$store.state.user.logged) {
      this.$router.push('/login')
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
.container {
  padding: 0 1rem;
}

.no-tasks {
  width: 100%;
  @include center;
}
</style>
