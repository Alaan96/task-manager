<template>
  <div
    v-if="modalActive"
    class="modal">
    <span class="title">{{title}}</span>
    <slot></slot>
    <span class="close"
      @click="closeModal"
      @keyup.esc="closeModal">{{close}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    },
    close: {
      type: String,
      required: false,
      default: 'Cerrar'
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('modal/hideModal')
    }
  },
  computed: {
    modalActive() {
      return this.$store.getters['modal/activeState']
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  width: 80vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: fixed;
  top: 35vh;
  left: 10vw;
  background: $primary;
  color: $black;
  border-radius: .5rem;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.2);
  z-index: 50;

  animation: fade-in .6s ease;
}

.title {
  font-weight: 700;
}

.close {
  margin-top: 0.5rem;
  color: $secondary;
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