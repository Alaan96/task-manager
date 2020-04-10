<template>
  <main>
    <div class="content">
      <nuxt />
      <!-- Notifications -->
      <!-- <notify></notify> -->
    </div>
    <nav-menu :pages="pages"></nav-menu>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import menu from '@/components/menu.vue'
import notify from '@/components/notify.vue'

export default Vue.extend({
  components: {
    'nav-menu': menu,
    notify,
  },
  data() {
    return {
      pages: [
        {
          icon: '',
          route: '/settings',
          text: 'Config'
        },
        {
          route: '/',
          text: 'Calendario'
        },
        {
          route: '/tasks',
          text: 'Tareas'
        }
      ] as any[],
    }
  }
})
</script>

<style lang="scss" scoped>
	main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    & .content {
      width: 100%;
      flex: 1 1 auto;
      overflow-y: auto;
    }
    & nav {
      flex: 0 1 4rem;
    }
	}
</style>
