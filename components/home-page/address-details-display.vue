<template>
  <section class="address-details-display row">
    <div class="col">
      <h2>{{address.address}}</h2>
      <div class="row">
        <DisplayColumn
          class="col-sm-6"
          label="Owner"
          :items="ownerInformation"
        />
        <DisplayColumn
          class="col-sm-6"
          label="License Applicant"
          :items="ownerInformation"
        />
      </div>
    </div>
  </section>
</template>

<script>
import DisplayColumn from './address-details-display-column'
export default {
  props: {
    address: Object,
  },
  components: {
    DisplayColumn,
  },
  computed: {
    ownerInformation() {
      return [
        {
          label: 'Name',
          value: this.address.owner_name,
        },
        {
          label: 'Email',
          value: this.address.owner_email,
        },
        {
          label: 'Phone',
          value: this.address.owner_phone,
        },
        {
          label: 'Address',
          value: [
            this.address.owner_address1,
            `${this.address.owner_city} ${this.address.owner_zip}, ${this.address.owner_state}`
          ]
        },
      ]
    },
    applicantInfomation() {
      return [
        {}
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