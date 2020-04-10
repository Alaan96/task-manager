<template>
  <section>
    <div>
      <img src="@/static/drink-water.svg" alt="drink-water">
      <span>Beber agua</span>
    </div>
    <div>
      <img src="@/static/exercise.svg" alt="exercise">
      <span>Hacer ejercicio</span>
    </div>
    <div>
      <img src="@/static/heart.svg" alt="self-care">
      <span>Cuidado personal</span>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    items: {
      type: Array,
      // required: true
    }
  }
})
</script>

<style lang="scss" scoped>
  section {
    width: 100%;
    // padding: 0 1rem;
    display: flex;
    flex-direction: column;
  }

  div {
    flex: 0 1 3rem;
    margin: .25rem 0;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    background: $line;
    border-radius: .5rem;
    & span {
      margin-left: .5rem;
      font-weight: 600;
    }
  }
</style>