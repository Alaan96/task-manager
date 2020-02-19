<template>
  <div>
    <header>
      <span class="name">{{name}}</span>
    </header>

    <section>
      <ul class="negative">
        <li>
          <span class="title">Email</span>
          <div class="config">{{email}}</div>
        </li>
        <li v-if="birthday">
          <span class="title">Cumpleaños</span>
          <div class="config">{{birthday}}</div>
        </li>
      </ul>
    </section>

    <section class="actions">
      <button @click="logout">
        Cerrar sesión
      </button>
    </section>
  </div>
</template>

<script>
import data from '@/components/data'

import { mapState } from 'vuex'

export default {
  components: {
    'user-data': data
  },
  computed: {
    ...mapState('user', {
      name: 'name',
      email: 'email',
      birthday: 'birthday'
    })
  },
  methods: {
    logout() {
      this.$store.commit('user/logout')
      localStorage.removeItem('keepSession')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: center;
  position: relative;
  background: $line;
}

.name {
  width: 7rem;
  height: 2rem;
  // padding: 0 2rem;
  @include center;
  position: absolute;
  bottom: -1rem;
  font-size: 1.3rem;
  font-weight: 700;
  background: $primary;
  color: $secondary;
  border-radius: 1rem;
}

ul {
  width: 100%;
  padding: 2rem 1rem;
  & li {
    width: 100%;
    height: 4rem;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $line;
    & .title {
      font-weight: 700;
    }
    & .config {
      // color: $light;
      color: $secondary;
      cursor: pointer;
    }
  }
}

.actions {
  width: 100%;
  height: 4rem;
  @include center;
  position: relative;
  left: 0;
  bottom: 0;
}

button {
  width: 10rem;
  height: 2rem;
  position: absolute;
  font-family: $niramit;
  font-size: 1rem;
  color: $cancel;
  border: 1px solid $cancel;
  border-radius: 1rem;
}
</style>