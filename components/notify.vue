<template>
  <div
    class="notification"
    :class="[{active}, {'err': status === 'error'}]">
    {{text}}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('notify', {
      text: 'text',
      status: 'status',
      active: 'active',
    })
  },
}
</script>

<style lang="scss" scoped>
$notification-size: 14rem;

.notification {
  width: $notification-size;
  height: 2em;
  padding: 0 .5rem;
  @include center;
  font-size: 1rem;
  background: $line;
  border-right: none;
  color: $primary;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 1rem 0 0 1rem;
  position: absolute;
  right: 0;
  bottom: 3em;
  transition: .4s ease;

  transform: translateX($notification-size);
}

.active {
  transform: translateX(0);
}

.err {
  background: $cancel;
}
</style>