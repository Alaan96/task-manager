<template>
  <div class="tag-container">
    <span>Tarea simple</span>
    <span>Tarea compleja</span>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.tag-container {
  width: 100%;
  margin: 0;
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;

  & * {
    margin: .5rem 1rem 0 0;
    font-size: .75rem;
  }
}
</style>