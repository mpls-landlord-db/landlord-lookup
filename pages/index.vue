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
        <p>
          <TheAddressSearchbar label="Search by address:" @submit="onSubmit" v-model="addrSearch" />
        </p>
      </div>
    </div>

    <template v-if="primary.address">
      <section class="card bg-light text-dark border-0 p-2 my-2">
        <div class="card-header bg-transparent border-bottom-0 ">
          <h3>{{primary.address}}</h3>
          <div class="row">
            <div class="col">
              <span class="font-weight-bold">Owner names:</span>
              <div v-for="name in variants.owner_name" :key="name">{{name}}</div>
            </div>
            <div class="col">
              <span class="font-weight-bold">Owner phone numbers:</span>
              <div v-for="phone in variants.owner_phone" :key="phone">{{phone}}</div>
            </div>
            <div class="col">
              <span class="font-weight-bold">Owner email addresses:</span>
              <div v-for="email in variants.owner_email" :key="email">{{email}}</div>
            </div>
            <div class="col">
              <span class="font-weight-bold">Owner addresses:</span>
              <div v-for="address in variants.owner_address1" :key="address">{{address}}</div>
            </div>
          </div>
        </div>
        <PropertyInfoDisplay v-bind="primary" />
      </section>

      <g-data-table
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
      </g-data-table>

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
    variants() {
      return this.searchResults.variants || {}
    }
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
