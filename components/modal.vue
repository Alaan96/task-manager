<template>
  <div class="container" v-show="active" @click.self="close()" @keyup.esc="close()">
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
  props: {
    id: {
      type: String,
      required: true
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
  components: {
    btn
  },
  methods: {
    close(): void {
      this.$store.commit('modal/close', this.id)
    }
  },
  computed: {
    active(): boolean {
      return this.$store.state.modal[this.id]
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  @include center;
  position: absolute;
  top: 0;
  left: 0;
}
.modal {
  width: calc(100% - 2rem);
  margin: 0 auto;
  // padding: 1.5rem 1rem;
  background: $black;
  border-radius: .5rem;
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