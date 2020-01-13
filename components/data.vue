<template>
  <ul :class="{negative}">
    <li v-for="item in data"
      :key="item.title">
      <span class="title">{{item.title}}</span>
      <span class="config">{{item.config}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    negative: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 2rem 1rem;
  & li {
    width: 100%;
    height: 4rem;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $line;
    & .title {
      font-weight: 700;
    }
    & .config {
      color: $light;
    }
  }
}

.negative {
  & li {
    border-color: $black;
  }
  & .title {
    color: $black;
  }
  & .config {
    color: $black;
  }
}
</style>