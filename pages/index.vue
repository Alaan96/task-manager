<template>
  <div class="container">
    <date></date>
    <task-list></task-list>
  </div>
</template>

<script>
import date from '@/components/date'
import list from '@/components/task/list'

export default {
  components: {
    date,
    'task-list': list
  },
  middleware: 'authenticated',
  beforeMount() {
    if (!this.$store.state.user.logged) {
      this.$router.push('/login')
    } else {
      console.log('The user is logged.')
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
</style>
