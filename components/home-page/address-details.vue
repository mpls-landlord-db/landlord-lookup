<template>
  <div class="address-details-display col">
    <h2>{{license.address}}</h2>
    <div class="row">
      <DisplayColumn class="col-12 col-sm-6 col-md-4" :items="col1" />
      <DisplayColumn class="col-12 col-sm-6 col-md-4" :items="col2" />
      <DisplayColumn class="col-12 col-sm-6 col-md-4" :items="col3" />
    </div>
  </div>
</template>

<script>
import DisplayColumn from './address-details-column'
const formatPhone = phone => `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`
export default {
  props: {
    license: Object,
  },
  components: {
    DisplayColumn,
  },
  computed: {
    col1() {
      return [
        {
          label: 'Owner name',
          value:  this.license.owner_name,
        },
        {
          label: 'Applicant name',
          value: this.license.applicant_name
        },
      ]
    },
    col2() {
      return [
        {
          label: 'Licensed units',
          value: this.license.licensed_units,
        },
        {
          label: 'License status',
          value: this.license.status,
        },
      ]
    },
    col3() {
      return [
        {
          label: 'Issued',
          value: new Date(Number(this.license.issue_date)).toDateString(),
        },
        {
          label: 'Expires',
          value: new Date(Number(this.license.expiration_date)).toDateString(),
        },
      ]
    },
  },
}
</script>

<style scoped>
.address-details-display {
  border: 1px solid #aaa;
  border-radius: 4px;
}
</style>