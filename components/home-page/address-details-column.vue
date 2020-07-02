<template functional>
  <div class="col mb-2" :class="[data.staticClass]">
    <h3 class="mb-3 mt-0">{{props.label}}</h3>
    <div v-for="(x, i) in props.items" :key="i" class="d-flex mb-2 pb-2 align-items-center border-bottom">
      <div class="mr-2 pr-2 label">{{x.label}}</div>
      <div v-if="Array.isArray(x.value)">
        <div v-for="(y, j) in x.value" :key="j">{{y || 'n/a'}}</div>
      </div>
      <div v-else>{{x.value || 'n/a'}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    items: Array,
  }
}
</script>

<style scoped>
.label {
  min-width: 80px;
  max-width: 80px;
}
.item {
  border-bottom: 1px solid #aaa;
}
</style>