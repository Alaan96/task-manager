<template>
  <div class="container" v-show="active" @click.self="close(id)" @keyup.esc="close(id)"
    :style="{'z-index': z}">
    <div class="modal">
      <header class="title" v-if="title">{{title}}</header>

      <div class="content">
        <slot></slot>
      </div>

      <btn :text="button" v-if="button"/>
      <btn :text="closeTxt" simple v-if="closeTxt" @click.native="close()" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import btn from '@/components/buttons/button.vue'

export default Vue.extend({
  components: {
    btn
  },
  props: {
    id: {
      type: String,
      required: true
    },
    z: {
      type: Number,
      default: 10
    },
    title: {
      type: String,
      required: false
    },
    button: {
      type: String,
      required: false
    },
    closeTxt: {
      type: String,
      required: false
    }
  },
  computed: {
    active(): boolean {
      return this.$store.state.modal[this.id]
    }
  },
  methods: {
    close(id: string): void {
      this.$store.commit('modal/close', id)
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: calc(100vh - 4em);
  @include center;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(.25rem);
}
.modal {
  width: 100%;
  margin: 0 auto;
  background: $black;
  border-radius: .5rem;
  box-shadow: 0 0 .75rem rgba(0, 0, 0, 0.25);
}

header.title {
  width: 100%;
  margin-top: 1rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
}

.content {
  width: 100%;
  min-height: 2em;
  @include center;
}

@keyframes fade-in {
  from {
    transform: scale(.4);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>