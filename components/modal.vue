<template>
  <div
    v-if="modalActive"
    class="modal">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    modalActive() {
      return this.$store.getters['modal/activeState']
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  width: 18rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: fixed;
  top: 40vh;
  background: $primary;
  color: $black;
  border-radius: .5rem;

  animation: fade-in .6s ease;
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