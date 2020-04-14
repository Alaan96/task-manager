<template>
  <div class="container">
    <modal id="task" :z="50" key="task">
      <task-form></task-form>
    </modal>
    <modal id="date" :z="25" key="date">
      <date-info></date-info>
    </modal>

    <calendar></calendar>
    <reminder></reminder>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import modal from '@/components/modal.vue'
import taskForm from '@/components/task/form.vue'
import dateInfo from '@/components/task/date-info.vue'
import calendar from '@/components/calendar/calendar.vue'
import reminder from '@/components/reminder.vue'

export default Vue.extend({
  components: {
    modal,
    'task-form': taskForm,
    'date-info': dateInfo,
    calendar,
    reminder,
  },
  // middleware: 'authenticated',
  async fetch({ $axios, store }) {
    try {
      $axios.defaults.headers.common.token = localStorage.getItem('token')
      const loaded: boolean = store.getters['user/loaded']
      if (loaded === false) {
        const id: string = localStorage.getItem('id') || ''

        // Load user data
        await store.dispatch('user/profileData', `${location.origin}/user/${id}`)

        // Load tasks
        await store.dispatch('task/tasksDB', `${location.origin}/tasks/${id}`)
      }
    } catch(err) {
      // if (err.response.data) {
      //   console.log(err.response.data)
      // } else {
        console.log(err)
      // }
    }
  },
  created() {
    const firstDay = this.$store.state.user.weekStart
    this.$store.commit('calendar/changeWeekStart', firstDay)
  },
  beforeMount() {
    // this.openBirthdayModal()
  },
  // computed: {
  //   blur(): boolean {
  //     const some_modal_active: boolean = this.$store.getters['modal/some_active']
  //     return some_modal_active
  //   }
  // },
  methods: {
    // openBirthdayModal() {
    //   if (!this.$store.state.user.birthday || this.$store.state.user.birthday === '') {
    //     console.log('noo ai birdei', this.$store.state.user.birthday)
    //     this.$store.commit('modal/showModal')
    //   } else {
    //     console.log('si ai', this.$store.state.user.birthday)
    //   }
    // }
  }
})
</script>

<style lang="scss" scoped>
.container {
  padding: 0 1rem;
  padding-bottom: 1rem;
  transition: .2s ease;
}

// .blurred {
//   filter: blur(.25rem);
// }
</style>
