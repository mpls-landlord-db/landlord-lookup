<template>
  <section class="container-fluid">
    <div class="row align-items-end">
      <div class="col">
        <h1>Landlord Lookup</h1>
        <p>
          Lookup active rental licenses in the city of Minneapolis, MN. Search by address and see other 
          properties managed by the same landlord or management company.
        </p>
      </div>
      <div class="col d-flex justify-content-end">
        <TheAddressSearchbar label="Search by address:" @submit="onSubmit" v-model="addrSearch" />
      </div>
    </div>

    <template v-if="primary.address">
      <section class="card bg-light text-dark border-0 p-2 my-2">
        <div class="card-header bg-transparent border-bottom-0 ">
          <h3>{{primary.address}}</h3>
        </div>
        <PropertyInfoDisplay v-bind="primary" />
      </section>


      <template v-for="(x, i) in secondary">
        <div class="row" :key="i">
          <div class="col flex-shrink-1">
            {{x.data.address}}
          </div>
          <div class="col">
            {{x.matchedBy}}
          </div>
        </div>
      </template>

      <!-- <g-data-table
        v-if="secondary.length"
        striped
        :columns="['Address', 'Category', 'Tier', 'Status', 'Milestone', 'Issue date', 'Expiration date']"
        :rows="secondary"
      >
        <template v-slot:tbody-row="row">
          <th scope="row" class="text-left">{{row.address}}</th>
          <td>{{row.category}}</td>
          <td>{{row.tier}}</td>
          <td>{{row.status}}</td>
          <td>{{row.milestone}}</td>
          <td>{{new Date(Number(row.issue_date)).toDateString()}}</td>
          <td>{{new Date(Number(row.expiration_date)).toDateString()}}</td>
        </template>
      </g-data-table> -->

    </template>

  </section>
</template>

<script>
import * as api from '@/services/api'

import TheAddressSearchbar from '@/components/home-page/address-searchbar'
import PropertyInfoDisplay from '@/components/home-page/property-info-display/property-info-display'
export default {
  components: {
    TheAddressSearchbar,
    PropertyInfoDisplay
  },
  data() {
    return {
      addrSearch: '',
      searchResults: {},
    }
  },
  computed: {
    primary() {
      return this.searchResults.primary || {}
    },
    secondary() {
      return this.searchResults.secondary || []
    },
  },
  methods: {
    onSubmit() {
      api.fetchAddressInfo({ q: this.addrSearch }).then(res => {
        this.searchResults = res.data
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
