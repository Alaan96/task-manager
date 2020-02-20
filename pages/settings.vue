<template>
  <div class="container">
    <tags></tags>
    <!-- <settings-data :data="configs" negative>
    </settings-data> -->
    <ul class="negative">
      <li>
        <span class="title">Etiquetas</span>
        <div class="config">
          <span @click="$store.commit('modal/showModal')">
            Gestionar etiquetas
          </span>
        </div>
      </li>
      <li>
        <span class="title">Vista al iniciar</span>
        <div class="config">
          <select name="defaultView" v-model="defaultView"
            @change="changeDefaultView(defaultView)">
            <option v-for="view in defaultViewOptions"
              :key="view.text"
              :value="view.value">
              {{view.text}}
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
          <span class="soon">Proximamente</span>
          <!-- <button-checkbox ></button-checkbox> -->
          <!-- <button :class="{'active': workOffline}">
            <label for="work-offline">{{workOffline ? 'Activado' : 'Desactivado'}}</label>
            <input type="checkbox" id="work-offline" v-model="workOffline">
          </button> -->
        </div>
      </li>
      <li>
        <span class="title">Modo oscuro</span>
        <div class="config">
          <span class="soon">Proximamente</span>
          <!-- <button-checkbox ></button-checkbox> -->
          <!-- <button :class="{'active': darkMode}">
            <label for="dark-mode">{{darkMode ? 'Activado' : 'Desactivado'}}</label>
            <input type="checkbox" id="dark-mode" v-model="darkMode">
          </button> -->
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
  created() {
    this.weekStart = this.$store.state.user.weekStart
    this.defaultView = this.$store.state.user.defaultView
  },
  data() {
    return {
      defaultViewOptions: [
        {text: 'Diaria', value: 'date'},
        {text: 'Calendario', value: 'calendar'},
      ],
      defaultView: '',

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
      this.options.weekStart = firstDay
      this.sendChanges()
    },
    changeDefaultView(view) {
      console.log('Change view')
      this.options.defaultView = view
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
      & span {
        font-weight: 600;
        color: $secondary;
        cursor: pointer;
      }
      & span.soon {
        color: $black;
        opacity: .4;
      }
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