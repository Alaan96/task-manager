<template>
  <div class="container">
    <tags></tags>
    <!-- <settings-data :data="configs" negative>
    </settings-data> -->
    <ul class="negative">
      <li>
        <span class="title">Etiquetas</span>
        <div class="config"
          @click="$store.commit('modal/showModal')">Gestionar etiquetas</div>
      </li>
      <li>
        <span class="title">Vista al iniciar</span>
        <div class="config">
          <select name="defaultPage" v-model="defaultPage">
            <option v-for="page in defaultPageOptions"
              :key="page.text"
              :value="page.value">
              {{page.text}}
            </option>
          </select>
        </div>
      </li>
      <li>
        <span class="title">Inicio de semana</span>
        <div class="config">
          <select name="weekStart" v-model="weekStart"
            @change="changeWeekStart(weekStart)">
            <option v-for="day in weekStartOptions"
              :key="day.text"
              :value="day.value">
              {{day.text}}
            </option>
          </select>
        </div>
      </li>
      <li>
        <span class="title">Funcionar sin conexión</span>
        <div class="config">
          <!-- <button-checkbox ></button-checkbox> -->
          <button :class="{'active': workOffline}">
            <label for="work-offline">{{workOffline ? 'Activado' : 'Desactivado'}}</label>
            <input type="checkbox" id="work-offline" v-model="workOffline">
          </button>
        </div>
      </li>
      <li>
        <span class="title">Modo oscuro</span>
        <div class="config">
          <!-- <button-checkbox ></button-checkbox> -->
          <button :class="{'active': darkMode}">
            <label for="dark-mode">{{darkMode ? 'Activado' : 'Desactivado'}}</label>
            <input type="checkbox" id="dark-mode" v-model="darkMode">
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import data from '@/components/data'
import tags from '@/components/tags'
import modal from '@/components/modal'
import btnCheckbox from '@/components/inputs/button-checkbox'

import { helpers } from '@/assets/mixins/api-helpers'

export default {
  components: {
    // 'settings-data': data,
    tags,
    modal,
    'button-checkbox': btnCheckbox
  },
  data() {
    return {
      defaultPageOptions: [
        {text: 'Diaria', value: '/'},
        {text: 'Calendario', value: '/calendar'},
      ],
      defaultPage: '/calendar',
      weekStartOptions: [
        {text: 'Lunes', value: 'Lunes'},
        {text: 'Domingo', value: 'Domingo'},
      ],
      weekStart: '',

      workOffline: false,
      darkMode: false,

      options: {}
    }
  },
  mixins: [helpers],
  methods: {
    changeWeekStart(firstDay) {
      console.log('Change week start')
      this.options.weekStart = this.weekStart
      this.$store.commit('calendary/changeWeekStart', firstDay)
      this.sendChanges()
    },
    sendChanges() {
      let options = this.options
      console.log(options)
      this.$axios.$put(`${this.url}/user/${this.id}`, options)
        .then( res => {
          console.log(res)
        })
        .catch( err => {
          console.log(err)
        })

      this.options = {}
    },
  },
  beforeMount() {
    this.optionsFromStore
  },
  computed: {
    optionsFromStore() {
      let firstDay = this.$store.state.user.weekStart
      this.weekStart = firstDay
      return 'Options loaded from store.'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  background: $primary;
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

.negative {
  & li {
    border-color: $gray;
  }
  & .title {
    color: $black;
  }
  & .config {
    // color: $black;
  }
}


select {
  min-width: 8rem;
  min-height: 2rem;
  padding: 0 .5rem;
  font-size: .75rem;
  font-family: $niramit;
  background: $primary;
  color: $black;
  border-color: $gray;
  border-radius: $radius;
  outline: none;
  & option {
    outline: none;
  }
}

button {
  width: 6rem;
  height: 1.5rem;
  @include center;
  font-size: .75rem;
  font-family: $niramit;
  background: $gray;
  color: $black;
  border-radius: 1rem;
  & label {
    width: 100%;
    height: 100%;
    display: block;
  }
  & input {
    display: none;
  }
}

.active {
  background: $secondary;
  color: $primary;
}
</style>