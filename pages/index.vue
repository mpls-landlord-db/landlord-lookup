<template>
  <section class="container-fluid">
    <div class="row align-items-end">
      <div class="col">
        <h1>Landlord Lookup</h1>
      </div>
      <div class="col d-flex justify-content-end">
        <TheAddressSearchbar label="Search by address:" @submit="onSubmit" v-model="addrSearch" />
      </div>
    </div>

    <template v-if="selectedAddress">

      <section class="address-details">
        <h3 class="mt-0 mb-2">Address Details</h3>
        <div class="row">
          <div class="col">
            <div>
              <span class="font-weight-bold">Owner Name:</span> {{selectedAddress.owner_name}}
            </div>
            <div>
              <span class="font-weight-bold">Owner Email:</span> {{selectedAddress.owner_email}}
            </div>
            <div>
              <span class="font-weight-bold">Owner Phone:</span> {{selectedAddress.owner_phone}}
            </div>
          </div>
        </div>
      </section>

      <section class="other-addresses mt-4">
        <div class="row">
          <div class="col d-flex justify-content-center align-items-center bg-dark text-light">
            We'll show a map here marking the locations of the results.
          </div>
          <div class="col">
            <!-- <h2 class="mt-0">Results</h2> -->
            <h3 class="mt-0 mb-2">Results</h3>
            <div class="row">
              <div class="col font-weight-bold">Address:</div>
              <div class="col font-weight-bold">Match Confidence:</div>
            </div>
            <ul class="address-list">
              <li class="primary" :class="{ 'selected' : primary.id === selectedAddressId }">
                <button class="g-btn text text-left block" @click="selectedAddressId = primary.id">
                  <div class="row">
                    <div class="col">
                      {{primary.address}}
                    </div>
                    <div class="col font-weight-normal">
                      Primary
                    </div>
                  </div>
                </button>

              </li>
              <li v-for="({ data, matchedBy }, i) in secondary" :key="i" class="secondary" :class="{ 'selected' : data.id === selectedAddressId }">
                <button class="g-btn text text-left block" @click="selectedAddressId = data.id">
                  <div class="row">
                    <div class="col">{{data.address}}</div>
                    <div class="col">
                      <span v-for="x in matchedBy.length" :key="x" class="green-box mr-1"></span>
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </template>

  </section>
</template>

<script>
import { Xerxes } from '@/util/mocks'

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
      api.fetchAddressInfo({ q: this.addrSearch }).then(res => {
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