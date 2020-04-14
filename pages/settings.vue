<template>
  <section>
    <header>
      <img src="@/static/settings.svg" alt="settings-icon">
      <h1>Configuración</h1>
    </header>

    <ul id="settings">
      <li>
        <span>Etiquetas</span>
        <button @click="manage_tags()">Gestionar etiquetas</button>
      </li>
      <li>
        <span>Personalizar calendario</span>
        <button>Personalizar</button>
      </li>
      <li>
        <span>Vista al iniciar</span>
        <select-field :options="default_view_options"
          name="default_view"
          v-model="settings">
        </select-field>
      </li>
      <li>
        <span>Funcionar sin conexión</span>
        <toggle-button id="work_offline" v-model="settings" />
      </li>
      <li>
        <span>Modo oscuro</span>
        <toggle-button id="dark_mode" v-model="settings" />
      </li>
      <li>
        <span>Acerca de</span>
        <button>Ver más info</button>
      </li>
      <li>
        <button class="logout">Cerrar sesión</button>
      </li>
    </ul>

    <!-- Modals -->
    <modal id="tags" key="tags" closeTxt="Cerrar">
      <tag-manager></tag-manager>
    </modal>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import btn from '@/components/buttons/button.vue'
import selectField from '@/components/inputs/select-field.vue'
import toggleBtn from '@/components/buttons/toggle-button.vue'
import modal from '@/components/modal.vue'
import tagManager from '@/components/tag/manager.vue'

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
        default_view: '',
        work_offline: false,
        dark_mode: false,
      } as any,

      default_view_options: [
        {text: 'Calendario', value: 'calendar'},
        {text: 'Tareas', value: 'tasks'},
      ] as object[],
    }
  },
  beforeMount() {
    this.setSettingsFromDB('default_view', 'calendar')
    this.setSettingsFromDB('work_offline', false)
    this.setSettingsFromDB('dark_mode', true)
  },
  methods: {
    setSettingsFromDB(setting: string, value: string|boolean): void {
      if (setting && value) {
        this.settings[setting] = value
      }
    },
    manage_tags(): void {
      this.$store.commit('modal/open', 'tags')
    }
  }
})
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  background: linear-gradient($black, transparentize($black, .8));
}

header {
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  & img {
    width: 1rem;
    margin-right: .5rem;
  }
  & h1 {
    font-size: 1rem;
    font-weight: 700;
  }
}

ul {
  width: 100%;
  margin-top: 1rem;
  & li {
    width: 100%;
    min-height: 4rem;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $line;
    & span {
      flex: 0 1 auto;
      margin-right: .25rem;
      font-weight: 700;
    }
    &:last-child {
      border: none;
    }
  }
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
</style>