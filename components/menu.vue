<template>
  <nav>
    <!-- <div v-for="page in pages"
      :key="page.text">
      <nuxt-link :to="page.route"
        exact-active-class="selected">
        {{page.text}}
      </nuxt-link>
    </div> -->
    <nuxt-link to="/settings"
      exact-active-class="selected">
      <img src="@/static/settings.svg" alt="settings">
      <span>Config</span>
    </nuxt-link>
    <nuxt-link to="/"
      exact-active-class="selected">
      <img src="@/static/calendar.svg" alt="calendar">
      <span>Calendario</span>
    </nuxt-link>
    <nuxt-link to="/tasks"
      exact-active-class="selected">
      <img src="@/static/tasks.svg" alt="tasks">
      <span>Tareas</span>
    </nuxt-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

// Icons

export default Vue.extend({
  components: {
    // Icons
  },
  props: {
    pages: {
      type: Array,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // position: fixed;
  // left: 0;
  // bottom: 0;
  border-top: 1px solid $line;
  // z-index: 100;
}

a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: .75rem;
  opacity: .6;
  & span {
    margin-top: .25em;
  }
}

.selected {
  opacity: 1;
}
</style>