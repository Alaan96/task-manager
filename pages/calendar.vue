<template>
  <div class="container">
    <calendar></calendar>
    <task-list></task-list>
  </div>
</template>

<script>
import calendar from '@/components/calendar/calendar'
import list from '@/components/task/list'

export default {
  components: {
    calendar,
    'task-list': list
  },
  middleware: 'authenticated',
  methods: {
    // setWeekStart() {

    // }
  },
  beforeMount() {
    if (!this.$store.state.user.logged) {
      this.$router.push('/login')
    }

    
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 2rem 1rem;
  padding-top: 0;
}
</style>
