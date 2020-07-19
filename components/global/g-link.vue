<template functional>
  <nuxt-link
    tabindex="-1"
    role="link"
    :exact="props.exact"
    :to="props.to"
    :class="[data.staticClass, data.class]"
  >
    <button class="g-link">
      <slot></slot>
    </button>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: [String, Object],
    exact: Boolean,
  }
}
</script>

<style lang="scss" >
.g-link {
  font: inherit;
  padding: 4px;
  outline: none;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  &:focus,
  &:hover {
    background: #0001;
  }
}

.nuxt-link-active,
.nuxt-link-exact-active {
  .g-link {
    text-decoration-line: underline;
    text-decoration-thickness: 2px;
    text-decoration-color: #03a59d;
  }
}
</style>