<template functional>
  <div class="g-input">
    <label class="g-input__label">{{props.label}}</label>
    <input
      v-bind="data.attrs"
      class="g-input__input"
      :type="data.attrs.type || 'text'"
      :value="props.value"
      @input="listeners.input($event.target.value)"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String
  }
}
</script>