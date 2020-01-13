<template>
  <div class="container">
    <settings-data :data="configs" negative>
    </settings-data>
  </div>
</template>

<script>
import data from '@/components/data'
export default {
  components: {
    'settings-data': data
  },
  data() {
    return {
      configs: [
        {
          title: 'Etiquetas',
          config: ''
        },
        {
          title: 'Vista al iniciar'
        },
        {
          title: 'Inicio de semana'
        },
        {
          title: 'Funcionar sin conexión'
        },
        {
          title: 'Modo oscuro'
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 10rem;
  background: $primary;
}
</style>