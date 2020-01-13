<template>
  <div class="container">
    <about-data :data="data" negative></about-data>
  </div>
</template>

<script>
import data from '@/components/data'

export default {
  components: {
    'about-data': data
  },
  data() {
    return {
      data: [
        {
          title: 'Nombre',
          config: 'Apepé'
        },
        {
          title: 'Versión de la aplicación',
          config: '1.0.0'
        },
        {
          title: 'Autor',
          config: 'Alan Jiménez Córdoba'
        },
        {
          title: 'Repositorio en github',
          config: 'github-link'
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  background: $primary;
}
</style>