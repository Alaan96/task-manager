<template>
  <div class="container">
    <h1>{{error.statusCode}}</h1>
    <div v-if="error.statusCode === 404" class="msg">
      <h2>Página no encontrada</h2>
      <p>Lo que estabas buscando no se encuentra aquí.</p>
    </div>
    <div v-else-if="error.statusCode >= 500" class="msg">
      <h2>El servidor no responde</h2>
      <p>Ha ocurrido un error en el servidor.</p>
    </div>
    <nuxt-link to="/">Volver a Inicio</nuxt-link>
  </div>
</template>

<script>
// import button from "@/components/buttons/button"

export default {
  components: {
    // 'simple-button': button
  },
  props: ['error']
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0 2rem;
  margin: 6rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & h1 {
    font-size: 6rem;
    font-family: $lato;
    font-weight: 400;
  }
  & .msg {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    & h2 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    & p {
      width: 12rem;
    }
  }
}
</style>