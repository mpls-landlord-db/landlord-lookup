<template>
  <div class="col d-flex justify-content-center">
    <div ref="map" class="my-map"></div>
  </div>
</template>

<script>

let map = null

export default {
  props: {
    addresses: Array,
  },
  mounted() {
    map = this.$createMap(this.$refs.map)
    this.setMarkers()
  },
  watch: {
    addresses: {
      deep: true,
      handler(val) {
        this.clearMarkers()
        this.setMarkers()
      }
    }
  },
  methods: {
    setMarkers() {
      this.addresses.forEach(({ data }) => {
        const onClick = () => this.$emit('selectAddress', data.id)
        map.addMarker(data.latitude, data.longitude, { title: data.address, onClick })
      })
    },
    clearMarkers() {
      map.clearMarkers()
    }
  }
}
</script>

<style scoped>
.my-map {
  height: 450px;
  width: 100%;
}
</style>
