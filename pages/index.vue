<template>
  <section class="container-fluid">
    <div class="row align-items-end my-3">
      <!-- <div class="col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center pl-0">
        <h1>Landlord Lookup</h1>
      </div> -->
      <div class="col-xs-12 col-sm-6 d-flex justify-content-sm-end justify-content-center pr-0">
        <TheAddressSearchbar label="Search by address:" @submit="onSubmit" v-model="addrSearch" />
      </div>
    </div>

    <template v-if="selectedAddress">
      <div class="row">
        <AddressDetails :license="selectedAddress" class="mb-3" />
      </div>
      <div class="row">
        <div class="col-12 col-sm-6 p-0 mb-4 pb-2">
          <AddressSearchResultsList v-bind="searchResults" :selectedAddressId.sync="selectedAddressId" />
        </div>
        <div class="col-12 col-sm-6">
          <div class="row">
            <AddressSearchResultsMap
              :addresses="allAddresses"
              :selectedAddressId="selectedAddressId"
              @selectAddress="selectedAddressId = $event"
            />
          </div>
        </div>
      </div>
      <client-only>
        <button
          ref="backToTop"
          :class="{ 'd-none' : !showBackToTop }"
          class="back-to-top g-btn bg-light"
          @click="goTo(0)"
          @touchend="goTo(0)"
        >
          Top
        </button>
      </client-only>
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
import * as api from '@/services/apiRequests'

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
      selectedAddressId: '',
      scrollY: 0,
    }
  },
  computed: {
    showBackToTop() {
      return this.scrollY > 200
    },
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
    window.addEventListener('scroll', this.setScrollY)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.setScrollY)
  },
  methods: {
    goTo(y) {
      window.scroll({ top: y, behavior: 'smooth' })
    },
    setScrollY() {
      this.scrollY = window.scrollY
    },
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
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  padding: 8px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>