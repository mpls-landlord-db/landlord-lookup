<template functional>
  <!-- <div class="row py-1 mx-1">
    <div class="col-6 font-weight-bold">{{props.label}}:</div>
    <div class="col-6">{{props.value || 'N/A'}}</div>
  </div> -->
  <div class="row py-1 mx-1">
    <div class="row-label">
      {{props.label}}
    </div>
    <div class="row-value">
      {{props.value || 'N/A'}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: {
      type: String,
      default: 'N/A'
    },
  }
}
</script>

<style scoped>
.row-label {
  min-width: 60px;
}
.row-value {
  
}
</style>