<template>
  <div class="address-details-display col">
    <h2>{{license.address}}</h2>
    <div class="row">
      <DisplayColumn
        class="col-12 col-sm-6 col-md-4"
        label="Owner"
        :items="ownerInfo"
      />
      <DisplayColumn
        class="col-12 col-sm-6 col-md-4"
        label="License Applicant"
        :items="applicantInfo"
      />
      <DisplayColumn
        class="col-12 col-sm-6 col-md-4"
        label="License Info"
        :items="licenseInfo"
      />
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
    ownerInfo() {
      return [
        {
          label: 'Name',
          value: this.license.owner_name,
        },
        {
          label: 'Email',
          value: this.license.owner_email,
        },
        {
          label: 'Phone',
          value: formatPhone(this.license.owner_phone),
        },
        {
          label: 'Address',
          value: [
            this.license.owner_address1,
            `${this.license.owner_city} ${this.license.owner_zip}, ${this.license.owner_state}`
          ]
        },
      ]
    },
    applicantInfo() {
      return [
        {
          label: 'Name',
          value: this.license.applicant_name,
        },
        {
          label: 'Email',
          value: this.license.applicant_email,
        },
        {
          label: 'Phone',
          value: formatPhone(this.license.applicant_phone),
        },
        {
          label: 'Address',
          value: [
            this.license.applicant_address1,
            `${this.license.applicant_city} ${this.license.applicant_zip}, ${this.license.applicant_state}`
          ]
        },
      ]
    },
    licenseInfo() {
      return [
        {
          label: 'Category',
          value: this.license.category,
        },
        {
          label: 'Status',
          value: this.license.status,
        },
        {
          label: 'Milestone',
          value: this.license.milestone,
        },
        {
          label: 'Tier',
          value: this.license.tier,
        },
        {
          label: 'Issued',
          value: new Date(Number(this.license.issue_date)).toDateString(),
        },
        {
          label: 'Expires',
          value: new Date(Number(this.license.expiration_date)).toDateString(),
        },
      ]
    }
  },
}
</script>

<style scoped>
.address-details-display {
  border: 1px solid #aaa;
  border-radius: 4px;
}
</style>