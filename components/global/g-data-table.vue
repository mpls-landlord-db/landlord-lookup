<template>
  <table class="table" :class="{ 'table-striped': striped }">
    <thead>
      <tr class="d-flex">
        <slot name="thead">
          <template v-for="(x, i) in columns">
            <th :key="i" scope="col" class="col text-left">
              {{x.text || x}}
            </th>
          </template>
        </slot>
      </tr>
    </thead>
    <tbody>
      <template v-for="(row, i) in rows">
        <tr :key="i" class="d-flex">
          <slot name="tbody-row" v-bind="row" />
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    striped: Boolean,
    columns: Array,
    rows: Array
  }
}
</script>