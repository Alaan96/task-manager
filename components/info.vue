<template>
  <div
    class="info"
    :class="[{active}, {'err': status === 'error'}]"
    @click="active = !active">
    {{'Cannot access to database.'}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false
    }
  },
  props: {
    text: {
      type: String
    },
    status: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  width: 16rem;
  height: 2em;
  padding: 0 .5rem;
  @include center;
  font-size: 1rem;
  background: $line;
  // border: .1rem solid $line;
  border-right: none;
  color: $primary;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 1rem 0 0 1rem;
  position: absolute;
  right: 0;
  bottom: 3em;
  transition: .4s ease;

  transform: translateX(16rem);
}

@keyframes show {
  // from {

  // }
}

.active {
  transform: translateX(0);
}

.err {
  background: $cancel;
}
</style>