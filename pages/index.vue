<template>
  <section class="container-fluid">
    <h1>Hello</h1>
    <TheAddressSearchbar label="Search by address:" v-model="addrSearch" />
  </section>
</template>

<script>
import TheAddressSearchbar from '@/components/address-searchbar'
export default {
  components: {
    TheAddressSearchbar
  },
  data() {
    return {
      selected: '',
      addrSearch: '',
    }
  },
}
</script>
