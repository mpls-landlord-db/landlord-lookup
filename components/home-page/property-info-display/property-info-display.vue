<template>
  <div class="property-info">
    <section class="row mb-2">
      <div class="col col-sm-6">
        <section class="p-2 ">
          <template v-for="(x, i) in dataGroup1">
            <DisplayRow :key="i" v-bind="x" />
          </template>
        </section>
      </div>
    </section>
    <section class="row">
      <div class="col col-sm-6">
        <section class="p-2">
          <template v-for="(x, i) in dataGroup2">
            <DisplayRow :key="i" v-bind="x" />
          </template>
        </section>
      </div>
      <div class="col col-sm-6">
        <section class="p-2">
          <template v-for="(x, i) in dataGroup3">
            <DisplayRow :key="i" v-bind="x" />
          </template>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import DisplayRow from './display-row'
export default {
  props: {
    apn: String,
    objectid: String,
    category: String, // 2 See top of page 2 http://minneapolismn.gov/www/groups/public/@regservices/documents/webcontent/wcms1p-143382.pdf
    milestone: String, // 2 TODO: figure out what this means
    tier: String, // 2 TODO: figure out what this means
    status: String, // 2
    issue_date: String, // 2
    expiration_date: String, // 2
    address: String, // 1
    owner_name: String, // x
    owner_address1: String,
    owner_address2: String,
    owner_city: String,
    owner_state: String,
    owner_zip: String,
    owner_phone: String,
    owner_email: String,
    applicant_name: String,
    applicant_address1: String,
    applicant_address2: String,
    applicant_city: String,
    applicant_state: String,
    applicant_zip: String,
    applicant_phone: String,
    applicant_email: String,
    licensed_units: String, // 1
    ward: String, // 1
    neighborhood_desc: String, // 1
    community_desc: String, // 1
    police_precinct: String, // 1
    latitude: String,
    longitude: String,
    x_web_mercator: String,
    y_web_mercator: String,
  },
  components: {
    DisplayRow,
  },
  computed: {
    dataGroup1() {
      return [
        {
          label: 'Owner name',
          value: this.owner_name,
        },
        {
          label: 'Owner address 1',
          value: this.owner_address1,
        },
        {
          label: 'Owner address 2',
          value: this.owner_address2,
        },
        {
          label: 'Owner city',
          value: this.owner_city
        },
        
      ]
    },
    dataGroup2() {
      return [
        {
          label: 'Licensed units',
          value: this.licensed_units,
        },
        {
          label: 'Ward',
          value: this.ward,
        },
        {
          label: 'Neighborhood',
          value: this.neighborhood_desc,
        },
        {
          label: 'Police precinct',
          value: this.police_precinct,
        }
      ]
    },
    dataGroup3() {
      return [
        {
          label: 'Milestone',
          value: this.milestone,
        },
        {
          label: 'Tier',
          value: this.tier,
        },
        {
          label: 'Status',
          value: this.status,
        },
        {
          label: 'Issue date',
           // TODO: improve database table schema to store the correct types in the first place
          value: new Date(Number(this.issue_date)).toDateString(),
        },
        {
          label: 'Expiration date',
          value: new Date(Number(this.expiration_date)).toDateString(),
        }
      ]
    }
  }
}
</script>

