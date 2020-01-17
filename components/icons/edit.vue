<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 16">
    <path d="
      M 0,2
      H 4
      C 4,0 3,0 3,0  
      H 1
      C 1,0 0,0 0,2

      M 0,3
      V 13
      C 0,13 1,16 2,16
      C 2,16 3,16 4,13
      V 3
      H 0
      "/>
      
  </svg>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
svg {
  transform: rotate(45deg);
}
path {
  fill: $primary;
}
</style>