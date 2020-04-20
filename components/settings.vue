<template>
  <section>
    <header>
      <div>
        <img src="@/static/settings.svg" alt="settings-icon">
        <h1>Configuración</h1>
      </div>
      <button class="save-settings" @click="save_settings()">{{save_state}}</button>
    </header>

    <ul id="settings">
      <li>
        <span>Etiquetas</span>
        <button @click="manage_tags()">Gestionar etiquetas</button>
      </li>
      <li>
        <span>Personalizar calendario</span>
        <button @click="customize_calendar()">Personalizar</button>
      </li>
      <li>
        <span>Vista al iniciar</span>
        <select-field :options="default_view_options"
          name="default_view"
          v-model="settings.default_view">
        </select-field>
      </li>
      <li>
        <span>Funcionar sin conexión</span>
        <toggle-button id="work_offline" v-model="settings.work_offline" />
      </li>
      <li>
        <span>Modo oscuro</span>
        <toggle-button id="dark_mode" v-model="settings.dark_mode" />
      </li>
      <li>
        <span>Acerca de</span>
        <button @click="about_app()">Ver más info</button>
      </li>
      <li>
        <button class="logout">Cerrar sesión</button>
      </li>
    </ul>

    <!-- Modals -->
    <modal id="tags" key="tags" closeTxt="Cerrar">
      <tag-manager></tag-manager>
    </modal>

    <modal id="calendar" key="calendar" title="Personalizar calendario" closeTxt="Cerrar">
      <div class="calendar-settings">
        <div class="preview">
          Vista previa proximamente.
        </div>
        <ul>
          <li>
            <span>Inicio de semana</span>
            <select-field :options="week_start"
              v-model="settings.calendar_week_start">
            </select-field>
          </li>
          <li>
            <span>Resaltar fin de semana</span>
            <toggle-button id="highlight_weekend"
              v-model="settings.calendar_highlight_weekend">
            </toggle-button>
          </li>
        </ul>
      </div>
    </modal>

    <modal id="about" key="about" title="Acerca de" closeTxt="Cerrar">
      <ul>
        <li>
          <span>Nombre:</span>
          <span class="text-data">{{name}}</span>
        </li>
        <li>
          <span>Versión:</span>
          <span class="text-data">{{version}}</span>
        </li>
        <li>
          <span>Estado:</span>
          <span class="text-data">{{status}}</span>
        </li>
        <li>
          <span>Autor:</span>
          <span class="text-data">{{author}}</span>
        </li>
        <li>
          <span>Repositorio:</span>
          <span class="text-data soon">{{repository}}</span>
        </li>
      </ul>
    </modal>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import btn from '@/components/buttons/button.vue'
import selectField from '@/components/inputs/select-field.vue'
import toggleBtn from '@/components/buttons/toggle-button.vue'
import modal from '@/components/modal.vue'
import tagManager from '@/components/tag/manager.vue'

import { User, Option } from '@/assets/interfaces.ts'
import { AxiosResponse, AxiosError } from 'axios'

export default Vue.extend({
  components: {
    btn,
    'select-field': selectField,
    'toggle-button': toggleBtn,
    modal,
    'tag-manager': tagManager
  },
  data() {
    return {
      settings: {
        calendar_week_start: '',
        calendar_highlight_weekend: false,
        default_view: '',
        work_offline: false,
        dark_mode: false,
      } as object,
      save_state: 'Guardado' as string,

      default_view_options: [
        {text: 'Calendario', value: 'calendar'},
        {text: 'Tareas', value: 'tasks'},
      ] as Option[],
      week_start: [
        {text: 'Domingo', value: 'Domingo'},
        {text: 'Lunes', value: 'Lunes'},
      ] as Option[]
    }
  },
  watch: {
    settings: {
      handler(newVal: object): void {
        const equalSettings: boolean = this.equalSettings(this.userSettings, newVal)
        if (equalSettings === true) {
          this.save_state = 'Guardado'
        } else {
          this.save_state = 'Guardar'
        }
      },
      deep: true
    }
  },
  computed: {
    userSettings(): object {
      return this.$store.getters['user/settings']
    },
    ...mapState('app', {
      name: 'name',
      version: 'version',
      status: 'status',
      author: 'author',
      repository: 'repository'
    })
  },
  beforeMount() {
    Object.assign(this.settings, this.userSettings)
  },
  methods: {
    save_settings(): void {
      if (this.save_state === 'Guardar') {
        const settings: object = { settings: this.settings }
        const id: string = this.$store.getters['user/id']
        this.$axios.$put(`${location.origin}/update/${id}`, settings)
          .then((res: any) => {
            console.log(res)
            this.$store.commit('user/setSettings', res.user.settings)
            this.save_state = 'Guardado'
          })
          .catch((err: any) => console.log(err.response.data))
      }
    },
    manage_tags(): void {
      this.$store.commit('modal/open', 'tags')
    },
    customize_calendar(): void {
      this.$store.commit('modal/open', 'calendar')
    },
    about_app(): void {
      this.$store.commit('modal/open', 'about')
    },
    equalSettings(defaultSettings: object, updatedSettings: object): boolean {
      const defaultValues: any[] = Object.values(defaultSettings)
      const updatedValues: any[] = Object.values(updatedSettings)
      let equal: boolean = false

      if (defaultValues.length !== updatedValues.length) {
        equal = false
      } else {
        equal = true
        updatedValues.forEach( (value, index) => {
          if (defaultValues[index] !== updatedValues[index]) {
            equal = false
          }
        })
      }
      return equal
    }
  }
})
</script>

<style lang="scss" scoped>
section {
  width: 100vw;
  height: 100%;
  padding: 0 1rem;
  background: linear-gradient($black, transparentize($black, .8));
  overflow: hidden;
}

header {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & div {
    display: flex;
  }
  & img {
    width: 1rem;
    margin-right: .5rem;
  }
  & h1, button.save-settings {
    font-size: 1rem;
    font-weight: 700;
    color: $primary;
  }
}

ul {
  @include settings-list;
}

button {
  font-size: .80rem;
  font-weight: 600;
  color: $secondary;
  cursor: pointer;
}
button.logout {
  font-size: 1rem;
  color: $cancel;
}

// button {
//   width: 6rem;
//   height: 1.5rem;
//   @include center;
//   font-size: .75rem;
//   font-family: $niramit;
//   background: $gray;
//   color: $black;
//   border-radius: 1rem;
//   & label {
//     width: 100%;
//     height: 100%;
//     display: block;
//   }
//   & input {
//     display: none;
//   }
// }

.active {
  background: $secondary;
  color: $primary;
}



.calendar-settings {
  width: 100%;
  padding: 1rem;
}

.preview {
  width: 100%;
  height: 12rem;
  @include center;
  color: $light;
  border: 1px solid $line;
  border-radius: .25rem;
}

ul {
  @include settings-list
}

span.text-data {
  font-size: 1.25rem;
  font-weight: 700;
}
</style>