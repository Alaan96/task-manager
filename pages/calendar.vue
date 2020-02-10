<template>
  <div class="container">
    <calendary></calendary>
    <task-list></task-list>
  </div>
</template>

<script>
import calendary from '@/components/calendar/calendary'
import list from '@/components/task/list'

export default {
  components: {
    calendary,
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
