<template>
  <div>
    <!-- <date></date> -->
    <calendary></calendary>
    <task></task>
  </div>
</template>

<script>
import date from '@/components/date'
import calendary from '@/components/calendary'
import task from '@/components/task'

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
  }
}
</script>

<style lang="scss" scoped>

</style>
