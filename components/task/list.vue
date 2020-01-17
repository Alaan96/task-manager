<template>
  <div>
    <task-form></task-form>

    <div v-if="!list || list.length === 0"
      class="no-tasks">
      No se encuentran tareas o eventos. 
    </div>

    <task
      v-for="(task, index) in list"
      :key="`Tarea ${index} - ${task.title}`"
      :content="task"
      :index="index">
    </task>
  </div>
</template>

<script>
import task from '@/components/task/task'
import taskForm from '@/components/task/task-form'

export default {
  components: {
    task,
    'task-form': taskForm
  },
  computed: {
    list() {
      return this.$store.getters['task/getFullList']
    }
  }
}
</script>

<style lang="scss" scoped>
.no-tasks {
  width: 100%;
  @include center;
}
</style>