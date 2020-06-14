<template functional>
  <div class="col" :class="[data.staticClass]">
    <h3 class="mb-3 mt-0">{{props.label}}</h3>
    <div v-for="(x, i) in props.items.filter(x => x.label)" :key="i" class="d-flex mb-2">
      <div class="mr-2 label">{{x.label}}</div>
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
  min-width: 72px;
  max-width: 72px;
}
</style>