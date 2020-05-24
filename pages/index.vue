<template>
  <section class="container-fluid">
    <h1>Hello</h1>
    <TheAddressSearchbar label="Search by address:" @submit="onSubmit" v-model="addrSearch" />
    <ul>
      <li v-for="(x, i) in searchResults" :key="i">
        <pre>{{x}}</pre>
      </li>
    </ul>
  </section>
</template>

<script>
import * as api from '@/services/api'

import TheAddressSearchbar from '@/components/address-searchbar'
export default {
  components: {
    TheAddressSearchbar
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
