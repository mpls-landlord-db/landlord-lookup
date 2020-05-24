<template>
  <section class="container-fluid">
    <h1>Hello</h1>
    <TheAddressSearchbar label="Search by address:" @submit="onSubmit" v-model="addrSearch" />
    <ul>
      <li v-for="(x, i) in searchResults" :key="i" class="card bg-light text-dark p-2 my-2">
        <div class="card-header border-bottom-0 font-weight-bold px-2">
          {{x.address}}
        </div>
        <PropertyInfoDisplay v-bind="x" />
      </li>
    </ul>
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
      selected: '',
      addrSearch: '',
      searchResults: [],
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
