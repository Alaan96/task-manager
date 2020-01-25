<template>
  <div class="container">
    <date></date>
    <task-list></task-list>

    <!-- <set-birthday></set-birthday> -->
  </div>
</template>

<script>
import date from '@/components/date'
import list from '@/components/task/list'
import setBirthday from '@/components/set-birthday'

export default {
  components: {
    date,
    'task-list': list,
    'set-birthday': setBirthday
  },
  middleware: 'authenticated',
  beforeMount() {
    this.userLogged()

    // this.openBirthdayModal()
  },
  methods: {
    userLogged() {
      if (!this.$store.state.user.logged) {
        this.$router.push('/login')
      } else {
        console.log('The user is logged.')
      }
    },
    // openBirthdayModal() {
    //   if (!this.$store.state.user.birthday || this.$store.state.user.birthday === '') {
    //     console.log('noo ai birdei', this.$store.state.user.birthday)
    //     this.$store.commit('modal/showModal')
    //   } else {
    //     console.log('si ai', this.$store.state.user.birthday)
    //   }
    // }
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
