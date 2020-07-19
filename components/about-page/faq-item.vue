<template functional>
  <li class="faq-item">
    <h3 class="mb-2">{{props.q}}</h3>
    <p class="m-0">
      <slot />
    </p>
  </li>
</template>

<script>
export default {
  props: {
    q: String,
  }
}
</script>

<style scoped>
.faq-item {
  margin-bottom: 2rem;
}
</style>