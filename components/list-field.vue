<template>
  <div class="task-field">
    <header>
      <input type="text"
        name="description"
        v-model="value.title">
      <arrow></arrow>
    </header>
    <div
      v-for="(item, index) in value.items"
      :key="`Item ${index + 1}`"
      class="items">
      <input type="text"
        v-model="value.items[index].text">
      <div>
        <cross rotate></cross>
      </div>
    </div>
    <div class="new-item">
      <span>"Enter para un nuevo item"</span>
    </div>
  </div>
</template>

<script>
import arrow from '@/components/icons/arrow'
import cross from '@/components/icons/cross'

export default {
  components: {
    arrow, // Icon
    cross  // Icon
  },
  props: {
    value: {
      type: Object,
    }
  }
  }
</script>

<style lang="scss" scoped>
.task-field {
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

input {
  width: 100%;
  height: 2.5rem;
  padding: 0 1.5rem;
  font-size: .75rem;
  font-family: $niramit;
  background: transparent;
  color: $light;
  border: none;
  border-bottom: 1px solid $line;

  &:focus {
    color: $primary;
  }
}

header {
  width: 100%;
  position: relative;

  & svg, span {
    width: .8rem;
    position: absolute;
    right: .4rem;
    bottom: 1.3rem;
  }
}

.items {
  width: 100%;
  display: grid;
  grid-template-columns: 1rem 1fr 1.5rem;
  grid-gap: 1rem;

  & input {
    height: 2rem;
    padding: 0 .5rem;
    grid-column: 2;
  }

  & div {
    width: 100%;
    height:  2rem;
    @include center;
    border-bottom: 1px solid $line;
    & svg {
      width: 40%;
    }
  }
}

.new-item {
  width: 100%;
  padding-left: 2rem;
  & span {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    font-size: .75rem;
    font-style: italic;
    color: $line;
    border-bottom: 1px solid $line;
  }
}
</style>