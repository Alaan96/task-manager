<template>
  <div class="container">
    <modal id="tags" :z="75" key="tags" closeTxt="Cerrar">
      <tag-manager></tag-manager>
    </modal>
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

import authenticated from "@/middleware/authenticated.ts";

import modal from '@/components/modal.vue'
import tagManager from "@/components/tag/manager.vue";
import taskForm from '@/components/task/form.vue'
import dateInfo from '@/components/task/date-info.vue'
import calendar from '@/components/calendar/calendar.vue'
import reminder from '@/components/reminder.vue'

import { fetch } from '@/assets/mixins/fetch.ts'

export default Vue.extend({
  components: {
    modal,
    'tag-manager': tagManager,
    'task-form': taskForm,
    'date-info': dateInfo,
    calendar,
    reminder,
  },
  middleware: authenticated,
  mixins: [fetch],
  created() {
    const firstDay: string = this.$store.getters['user/settings'].calendar_week_start
    this.$store.commit('calendar/changeWeekStart', firstDay)
  },
  beforeMount() {
    // this.openBirthdayModal()
  },
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
</style>
