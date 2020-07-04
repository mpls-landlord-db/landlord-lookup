<template>
  <section class="container-fluid">
    <div class="row align-items-end mb-3">
      <div class="col">
        <h1>Landlord Lookup</h1>
      </div>
      <div class="col d-flex justify-content-end">
        <TheAddressSearchbar label="Search by address:" @submit="onSubmit" v-model="addrSearch" />
      </div>
    </div>

    <template v-if="selectedAddress">
      <div class="row">
        <AddressDetails :license="selectedAddress" class="mb-3" />
      </div>
      <div class="row">
        <AddressSearchResultsMap
          :addresses="allAddresses"
          :selectedAddressId="selectedAddressId"
          @selectAddress="selectedAddressId = $event"
        />
        <AddressSearchResultsList v-bind="searchResults" :selectedAddressId.sync="selectedAddressId" />
      </div>
    </template>

    <template v-else>
      <div style="text-align: center; margin-top: 200px">
        Use the searchbar to find information about the rental license for your address
        and see which other addresses are managed by your landlord. 
      </div>
    </template>

  </section>
</template>

<script>
import { Xerxes } from '@/util/mocks'

import * as api from '@/services/api'

import TheAddressSearchbar from '@/components/home-page/address-searchbar'
import AddressDetails from '@/components/home-page/address-details'
import AddressSearchResultsMap from '@/components/home-page/address-search-results-map'
import AddressSearchResultsList from '@/components/home-page/address-search-results-list'

export default {
  components: {
    TheAddressSearchbar,
    AddressSearchResultsMap,
    AddressSearchResultsList,
    AddressDetails,
  },
  data() {
    return {
      addrSearch: '',
      searchResults: {},
      selectedAddressId: ''
    }
  },
  computed: {
    selectedAddress() {
      return this.allAddresses.length
        ? this.allAddresses.find(x => x.data.id === this.selectedAddressId).data
        : null
    },
    allAddresses() {
      if (this.primary) {
        return [{ data: this.primary }, ...this.secondary]
      }
      return []
    },
    primary() {
      return this.searchResults.primary
    },
    secondary() {
      return this.searchResults.secondary
    },
    totalAddresses() {
      return this.searchResults.totalEntities
    },
  },
  mounted() {
    this.searchResults = Xerxes
    this.selectedAddressId = Xerxes.primary.id
  },
  methods: {
    onSubmit() {
      api.fetchAddressInfo({ q: encodeURIComponent(this.addrSearch) }).then(res => {
        this.searchResults = res.data
        this.selectedAddressId = res.data.primary.id
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.green-box {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: rgb(80, 202, 80);
  border: 1px solid #55aa33;
}
.address-list {
  max-height: 400px;
  border: 1px solid #888;
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 4px 0;
}

.selected {
  position: sticky;
  top: 32px;
  bottom: 0; 
  z-index: 1;
  background: #b1e3eb;
  color: rgb(0, 0, 0);
}
.selected .g-btn:hover {
  background: #b1e3eb93;
}
.primary {
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
}
.primary.selected {
  top: 0;
  background: #b1e3eb;
}
</style>